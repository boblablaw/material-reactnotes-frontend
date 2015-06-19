import React from 'react';
import NoteStore from '../../stores/NoteStore';
import NoteService from '../../services/NoteService';
import Router, {Link} from 'react-router';
import ContentEditable from 'react-wysiwyg';
import Radium from 'radium';
import Editor from '../common/Editor';

import mui, {Paper, Dialog, RaisedButton, TextField, FlatButton} from 'material-ui';

class NoteItem extends React.Component {
  constructor() {
    super()
    this.state = this._getStateFromStores();
    this._onChange = this._onChange.bind(this);
    this._onEdit = this._onEdit.bind(this);
    this.handleDeleteDialogTouchTap = this.handleDeleteDialogTouchTap.bind(this);
    this._handleDeleteDialogCancel = this._handleDeleteDialogCancel.bind(this);
    this._handleDeleteDialogDelete = this._handleDeleteDialogDelete.bind(this);
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
      editing: false,
      errors: []
    };
  }

  _onEdit(text) {
    this.setState({ text: text });
  }

  _onSave() {

  }

  _onCancel() {

  }

  handleDeleteDialogTouchTap() {
    this.refs.deleteDialog.show();
  }

  _handleDeleteDialogCancel() {
    this.refs.deleteDialog.dismiss();
  }

  _handleDeleteDialogDelete() {
    debugger;
    NoteService.deleteNote(this.props.params.noteId);
  }

  _getStyles() {
    let height = window.innerHeight;
    let bodyHeight = window.innerHeight - 215;
    let styles = {
      root: {
        margin: '0 auto 10 auto'
      },
      titleTextField: {
        fontSize: '200%',
        width: '100%',
        display: 'block'
      },
      bodyTextField: {
        width: '100%',
        display: 'block',
        fontSize: '140%',
        height: bodyHeight + 'px',
        overflowY: 'scroll',
      },
      button: {
        marginTop: '15px',
        marginRight: '15px',
        color: 'blue'
      }
    };
    return styles;
  }

  render() {
    var deleteActions = [
      <FlatButton
        label="Cancel"
        key={1}
        secondary={true}
        onTouchTap={this._handleDeleteDialogCancel} />,
      <FlatButton
        label="Delete"
        key={2}
        primary={true}
        onTouchTap={this._handleDeleteDialogDelete} />
    ];

    var styles = this._getStyles();
    return (
      <div styles={styles.root}>
        <TextField
          style={styles.titleTextField}
          disabled={false}
          value={this.state.note.title}
        />
        <div style={styles.bodyTextField}>
          <Editor
            tag='div'
            className='editor'
            text={this.state.note.body}
            onChange={this._onEdit}
            options={{
              placeholder: false,
              toolbar: {
                buttons: ['bold', 'italic', 'underline', 'quote']
              }
            }}
          />
        </div>
        <RaisedButton
          label="Save"
          onClick={this.login}
          style={styles.button}
        />
        <RaisedButton
          label="Delete"
          primary={true}
          style={styles.button}
          onTouchTap={this.handleDeleteDialogTouchTap}
        />
        <Dialog
          ref="deleteDialog"
          title="Are you sure you want to delete?"
          actions={deleteActions}
          modal={true}>
        </Dialog>
      </div>
    );
  }
}

module.exports = Radium.Enhancer(NoteItem);
