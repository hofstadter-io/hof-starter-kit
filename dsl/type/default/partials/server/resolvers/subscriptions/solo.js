obj.Subscription.{{typeName}}Notification = {
  subscribe: withFilter(
    () => pubsub.asyncIterator('{{typeName}}Notification'),
    (payload, variables) => {
      console.log("{{typeName}}Notification", payload, variables)
      return payload.{{typeName}}Notification.id === variables.id;
    }
  )
}
