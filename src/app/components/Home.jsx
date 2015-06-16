import React from 'react';
import AuthenticatedComponent from './common/AuthenticatedComponent';

import NotesWithNav from './notes/NotesWithNav';
import NoteService from '../services/NoteService';

import mui from 'material-ui';
var Colors = mui.Styles.Colors;
var Typography = mui.Styles.Typography;
var ThemeManager = new mui.Styles.ThemeManager();
var { AppBar, AppCanvas, Menu, IconButton, MenuItem } = mui;

export default AuthenticatedComponent(class Home extends React.Component {
  render() {
    return (
      <NotesWithNav />
    );
  }
});
