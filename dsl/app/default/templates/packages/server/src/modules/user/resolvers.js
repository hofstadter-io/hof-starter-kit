{{#with DslContext as |APP|}}
/*eslint-disable no-unused-vars*/
import { pick } from 'lodash';
import jwt from 'jsonwebtoken';
import withAuth from 'graphql-auth';
import { withFilter } from 'graphql-subscriptions';
import request from 'request-promise-native';

import FieldError from '../../../../common/FieldError';
import settings from '../../../../../settings';


// {{APP.name}}

const USERS_SUBSCRIPTION = 'users_subscription';

export default pubsub => ({
  Query: {
    users: withAuth(['user:view:all'], (obj, { orderBy, filter }, { User }) => {
      return User.getUsers(orderBy, filter);
    }),
    user: withAuth(
      () => {
        return ['user:view'];
      },
      async (obj, { id }, { user, User, req: { t } }) => {
        if (user.id === id || user.role === 'admin') {
          try {
            let ret = await User.getUser(id);
            console.log("get User - ret", ret, id, user.id)
            return { user: ret };
          } catch (e) {
            return { errors: e };
          }
        }

        const e = new FieldError();
        e.setError('user', t('user:accessDenied'));
        return { user: null, errors: e.getErrors() };
      }
    ),
    currentUser: async (obj, args, { User, user }) => {
      try {
        if (user) {
          let ret = await User.getUser(user.id);
          console.log("currentUser - ret", ret, user.id)
          return ret
        } else {
          return null;
        }
      } catch(e) {
        console.log("current user CATCH")
      }
    }
  },
  User: {
    auth(obj) {
      console.log("auth obj", obj)
      return obj;
    }
  },

  Mutation: {
    addUser: withAuth(
      (obj, args, { User, user }) => {
        return user.id !== args.input.id ? ['user:create'] : ['user:create:self'];
      },
      async (obj, args, { Account, User, user, req: { universalCookies }, mailer, req, req: { t } }) => {
        try {
          let { input } = args;
          const e = new FieldError();

          const userExists = await User.getUserByUsername(input.username);
          if (userExists) {
            e.setError('username', t('user:usernameIsExisted'));
          }

          const emailExists = await User.getUserByEmail(input.email);
          if (emailExists) {
            e.setError('email', t('user:emailIsExisted'));
          }

          if (input.password.length < 8) {
            e.setError('password', t('user:passwordLength'));
          }

          e.throwIf();

          const [createdUserId] = await User.register({ ...input });

          if (settings.user.auth.apikey.enabled) {
            // by default, generate an Apikey
            await User.generateApikeyAuth({ userId: createdUserId });
          }

          if (settings.user.auth.certificate.enabled) {
            await User.editAuthCertificate({ id: createdUserId, ...input });
          }

          {{#if (eq APP.client "studios")}}
          const acct = {
            userId: createdUserId,
            name: input.username,
            type: "starter",
            state: "created",
          }
          console.log("Creating Account", acct)
          await Account.create(acct);
          {{/if}}

          const user = await User.getUser(createdUserId);

          {{#if APP.user.hooks.post-create}}
          var requestResult = null;
          var requestData = {
            'hook': 'user.post-create',
            args,
            user
          }

          {{#with APP.user.hooks.post-create as |HOOK|}}
          {{> type/default/server/hooks/func.js}}
          {{/with}}

          console.log("User.post-create - requestReulst", requestResult)
          {{/if}}

          if (mailer && settings.user.auth.password.sendAddNewUserEmail && !emailExists && req) {
            console.log("SENDING EMAIL")
            // async email
            jwt.sign({ user: pick(user, 'id') }, settings.user.secret, { expiresIn: '1d' }, (err, emailToken) => {
              const encodedToken = Buffer.from(emailToken).toString('base64');
              const url = `${__WEBSITE_URL__}/confirmation/${encodedToken}`;

              {{#if (eq APP.name "studios")}}
              var html = `<p>Hi, ${user.username}!</p>
                <p>Welcome to Hofstadter Studios. Please click the following link to set your password:</p>
                <p><a href="https://studios.studios.live.hofstadter.io/forgot-password">https://studios.studios.live.hofstadter.io/forgot-password</a></p>

                <p>Follow along the steps at <a href="https://docs.hofstadter.io/getting-started/">https://docs.hofstadter.io/getting-started/</a> to start creating.</p>
                <br>
                <p>Thank You and Happy Hof'n,</p>

                <p>the Hofstadter team</p>
                <a href="mailto:support@hofstadter.io">support@hofstadter.io</a><br>
                <a href="https://hofstadter.io">https://hofstadter.io</a>
                `;
              {{else}}
              var html = `<p>Hi, ${user.username}!</p>
                <p>Welcome to ${settings.app.name}. Please click the following link to confirm your email:</p>
                <p><a href="${url}">${url}</a></p>
                <br>
                <p>Thanks!</p>
                <p>the ${settings.app.name} team</p>
                `;
              {{/if}}

              mailer.sendMail({
                from: `${settings.app.name} <${process.env.EMAIL_USER}>`,
                to: user.email,
                subject: 'Your account has been created',
                html
              });
            });
          }

          pubsub.publish(USERS_SUBSCRIPTION, {
            usersUpdated: {
              mutation: 'CREATED',
              node: user
            }
          });

          return { user };
        } catch (e) {
          return { errors: e };
        }
      }
    ),
    editUser: withAuth(
      (obj, args, { User, user }) => {
        return user.id !== args.input.id ? ['user:update'] : ['user:update:self'];
      },
      async (obj, { input }, { User, user, req: { t } }) => {
        const isAdmin = () => user.role === 'admin';
        const isSelf = () => user.id === input.id;
        try {
          const e = new FieldError();
          const userExists = await User.getUserByUsername(input.username);

          if (userExists && userExists.id !== input.id) {
            e.setError('username', t('user:usernameIsExisted'));
          }

          const emailExists = await User.getUserByEmail(input.email);
          if (emailExists && emailExists.id !== input.id) {
            e.setError('email', t('user:emailIsExisted'));
          }

          if (input.password && input.password.length < 8) {
            e.setError('password', t('user:passwordLength'));
          }

          e.throwIf();

          const userInfo = !isSelf() && isAdmin() ? input : pick(input, ['id', 'username', 'email', 'password']);

          await User.editUser(userInfo);

          if (settings.user.auth.certificate.enabled) {
            await User.editAuthCertificate(input);
          }
          const user = await User.getUser(input.id);
          pubsub.publish(USERS_SUBSCRIPTION, {
            usersUpdated: {
              mutation: 'UPDATED',
              node: user
            }
          });

          return { user };
        } catch (e) {
          return { errors: e };
        }
      }
    ),
    deleteUser: withAuth(
      (obj, args, { User, user }) => {
        return user.id !== args.id ? ['user:delete'] : ['user:delete:self'];
      },
      async (obj, { id }, context) => {
        const {
          User,
          req: { t }
        } = context;
        const isAdmin = () => context.user.role === 'admin';
        const isSelf = () => context.user.id === id;

        try {
          const e = new FieldError();
          const user = await User.getUser(id);

          if (!user) {
            e.setError('delete', t('user:userIsNotExisted'));
            e.throwIf();
          }

          if (isSelf()) {
            e.setError('delete', t('user:userCannotDeleteYourself'));
            e.throwIf();
          }

          const isDeleted = !isSelf() && isAdmin() ? await User.deleteUser(id) : false;

          if (isDeleted) {
            pubsub.publish(USERS_SUBSCRIPTION, {
              usersUpdated: {
                mutation: 'DELETED',
                node: user
              }
            });
            return { user };
          } else {
            e.setError('delete', t('user:userCouldNotDeleted'));
            e.throwIf();
          }
        } catch (e) {
          return { errors: e };
        }
      }
    ),

    generateApikey: withAuth(
      (obj, args, { User, user }) => {
        return user.id !== args.id ? ['user:update'] : ['user:update:self'];
      },
      async (obj, { id }, { User, user, req: { t } }) => {
        const isAdmin = () => user.role === 'admin';
        const isSelf = () => user.id === id;
        try {

        if (isSelf() || isAdmin() ) {
          if (settings.user.auth.apikey.enabled) {
            // by default, generate an Apikey
            user = await User.getUser(id);
            console.log("gen APIKey", id, user)
            let apikey = null;
            if (user.apikey) {
              apikey = await User.regenerateApikeyAuth({ userId: id });
            } else {
              apikey = await User.generateApikeyAuth({ userId: id });
            }
            console.log("gen APIKey", apikey)
            user = await User.getUser(id);

            pubsub.publish(USERS_SUBSCRIPTION, {
              usersUpdated: {
                mutation: 'UPDATED',
                node: user
              }
            });
          }
        }

          console.log("geb API returns", user)
          return { user };
        } catch (e) {
          return { errors: e };
        }
      }
    ),
  },
  Subscription: {
    usersUpdated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(USERS_SUBSCRIPTION),
        (payload, variables) => {
          const { mutation, node } = payload.usersUpdated;
          const {
            filter: { isActive, role, searchText }
          } = variables;

          const checkByFilter =
            !!node.isActive === isActive &&
            (!role || role === node.role) &&
            (!searchText ||
              node.username.toUpperCase().includes(searchText.toUpperCase()) ||
              node.email.toUpperCase().includes(searchText.toUpperCase()));

          switch (mutation) {
            case 'DELETED':
              return true;
            case 'CREATED':
              return checkByFilter;
            case 'UPDATED':
              return !checkByFilter;
          }
        }
      )
    }
  }
});
{{/with}}
