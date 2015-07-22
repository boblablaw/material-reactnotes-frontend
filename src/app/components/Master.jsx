import React from 'react';
import { Route, RouteHandler, Link } from 'react-router';

import LoginStore from '../stores/LoginStore';

import AppLeftNav from './common/AppLeftNav.jsx';
import FullWidthSection from './common/FullWidthSection.jsx';
import NewTheme from '../themes/new-theme.js';

import mui from 'material-ui';
var Colors = mui.Styles.Colors;
var Typography = mui.Styles.Typography;
var ThemeManager = new mui.Styles.ThemeManager();
var { AppBar, AppCanvas, Menu, IconButton, MenuItem } = mui;

class Master extends React.Component {
  constructor() {
    super();
    this._onLeftIconButtonTouchTap = this._onLeftIconButtonTouchTap.bind(this);
    this._setTheme();
  }
  
  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  }
  
  _setTheme() {
    ThemeManager.setTheme(NewTheme);
  }

  render() {
    var appBar = this._getAppBar();
    return (
      <AppCanvas predefinedLayout={1}>
        { appBar }
        <AppLeftNav ref="leftNav" />
        <RouteHandler />
      </AppCanvas>
    );
  }

  _getAppBar() {
    var title =
      this.context.router.isActive('get-started') ? 'Get Started' :
      this.context.router.isActive('features') ? 'Features' :
      this.context.router.isActive('about') ? 'About' :
      this.context.router.isActive('login') ? 'Login' :
      this.context.router.isActive('signup') ? 'Signup' : 
      this.context.router.isActive('components') ? 'Components' : 'ReactNotes';

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
}

Master.contextTypes = {
  router: React.PropTypes.func
};

Master.childContextTypes = {
  muiTheme: React.PropTypes.object
};

module.exports = Master;
