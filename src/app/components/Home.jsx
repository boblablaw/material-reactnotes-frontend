import React from 'react';
import AuthenticatedComponent from './common/AuthenticatedComponent';

import PageWithNav from './common/PageWithNav';

export default AuthenticatedComponent(class Home extends React.Component {
  render() {
    var menuItems = [
      { route: 'about', text: 'AppBar'},
      { route: 'about', text: 'Buttons'},
      { route: 'about', text: 'Date Picker'},
      { route: 'about', text: 'Dialog'},
      { route: 'about', text: 'Dropdown Menu'},
    ];

    return (
      <PageWithNav menuItems={menuItems} />
    );
  }
});
