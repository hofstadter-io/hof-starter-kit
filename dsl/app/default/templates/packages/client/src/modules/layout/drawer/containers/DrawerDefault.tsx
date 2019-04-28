import React from 'react';
import styled from 'styled-components';
import { NavLink, withRouter } from 'react-router-dom';

import translate, { TranslateFunction } from '../../../../i18n';

const DrawerStyled = styled.div`
{{{file DslContext.layout.drawer.style}}}
`

class Drawer extends React.Component<{t: any, showDrawer: any}> {
  public render() {
    const { t, showDrawer } = this.props;
    return (
      <DrawerStyled>
        <div id="app-drawer" className={ showDrawer ? "" : "d-none" }>
          {{#each DslContext.layout.drawer.items as |ITEM|}}
          <NavLink to="{{{ITEM.route}}}" className="nav-link">
            <b>{t('{{ITEM.name}}')}</b>
          </NavLink>
          {{#if ITEM.items}}{{#each ITEM.items as |SUBITEM|}}
          <NavLink to="{{{SUBITEM.route}}}" className="nav-link">
            {t('{{SUBITEM.name}}')}
          </NavLink>
          {{/each}}{{/if}}
          {{/each}}
        </div>
      </DrawerStyled>
    );
  }
}

export default translate('drawer')(Drawer);
