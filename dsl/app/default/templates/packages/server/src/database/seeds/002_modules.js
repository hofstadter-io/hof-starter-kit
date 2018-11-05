{{#with DslContext.modules as |MODS|}}
{{#each MODS as |MOD|}}
import {{camelT MOD}}Seed, { clear as {{camelT MOD}}Clear } from '../../modules/{{kebab MOD}}/db/seeds';
{{/each}}
{{/with}}

export async function seed(knex, Promise) {

{{#with DslContext.modules as |MODS|}}
{{#each MODS as |MOD|}}
//   await {{camelT MOD}}Clear(knex, Promise);
{{/each}}

{{#each MODS as |MOD|}}
  await {{camelT MOD}}Seed(knex, Promise);
{{/each}}
{{/with}}

}
