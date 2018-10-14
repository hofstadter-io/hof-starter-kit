{{#with DslContext.modules as |MODS|}}
{{#each MODS as |MOD|}}
import {{camelT MOD}}Seed from '../../modules/{{kebab MOD}}/db/seeds';
{{/each}}

export async function seed(knex, Promise) {
{{#each MODS as |MOD|}}
  {{camelT MOD}}Seed(knex, Promise);
{{/each}}

}
{{/with}}
