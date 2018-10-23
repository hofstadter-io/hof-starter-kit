import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import translate, { TranslateFunction } from '../../../../i18n';
import settings from '../../../../../../../settings';

const DrawerStyled = styled.drawer`
{{{file DslContext.layout.drawer.style}}}
`

class Drawer extends React.Component {
  public static propTypes = {
    t: PropTypes.func
  };

  public render() {
    const { t } = this.props;
    return (
      <DrawerStyled id="styled-drawer" className="d-flex flex-shrink-0 justify-content-center">
        <span>
          &copy; {new Date().getFullYear()}. {settings.app.name}. - {t('drawer.hello')}
        </span>
      </DrawerStyled>
    );
  }
}

export default translate('drawer')(Drawer);
