import _ from 'underscore';
import {LOAD_NOTE, LOAD_NOTES, CREATE_NOTE, UPDATE_NOTE, DELETE_NOTE} from '../constants/NoteConstants';
import BaseStore from './BaseStore';

var _notes = [];
var _errors = [];
var _note = { title: "", body: "", user: { username: "" } };

export default new class NoteStore extends BaseStore {
  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this))
  }

  _registerToActions(action) {
    switch(action.actionType) {
      case LOAD_NOTE:
        if (action.json) {
          _note = action.json.note;
          _errors = [];
        }
        if (action.errors) {
          _errors = action.errors;
        }
        this.emitChange();
        break;
      case LOAD_NOTES:
        _notes = action.json.notes;
        this.emitChange();
        break;
      case CREATE_NOTE:
        if (action.json) {
          _notes.unshift(action.json.note);
          _errors = [];
        }
        if (action.errors) {
          _errors = action.errors;
        }
        this.emitChange();
        break;
      case UPDATE_NOTE:
        if (action.json) {
          var searchTerm = action.json.note.id, index = -1;
          var notes = _notes;
          for(var i = 0, len = notes.length; i < len; i++) {
            if (notes[i].id === searchTerm) {
                index = i;
                break;
            }
          }
          notes[index].title = action.json.note.title;
          notes[index].body = action.json.note.body;
          notes[index].abstract = action.json.note.abstract;
          notes[index].updated_at = action.json.note.updated_at;

          _notes = notes;
        }
        if (action.errors) {
          _errors = action.errors;
        }
        this.emitChange();
        break;
      case DELETE_NOTE:
        if (action.noteId) {
          var notes = _notes.filter(function (note) {
            return note.id != action.noteId;
          });
          _notes = notes;
        }
        if (action.errors) {
          _errors = action.errors;
        }
        this.emitChange();
        break;
      default:
        break;
    };
  }

  getAllNotes() {
    return _notes;
  }

  getNote() {
    return _note;
  }

  getErrors() {
    return _errors;
  }
};
