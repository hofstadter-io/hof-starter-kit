{{#each DslContext.modules as |MOD|}}
{{#getdsl (concat3 "modules." MOD ".module") true}}{{#with . as |MODULE|}}
{{#if MODULE.seeds}}
import {{camelT MOD}}Seed, { clear as {{camelT MOD}}Clear } from '../../modules/{{kebab MOD}}/db/seeds';
{{/if}}
{{/with}}{{/getdsl}}
{{/each}}

export async function seed(knex, Promise) {

{{#each DslContext.modules as |MOD|}}
{{#getdsl (concat3 "modules." MOD ".module") true}}{{#with . as |MODULE|}}
{{#if MODULE.seeds}}
  await {{camelT MOD}}Seed(knex, Promise);
{{/if}}
{{/with}}{{/getdsl}}
{{/each}}

}
