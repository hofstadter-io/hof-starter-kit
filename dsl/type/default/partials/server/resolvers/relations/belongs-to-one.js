// belongs-to-one Batch Resolver

obj.{{TypeName}}.{{relName}}Id = (obj, args, context, info) => {
  return obj.{{relName}}Id || null;
}


