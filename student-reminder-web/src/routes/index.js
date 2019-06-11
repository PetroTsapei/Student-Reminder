import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Switch } from 'react-router-dom';

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

        </Switch>
      </ScrollToTopWrapper>
    )
  }
}

export default MainRouter