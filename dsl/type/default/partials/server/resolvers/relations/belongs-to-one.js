// belongs-to-one Batch Resolver

obj.{{TypeName}}.{{relName}}Id = (obj, args, context, info) => {
  console.log("{{upper TypeName}} {{upper relName}}", obj)
  return obj.{{relName}}Id || null;
}


