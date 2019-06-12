import React, { Component } from 'react';
import { withRouter, Switch } from 'react-router';

import PublicRoutes from './PublicRoutes';
import PrivateRoutes from './PrivateRoutes';

class ScrollToTop extends Component {
  componentDidUpdate(prevProps) {
    if (
      (this.props.location.pathname !== prevProps.location.pathname) ||
      (this.props.location.search !== prevProps.location.search)
    ) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

const ScrollToTopWrapper = withRouter(ScrollToTop);

class MainRouter extends Component {
  render() {
    return (
      <ScrollToTopWrapper>
        <Switch>
          { false && PrivateRoutes() }
          { PublicRoutes() }
        </Switch>
      </ScrollToTopWrapper>
    )
  }
}

export default MainRouter