import NoteActions from '../actions/NoteActions';
import {NOTES_URL} from '../constants/NoteConstants';
import request from 'superagent';

var json = '';

function _getErrors(res) {
  var errorMsgs = ["Something went wrong, please try again"];
  if ((json = JSON.parse(res.text))) {
    if (json['errors']) {
      errorMsgs = json['errors'];
    } else if (json['error']) {
      errorMsgs = [json['error']];
    }
  }
  return errorMsgs;
}

export default new class AuthService {
  loadNotes() {
    request.get(NOTES_URL)
      .set('Accept', 'application/json')
      .set('Authorization', localStorage.getItem('accessToken'))
      .end(function(error, res){
        if (res) {
          json = JSON.parse(res.text);
          NoteActions.loadNotes(json);
        }
      });
  }

  loadNote(noteId) {
    request.get(NOTES_URL)
      .set('Accept', 'application/json')
      .set('Authorization', localStorage.getItem('accessToken'))
      .end(function(error, res){
        if (res) {
          json = JSON.parse(res.text);
          NoteActions.loadNote(json);
        }
      });
  }

  createNote(title, body) {
    request.post(NOTES_URL)
      .set('Accept', 'application/json')
      .set('Authorization', localStorage.getItem('accessToken'))
      .send({ note: { title: title, body: body } })
      .end(function(error, res){
        if (res) {
          if (res.error) {
            var errorMsgs = _getErrors(res);
            NoteActions.createNote(null, errorMsgs);
          } else {
            json = JSON.parse(res.text);
            NoteActions.createNote(json, null);
          }
        }
      });
  }

  deleteNote(noteId) {
    request.del(NOTES_URL + '/' + noteId)
      .set('Accept', 'application/json')
      .set('Authorization', localStorage.getItem('accessToken'))
      .send({ note: { id: noteId } })
      .end(function(error, res){
        if (res) {
          if (res.error) {
            var errorMsgs = _getErrors(res);
            NoteActions.deleteNote(noteId);
          } else {
            json = JSON.parse(res.text);
            NoteActions.deleteNote(noteId);
          }
        }
      });
  }

  updateNote(noteId, title, body) {
    request.put(NOTES_URL + '/' + noteId)
      .set('Accept', 'application/json')
      .set('Authorization', localStorage.getItem('accessToken'))
      .send({ note: { title: title, body: body }})
      .end(function(error, res){
        if (res) {
          if (res.error) {
            var errorMsgs = _getErrors(res);
            NoteActions.updateNote(json)
          } else {
            json = JSON.parse(res.text);
            NoteActions.updateNote(json);
          }
        }
      });
  }
}
