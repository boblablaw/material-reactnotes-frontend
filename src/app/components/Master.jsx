import React from 'react';
import { Route, RouteHandler, Link } from 'react-router';

import LoginStore from '../stores/LoginStore';

import AppLeftNav from './common/AppLeftNav.jsx';
import FullWidthSection from './common/FullWidthSection.jsx';

import mui from 'material-ui';
var Colors = mui.Styles.Colors;
var Typography = mui.Styles.Typography;
var ThemeManager = new mui.Styles.ThemeManager();
var { AppBar, AppCanvas, Menu, IconButton, MenuItem } = mui;

class Master extends React.Component {
  constructor() {
    super()
    this.state = this._getLoginState();
    this._onLeftIconButtonTouchTap = this._onLeftIconButtonTouchTap.bind(this);
  }
  
  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  }

  componentWillMount() {
    ThemeManager.setPalette({
      accent1Color: Colors.deepOrange500
    });
  }

  getStyles() {
    var darkWhite = Colors.darkWhite;
    return {
      footer: {
        backgroundColor: Colors.grey900,
        textAlign: 'center'
      },
      a: {
        color: darkWhite
      },
      p: {
        margin: '0 auto',
        padding: '0',
        color: Colors.lightWhite,
        maxWidth: '335px'
      },
      iconButton: {
        color: darkWhite
      }
    };
  }

  render() {
    var styles = this.getStyles();
    var appBar = this._getAppBar();
    var leftNav = this._getLeftNav();

    return (
      <AppCanvas predefinedLayout={1}>
        { appBar }
        <AppLeftNav ref="leftNav" />
        <RouteHandler />
      </AppCanvas>
    );
  }

  logout(e) {
    e.preventDefault();
    LoginStore.logout();
  }

  _getAppBar() {
    var title =
      this.context.router.isActive('get-started') ? 'Get Started' :
      this.context.router.isActive('features') ? 'Features' :
      this.context.router.isActive('about') ? 'About' :
      this.context.router.isActive('login') ? 'Login' :
      this.context.router.isActive('signup') ? 'Signup' : 
      this.context.router.isActive('components') ? 'Components' : '';

    return (
      <div>
        <AppBar
          onLeftIconButtonTouchTap={this._onLeftIconButtonTouchTap}
          title={title}
          zDepth={0} />
      </div>
    );
  }

  _onLeftIconButtonTouchTap() {
    this.refs.leftNav.toggle();
  }
  
  _getLoginState() {
    return {
      userLoggedIn: LoginStore.isLoggedIn()
    };
  }
  
  _onChange() {
    this.setState(this._getLoginState());
  }
}

Master.contextTypes = {
  router: React.PropTypes.func
};

Master.childContextTypes = {
  muiTheme: React.PropTypes.object
};

module.exports = Master;
