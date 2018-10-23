import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import * as RS from 'reactstrap'

import translate, { TranslateFunction } from '../../../../i18n';
import settings from '../../../../../../../settings';

const DrawerStyled = styled.footer`
{{{file DslContext.layout.drawer.style}}}
`

class Drawer extends React.Component {
  public static propTypes = {
    t: PropTypes.func
  };

  public render() {
    const { t } = this.props;
    return (
      <DrawerStyled>
      {{{file DslContext.layout.drawer.file}}}
      </DrawerStyled>
    );
  }
}

export default translate('drawer')(Drawer);
