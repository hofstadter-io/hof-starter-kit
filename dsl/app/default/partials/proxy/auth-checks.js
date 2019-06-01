var pass = false;
var fail = false;
// console.log("CONTEXT", context);
{{#each PROXY.auth.checks as |CHECK|}}
// CHECK: {{CHECK.name}}
// XXX This template code is unsage, as is much of it...
// console.log("AUTH CHECK {{CHECK.name}}", {{{CHECK.lhs}}}, {{{CHECK.rhs}}})
console.log("AUTH CHECK {{CHECK.name}}", fail, pass, "-", !fail && !pass)

// console.log("AUTH CHECK {{CHECK.name}}", fail, pass, "-", !fail && !pass, {{! ~}}
	{{#if CHECK.pre}} {{{CHECK.pre}}} &&{{/if ~}}
	{{#if CHECK.lhs}} {{{CHECK.lhs}}} {{/if ~}}
	{{#if CHECK.comp}}{{CHECK.comp}}{{/if ~}}
	{{#if CHECK.rhs}} {{{CHECK.rhs}}} {{/if ~}}
)

if (!fail && !pass &&{{! ~}}
	{{#if CHECK.pre}} {{{CHECK.pre}}} &&{{/if ~}}
	{{#if CHECK.lhs}} {{{CHECK.lhs}}} {{/if ~}}
	{{#if CHECK.comp}}{{CHECK.comp}}{{/if ~}}
	{{#if CHECK.rhs}} {{{CHECK.rhs}}} {{/if ~}}
) {
  console.log("  {{upper CHECK.result}} {{CHECK.name}}")
  {{CHECK.result}} = true

  {{#if CHECK.return}}
  console.log("Returning from {{CHECK.name}}")
  res.status({{CHECK.return.code}}).send("{{CHECK.return.message}}");
  return
  {{/if}}
}

{{/each}}

console.log("FINAL CHECK", !fail, !pass, "-", !fail && !pass)
if (fail || !pass) {
  console.log("  FAILED")
  res.status(401).send("Unauthorized");
  return
}

