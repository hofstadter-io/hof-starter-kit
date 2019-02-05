export default function paging(queryBuilder, args) {
  // console.log("paging helper", args)
  const { after, offset, limit, page } = args;

  if (page) {
    queryBuilder.offset((page - 1) * limit);
  } else if (offset) {
    queryBuilder.offset(offset);
  } else if (after) {
    queryBuilder.offset(after);
  }

  if (limit) {
    queryBuilder.limit(limit);
  }

  return queryBuilder;
}
