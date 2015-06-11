import React from 'react';
import AuthenticatedComponent from './common/AuthenticatedComponent'

export default AuthenticatedComponent(class Home extends React.Component {
  render() {
    return (
      <div>
        Hello, World!
      </div>);
  }
});


/*
export default AuthenticatedComponent(class Home extends React.Component {
  render() {
    return (<h1>Hello {this.props.username ? this.props.username : ''}</h1>);
  }
});*/
