obj.Subscription.{{typeName}}sNotification = {
  subscribe: withFilter(
    () => pubsub.asyncIterator('{{typeName}}sNotification'),
    (payload, variables) => {
      console.log("{{typeName}}sNotification", payload, variables)
      return payload.{{typeName}}sNotification.id >= variables.endCursor;
    }
  )
}

