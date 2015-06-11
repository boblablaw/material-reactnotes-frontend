import React from 'react';
import LoginStore from '../../stores/LoginStore';

//higher-order component
export default (ComposedComponent) => {
  return class AuthenticatedComponent extends React.Component {

    static willTransitionTo(transition) {
      if (!LoginStore.isLoggedIn()) {
        transition.redirect('/welcome', {}, {'nextPath' : transition.path});
      }
    }

    constructor() {
      super()
      this.state = this._getLoginState();
    }

    _getLoginState() {
      return {
        userLoggedIn: LoginStore.isLoggedIn()
/*
        username: LoginStore.username(),
        email: LoginStore.email()
*/
      };
    }
    
    componentWillReceiveProps(nextProps) {
      this.state = this._getLoginState();
    }

    componentDidMount() {
      this.changeListener = this._onChange.bind(this);
      LoginStore.addChangeListener(this.changeListener);
    }

    _onChange() {
      this.setState(this._getLoginState());
    }

    componentWillUnmount() {
      LoginStore.removeChangeListener(this.changeListener);
    }

    render() {
      return (
      <ComposedComponent
        {...this.props}
        username={this.state.username}
        userLoggedIn={this.state.userLoggedIn} />
      );
    }
  }
};
