import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import * as RS from 'reactstrap';

// import { Drawer } from '../../drawer';
import { NavBar } from '../../navbar';
import { Footer } from '../../footer';

const LayoutStyled = styled.div`
{{{file DslContext.layout.page.style}}}
`

class PageLayout extends React.Component {

  public static propTypes = {
    children: PropTypes.node,
  };

  public render() {
    const { children } = this.props;
    return (
      <LayoutStyled>
        <div id="styled-page">
          {{{file DslContext.layout.page.file}}}
        </div>
      </LayoutStyled>
    );
  }
}

export default PageLayout;
