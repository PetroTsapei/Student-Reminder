import React, { Component } from 'react';
import { withRouter, Switch } from 'react-router';
import { observer, inject } from 'mobx-react';

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
          { this.props.auth.token && PrivateRoutes() }
          { PublicRoutes() }
        </Switch>
      </ScrollToTopWrapper>
    )
  }
}

export default inject('auth')(observer(MainRouter));