var pass = false;
{{#each PROXY.auth.checks as |CHECK|}}
// CHECK: {{CHECK.name}}
// XXX This template code is unsage, as is much of it...
// console.log("AUTH CHECK {{CHECK.name}}", {{{CHECK.lhs}}}, {{{CHECK.rhs}}})
if (!pass && {{{CHECK.lhs}}} {{CHECK.comp}} {{{CHECK.rhs}}}) {
  // console.log("  PASS {{CHECK.name}}")
  pass = true
}

{{/each}}

if (!pass) {
  res.status(401).send("Unauthorized");
  return
}
