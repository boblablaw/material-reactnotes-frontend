import React from 'react';
import Router from 'react-router';
import mui from 'material-ui';
import {MenuItem, LeftNav, Styles} from 'material-ui';
var {Colors, Spacing, Typography} = mui.Styles;

import LoginStore from '../../stores/LoginStore';
import LoginActions from '../../actions/LoginActions';

var menuItems = [
  { route: 'login', text: 'Login' },
  { type: MenuItem.Types.SUBHEADER, text: 'Resources' },
  { route: 'about', text: 'About' },
  { route: 'get-started', text: 'Get Started' },
  { route: 'features', text: 'Features' }
];

class AppLeftNav extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this._getSelectedIndex = this._getSelectedIndex.bind(this);
    this._onLeftNavChange = this._onLeftNavChange.bind(this);
    this._onHeaderClick = this._onHeaderClick.bind(this);
    this.state = this._getLoginState();
  }

  getStyles() {
    return {
      cursor: 'pointer',
      //.mui-font-style-headline
      fontSize: '24px',
      color: Typography.textFullWhite,
      lineHeight: Spacing.desktopKeylineIncrement + 'px',
      fontWeight: Typography.fontWeightLight,
      backgroundColor: Colors.cyan500,
      paddingLeft: Spacing.desktopGutter,
      paddingTop: '0px',
      marginBottom: '8px'
    };
  }
  
  componentWillReceiveProps(nextProps) {
    this.state = this._getLoginState();
  }

  render() {
    var header = (
      <div style={this.getStyles()} onClick={this._onHeaderClick}>
        ReactNotes
      </div>
    );
    
    this.state.userLoggedIn ? 
      menuItems.splice(0, 1, { logout: 'logout', text: 'Logout' }) : 
      menuItems.splice(0, 1, { route: 'login', text: 'Login' });
    
    return (
      <LeftNav 
        ref="leftNav"
        docked={false}
        isInitiallyOpen={false}
        header={header}
        menuItems={menuItems}
        selectedIndex={this._getSelectedIndex()}
        onChange={this._onLeftNavChange} />
    );
  }

  toggle() {
    this.refs.leftNav.toggle();
  }

  _getSelectedIndex() {
    var currentItem;
    for (var i = menuItems.length - 1; i >= 0; i--) {
      currentItem = menuItems[i];
      if (currentItem.route && this.context.router.isActive(currentItem.route)) return i;
    }
  }

  _onLeftNavChange(e, key, payload) {
    if (payload.logout) {
      LoginActions.logoutUser();
    } else if (payload.route) {
      this.context.router.transitionTo(payload.route);
    }
  }

  _onHeaderClick() {
    this.context.router.transitionTo('/');
    this.refs.leftNav.close();
  }
  
  _getLoginState() {
    return {
      userLoggedIn: LoginStore.isLoggedIn()
    };
  }
}

AppLeftNav.contextTypes = {
  router: React.PropTypes.func
};

AppLeftNav.propTypes = {
  menuItems: React.PropTypes.array
};

module.exports = AppLeftNav;
