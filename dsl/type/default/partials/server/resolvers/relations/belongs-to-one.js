// belongs-to-one Batch Resolver

obj.{{TypeName}}.{{relType}}Id = (obj, args, context, info) => {
  return obj.{{relType}}Id || null;
}


