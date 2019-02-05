import context from './context';
import auth from './auth';

const middleware = app => {
  app.use('/hello', context);
  app.use('/hello', auth);
  app.get('/hello', handler);
};

const handler = (req, res, next) => {
  // console.log("HELLO - context");
  // console.log(req.context);

  var user = req.context.user;

  if (user) {
    res.send(`hello ${user.username}\n`)
  } else {
    res.send('hello stranger\n')
  }
}

export default middleware;

