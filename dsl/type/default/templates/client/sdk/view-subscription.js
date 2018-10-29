{{#with DslContext as |TYPE|}}
{{#with (camelT TYPE.name) as |TypeName|}}
{{#with (camel  TYPE.name) as |typeName|}}
{{#with (snake  TYPE.name) as |type_name|}}
{{#with (trimto_last TYPE.relPath "/" false) as |MOD_NAME|}}

import SOLO from '../graphql/subscriptions/solo.graphql';

const start = ({{typeName}}Id, subscribeToMore, next) => {
 return subscribeToMore({
	document: {{upper type_name}}_SUBSCRIPTION,
	variables: { id: {{typeName}}Id },
	updateQuery: (
		prev,
		{
			subscriptionData: {
				data: {
          {{typeName}}Notification: { mutation }
				}
			}
		}
	) => {

		if (mutation === 'DELETED') {
      if (next) {
        if (next === "" || next === "nowhere" || next === "stay"){
          return
        }

        if (history) {
          return history.push(next);
        }
        if (navigation) {
          return navigation.navigate(next);
        }
      } else {
        if (history) {
          return history.push('{{TYPE.pages.list.route}}');
        } else if (navigation) {
          return navigation.goBack();
        }
      }
		}
		return prev;

	}
})
})


{{/with}}
{{/with}}
{{/with}}
{{/with}}
{{/with}}
