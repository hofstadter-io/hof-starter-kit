{{#if COMPONENT.current-user}}
import { withLoadedUser } from '../user/containers/Auth';
{{/if}}

{{#each COMPONENT.data as |DATA|}}
// {{DATA.type}}
{{#if (eq "type" (trimfrom_first DATA.type "." false))}}
import {{DATA.name}}SDK from '../../{{replace (trimprefix DATA.type "type.") "." "/" -1}}/sdk';
{{else}}
// unknown DATA type '{{DATA.type}}'
{{/if}}
{{/each}}

