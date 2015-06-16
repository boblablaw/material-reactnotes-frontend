import React from 'react';
import NoteStore from '../../stores/NoteStore';
import NoteService from '../../services/NoteService';
import Router from 'react-router';
import {Link} from 'react-router';

class NoteItem extends React.Component {
  constructor() {
    super()
    this.state = this._getStateFromStores();
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    NoteStore.addChangeListener(this._onChange);
    NoteService.loadNote(this.props.params.noteId);
  }

  componentWillUnmount() {
    NoteStore.removeChangeListener(this._onChange);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.noteId !== this.props.params.noteId) {
      NoteService.loadNote(nextProps.params.noteId);
    }
  }

  _onChange() {
    this.setState(this._getStateFromStores());
  }

  _getStateFromStores() {
    return {
      note: NoteStore.getNote(),
      errors: []
    };
  }

  render() {
    return (
      <div>
          <div>{this.state.note.title}</div>
          <div>{this.state.note.body}</div>
      </div>
    );
  }
}

module.exports = NoteItem;
