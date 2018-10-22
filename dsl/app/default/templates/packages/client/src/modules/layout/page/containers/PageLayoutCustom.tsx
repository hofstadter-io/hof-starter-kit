import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import * from 'reactstrap';

import { Drawer } from '../../drawer';
import { NavBar } from '../../navbar';
import { Footer } from '../../footer';

const LayoutStyled = styled.div`
{{{file DslContext.layout.page.style}}}
`

class PageLayout extends React.Component {
  public render() {
    const { children, navBar } = this.props;
    return (
      <LayoutStyled>
        <div id="styled-page">
          {{{file DslContext.layout.page.file}}}
        </div>
      </LayoutStyled>
    );
  }
}

PageLayout.propTypes = {
  children: PropTypes.node,
  navBar: PropTypes.bool
};

export default PageLayout;
