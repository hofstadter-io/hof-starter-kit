{{#if PAGE.currentUser}}
import { withLoadedUser } from '../../../../user/containers/Auth';
{{/if}}

{{#each PAGE.data as |DATA|}}
// {{DATA.type}}
{{#if (eq "type" (trimfrom_first DATA.type "." false))}}
import {{DATA.name}}SDK from '../sdk';
{{else}}
// unknown DATA type '{{DATA.type}}'
{{/if}}
{{/each}}

