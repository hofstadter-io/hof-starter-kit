import React from 'react';
import styled from 'styled-components';

import translate, { TranslateFunction } from '../../../../i18n';
import settings from '../../../../../../../settings';

const FooterStyled = styled.footer`
{{{file DslContext.layout.footer.style}}}
`

class Footer extends React.Component<{ t?: any }> {
  public render() {
    const { t } = this.props;
    return (
      <FooterStyled id="styled-footer" className="d-flex flex-shrink-0 justify-content-center">
        <span>
          &copy; {new Date().getFullYear()}. {settings.app.name}. - {t('footer.hello')}
        </span>
      </FooterStyled>
    );
  }
}

export default translate('footer')(Footer);
