var pass = false;
var fail = false;
// console.log("CONTEXT", context);
{{#each PROXY.auth.checks as |CHECK|}}
// CHECK: {{CHECK.name}}
// XXX This template code is unsage, as is much of it...
// console.log("AUTH CHECK {{CHECK.name}}", {{{CHECK.lhs}}}, {{{CHECK.rhs}}})
if (!fail && !pass && {{! ~}}
	{{#if CHECK.pre}}{{{CHECK.pre}}} &&{{/if ~}}
	{{#if CHECK.lhs}}({{{CHECK.lhs}}}) {{/if ~}}
	{{#if CHECK.comp}}{{CHECK.comp}} {{/if ~}}
	{{#if CHECK.rhs}}({{{CHECK.rhs}}}) {{/if ~}}
) {
  // console.log("  {{upper CHECK.result}} {{CHECK.name}}")
  {{CHECK.result}} = true
}

{{/each}}

if (!fail && !pass) {
  // console.log("  FAILED")
  res.status(401).send("Unauthorized");
  return
}

