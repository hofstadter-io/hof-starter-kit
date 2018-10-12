import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import translate, { TranslateFunction } from '../../../../i18n';
import settings from '../../../../../../../settings';

const footerHeight = '40px';

const FooterStyled = styled.footer`
  margin-top: 10px;
  line-height: ${footerHeight};
  height: ${footerHeight};
`;

class Footer extends React.Component {
  public static propTypes = {
    t: PropTypes.func
  };

  public render() {
    const { t } = this.props;
    return (
      <FooterStyled className="d-flex flex-shrink-0 justify-content-center">
        <span>
          &copy; {new Date().getFullYear()}. {settings.app.name}. - {t('footer.hello')}
        </span>
      </FooterStyled>
    );
  }
}

export default translate('footer')(Footer);
