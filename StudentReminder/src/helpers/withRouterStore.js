import React from 'react';

const withRouterStore = store => WrappedComponent => {
  return class extends React.Component {
    componentWillMount() {
      store.setRoute(this.props.location, this.props.match, this.props.history);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
};

export default withRouterStore;