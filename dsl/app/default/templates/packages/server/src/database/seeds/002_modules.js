{{#with DslContext.modules as |MODS|}}
{{#each MODS as |MOD|}}
import {{camelT MOD}}Seed, { clear as {{camelT MOD}}Clear } from '../../modules/{{kebab MOD}}/db/seeds';
{{/each}}

export async function seed(knex, Promise) {
{{#each MODS as |MOD|}}
//   await {{camelT MOD}}Clear(knex, Promise);
{{/each}}

{{#each MODS as |MOD|}}
  await {{camelT MOD}}Seed(knex, Promise);
{{/each}}

}
{{/with}}
