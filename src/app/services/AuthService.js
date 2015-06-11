import request from 'reqwest';
import when from 'when';
import {LOGIN_URL, SIGNUP_URL} from '../constants/LoginConstants';
import LoginActions from '../actions/LoginActions';

class AuthService {
  login(username, password) {
    return this.handleAuth(when(request({
      url: LOGIN_URL,
      method: 'POST',
      crossOrigin: true,
      type: 'json',
      grant_type: 'password',
      data: {
        username, password
      }
    })));
  }

  logout() {
    LoginActions.logoutUser();
  }

  signup(email, username, password, password_confirmation) {
    return this.handleAuth(when(request({
      url: SIGNUP_URL,
      method: 'POST',
      crossOrigin: true,
      type: 'json',
      data: {
        user: { email, username, password, password_confirmation }
      }
    })));
  }

  handleAuth(loginPromise) {
    return loginPromise
      .then(function(response) {
        var token = response.access_token;
        LoginActions.loginUser(token);
        return true;
      });
  }
}

export default new AuthService()