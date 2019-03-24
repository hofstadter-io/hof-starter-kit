{{#each THING.data as |DATA|}}
{{#if DATA.query}}
{{#if DATA.query.sync}}
{{#gettype DATA.type false}}
{{#with . as |TYPE|}}
{{#with (camelT TYPE.name) as |TypeName|}}
{{#with (camel  TYPE.name) as |typeName|}}
{{#with (snake  TYPE.name) as |type_name|}}

{{#if (eq DATA.query.type "view")}}
  init{{camelT DATA.name}}Subscription() {
    // console.log("{{TypeName}} - SUBSCRP", this.props)
    if (!this.{{camel DATA.name}}Subscription && this.props.{{camel DATA.name}}) {
      this.subscribeTo{{camelT DATA.name}}(this.props.{{camel DATA.name}}.id);
    }
  }

  subscribeTo{{camelT DATA.name}} = {{camel DATA.name}}Id => {
    const { subscribeToMore{{TypeName}}, history, navigation } = this.props;

    // console.log("subscribing:", {{camel DATA.name}}Id)

    this.{{camel DATA.name}}Subscription = subscribeToMore{{TypeName}}({
      document: {{upper type_name}}_SUBSCRIPTION,
      variables: { id: {{typeName}}Id },
      updateQuery: (
        prev,
        {
          subscriptionData: {
            data
          }
        }
      ) => {
        console.log("{{TypeName}} Subscription Data:", data)
        let { {{typeName}}Notification: { mutation } } = data;
        if (mutation === 'DELETED') {
          if (history) {
            return history.push('/{{typeName}}s');
          } else if (navigation) {
            return navigation.goBack();
          }
        }
        return prev;
      }
    });
  };

{{else if (eq DATA.query.type "list")}}
  init{{camelT DATA.name}}Subscription() {
    const endCursor = this.props.{{camel DATA.name}} && this.props.{{camel DATA.name}}.pageInfo ? this.props.{{camel DATA.name}}.pageInfo.endCursor : 0;
    {{#each DATA.query.variables as |VAR|}}
    if ( !this.{{trimfrom_last VAR.source "." false}} ) {
      return
    }
    {{/each}}
    // console.log("{{camelT DATA.name}} - SUBSCRP", this.props)
    if (!this.{{camel DATA.name}}Subscription && this.props.{{camel DATA.name}}) {
      this.subscribeTo{{camelT DATA.name}}(
        {{#each DATA.query.variables as |VAR|}}
        this.{{VAR.source}},
        {{/each}}
        endCursor
      );
    }
  }

subscribeTo{{camelT DATA.name}} = (
    {{#each DATA.query.variables as |VAR|}}
    {{VAR.name}},
    {{/each}}
    endCursor
  ) => {
    const { subscribeToMore{{TypeName}}s } = this.props;

    this.{{camel DATA.name}}Subscription = subscribeToMore{{TypeName}}s({
      document: {{upper type_name}}S_SUBSCRIPTION,
      variables: {
        {{#each DATA.query.variables as |VAR|}}
        {{VAR.name}},
        {{/each}}
        endCursor
      },
      updateQuery: (
        prev,
        {
          subscriptionData: {
            data
          }
        }
      ) => {
        console.log("{{camelT DATA.name}} - onNotification - data", data)
        let {
          {{typeName}}sNotification: { mutation, node }
        } = data;

        let newResult = prev;

        if (mutation === 'CREATED') {
          newResult = Add{{camelT DATA.name}}(prev, node);
        } else if (mutation === 'DELETED') {
          newResult = Delete{{camelT DATA.name}}(prev, node.id);
        }

        return newResult;
      }
    });
  };
{{/if}}

{{/with}}
{{/with}}
{{/with}}
{{/with}}
{{/gettype}}
{{/if}}
{{/if}}
{{/each}}
