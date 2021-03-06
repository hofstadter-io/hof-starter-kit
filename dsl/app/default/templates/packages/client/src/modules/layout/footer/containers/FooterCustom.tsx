import React from 'react';
import styled from 'styled-components';

import * as RS from 'reactstrap'

import translate, { TranslateFunction } from '../../../../i18n';
import settings from '../../../../../../../settings';

const FooterStyled = styled.footer`
{{{file DslContext.layout.footer.style}}}
`

class Footer extends React.Component<{ t?: any }> {
  public render() {
    const { t } = this.props;
    return (
      <FooterStyled>
      {{{file DslContext.layout.footer.file}}}
      </FooterStyled>
    );
  }
}

export default translate('footer')(Footer);
