import React from 'react';
import AuthenticatedComponent from './common/AuthenticatedComponent';

import NotesWithNav from './notes/NotesWithNav';
import NoteService from '../services/NoteService';

export default AuthenticatedComponent(class Home extends React.Component {
  render() {
    return (
      <NotesWithNav />
    );
  }
});
