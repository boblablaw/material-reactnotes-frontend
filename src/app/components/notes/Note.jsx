import React from 'react';
import NoteStore from '../../stores/NoteStore';
import NoteService from '../../services/NoteService';
import Router, {Link} from 'react-router';
import ContentEditable from 'react-wysiwyg';
import Radium from 'radium';
import Editor from '../common/Editor';

import mui, {Paper, Dialog, RaisedButton, TextField, FlatButton, Snackbar} from 'material-ui';

class Note extends React.Component {
  constructor() {
    super()
    this.state = this._getStateFromStores();
    this._onChange = this._onChange.bind(this);
    this._handleBodyChange = this._handleBodyChange.bind(this);
    this._handleTitleChange = this._handleTitleChange.bind(this);
    this._handleDeleteDialogTouchTap = this._handleDeleteDialogTouchTap.bind(this);
    this._handleDeleteDialogCancel = this._handleDeleteDialogCancel.bind(this);
    this._handleDeleteDialogDelete = this._handleDeleteDialogDelete.bind(this);
    this._handleUpdateButtonTouchTap = this._handleUpdateButtonTouchTap.bind(this);
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

  _handleBodyChange(text) {
    this.setState({ body_html: text });
  }
  
  _handleTitleChange(e) {
    this.state.note.title = e.target.value;
    this.setState({ note: this.state.note });
  }

  _handleDeleteDialogTouchTap() {
    this.refs.deleteDialog.show();
  }

  _handleDeleteDialogCancel() {
    this.refs.deleteDialog.dismiss();
  }

  _handleDeleteDialogDelete() {
    NoteService.deleteNote(this.props.params.noteId);
    this.context.router.transitionTo('/');
  }
  
  _handleUpdateButtonTouchTap() {
    let bodyText = React.findDOMNode(this.refs.bodyInput).textContent;
    NoteService.updateNote(this.props.params.noteId, this.state.note.title, this.state.body_html, bodyText);
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
          onChange={this._handleTitleChange}
        />
        <div style={styles.bodyTextField}>
          <Editor
            tag='div'
            className='editor'
            ref='bodyInput'
            text={this.state.note.body_html}
            onChange={this._handleBodyChange}
            options={{
              placeholder: false,
              toolbar: {
                buttons: ['bold', 'italic', 'underline', 'anchor', 'h2', 'h3', 'quote']
              }
            }}
          />
        </div>
        <RaisedButton
          label="Update"
          onTouchTap={this._handleUpdateButtonTouchTap}
          secondary={true}
          style={styles.button}
        />
        <RaisedButton
          label="Cancel"
          onClick={this.login}
          style={styles.button}
        />
        <RaisedButton
          label="Delete"
          primary={true}
          style={styles.button}
          onTouchTap={this._handleDeleteDialogTouchTap}
        />
        <Dialog
          ref="deleteDialog"
          title="Are you sure you want to delete?"
          actions={deleteActions}
          modal={true}>
        </Dialog>
        <Snackbar
          message="Deleted the note"
          action="undo"
          ref="snackbar"
          onActionTouchTap={this._handleAction}/>
      </div>
    );
  }
}

Note.contextTypes = {
  router: React.PropTypes.func
};

module.exports = Radium.Enhancer(Note);
