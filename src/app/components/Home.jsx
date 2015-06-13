import React from 'react';
import AuthenticatedComponent from './common/AuthenticatedComponent';

import PageWithNav from './common/PageWithNav';
import NotesWithNav from './notes/NotesWithNav';

export default AuthenticatedComponent(class Home extends React.Component {
  render() {
    var menuItems = [
      { route: 'about', text: 'Note 1'},
      { route: 'about', text: 'Note 2'},
      { route: 'about', text: 'Note 3'},
      { route: 'about', text: 'Note 4'},
      { route: 'about', text: 'Note 5'},
    ];

    return (
      <NotesWithNav noteItems={menuItems} />
    );
  }
});
