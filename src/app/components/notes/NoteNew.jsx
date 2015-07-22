import React from 'react';
import NoteStore from '../../stores/NoteStore';
import NoteService from '../../services/NoteService';
import Router, {Link} from 'react-router';
import Radium from 'radium';
import Editor from '../common/Editor';

import mui, {Paper, Dialog, RaisedButton, TextField, FlatButton} from 'material-ui';

class NoteNew extends React.Component {
  constructor() {
    super()
    this._handleSaveButtonTouchTap = this._handleSaveButtonTouchTap.bind(this);
    this._handleCancelButtonTouchTap = this._handleCancelButtonTouchTap.bind(this);
    this._handleBodyChange = this._handleBodyChange.bind(this);
    this._handleTitleChange = this._handleTitleChange.bind(this);
    this._clearAndFocus = this._clearAndFocus.bind(this);
    this.state = this._getState();
  }
  
  _getState() {
    return {
      title: '',
      text: ''
    };
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
      button: {
        marginTop: '15px',
        marginRight: '15px',
        color: 'blue'
      }
    };
    return styles;
  }
  
  _clearAndFocus() {
    this.setState({text: '', title: ''});
  }
  
  _handleCancelButtonTouchTap() {
    this._clearAndFocus();
  }
  
  _handleSaveButtonTouchTap() {
    // Grabs text without HTML formatting
    let bodyText = React.findDOMNode(this.refs.bodyInput).textContent;
    NoteService.createNote(this.state.title, this.state.text, bodyText);
    this.context.router.transitionTo('/');
  }
  
  _handleTitleChange(e) {
    this.setState({title: e.target.value});
  }
  
  _handleBodyChange(text) {
    this.setState({text: text});
  }
  
  render() {
    var styles = this._getStyles();
    
    return (
      <div styles={styles.root}>
        <TextField
          style={styles.titleTextField}
          hintText='type your title here'
          ref='titleInput'
          value={this.state.title}
          onChange={this._handleTitleChange}
          disabled={false}
        />
        <Editor
          tag='div'
          className='editor'
          ref='bodyInput'
          text={this.state.text}
          onChange={this._handleBodyChange}
          options={{
            placeholder: false,
            toolbar: {
              buttons: ['bold', 'italic', 'underline', 'anchor', 'h2', 'h3', 'quote']
            }
          }}
        />
        <RaisedButton
          label="Save"
          secondary={true}
          onTouchTap={this._handleSaveButtonTouchTap}
          style={styles.button}
        />
        <RaisedButton
          label="Cancel"
          style={styles.button}
          onTouchTap={this._handleCancelButtonTouchTap}
        />
      </div>
    );
  }
}

NoteNew.contextTypes = {
  router: React.PropTypes.func
};

module.exports = NoteNew;