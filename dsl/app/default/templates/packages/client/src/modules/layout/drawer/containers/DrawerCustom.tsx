import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { NavLink, withRouter } from 'react-router-dom';

import * as RS from 'reactstrap'

import translate, { TranslateFunction } from '../../../../i18n';
import settings from '../../../../../../../settings';

const DrawerStyled = styled.div`
{{{file DslContext.layout.drawer.style}}}
`

class Drawer extends React.Component<{t: any, showDrawer?: any}> {
  public render() {
    const { t, showDrawer } = this.props;
    return (
      <DrawerStyled>
      {{{file DslContext.layout.drawer.file}}}
      </DrawerStyled>
    );
  }
}

export default translate('drawer')(Drawer);
