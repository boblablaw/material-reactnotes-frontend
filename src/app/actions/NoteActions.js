import Dispatcher from '../dispatcher/Dispatcher';
import {LOAD_NOTE, LOAD_NOTES, CREATE_NOTE, UPDATE_NOTE, DELETE_NOTE} from '../constants/NoteConstants';
import RouterContainer from '../services/RouterContainer'

export default {
  loadNote: (json) => {
    Dispatcher.dispatch({
      actionType: LOAD_NOTE,
      json: json
    });
  },

  loadNotes: (json) => {
    Dispatcher.dispatch({
      actionType: LOAD_NOTES,
      json: json
    });
  },

  createNote: (json, errors) => {
    Dispatcher.dispatch({
      actionType: CREATE_NOTE,
      json: json,
      errors: errors
    });
  },

  updateNote: (json, noteId, errors) => {
    Dispatcher.dispatch({
      actionType: UPDATE_NOTE,
      json: json,
      noteId: noteId,
      errors: errors
    });
  },

  deleteNote: (noteId) => {
    Dispatcher.dispatch({
      actionType: DELETE_NOTE,
      noteId: noteId
    });
  }
}
