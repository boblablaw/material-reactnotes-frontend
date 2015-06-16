import {LOGIN_USER, LOGOUT_USER} from '../constants/LoginConstants';
import BaseStore from './BaseStore';

export default new class LoginStore extends BaseStore {
  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this))
    this._username = null;
    this._accessToken = null;
    this._email = null;
  }

  _registerToActions(action) {
    switch(action.actionType) {
      case LOGIN_USER:
        this._accessToken = action.accessToken;
        this.emitChange();
        break;
      case LOGOUT_USER:
        this._username = null;
        this._email = null;
        this._accessToken = null;
        this.emitChange();
        break;
      default:
        break;
    };
  }

  get username() {
    return this._username;
  }

  get accessToken() {
    return this._accessToken;
  }
  
  get email() {
    return this._email;
  }

  isLoggedIn() {
//    return !!this._username;
    return !!this._accessToken;
  }
};
