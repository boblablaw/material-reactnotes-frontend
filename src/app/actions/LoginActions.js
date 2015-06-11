import Dispatcher from '../dispatcher/Dispatcher';
import {LOGIN_USER, LOGOUT_USER} from '../constants/LoginConstants';
import RouterContainer from '../services/RouterContainer'

export default {
  loginUser: (token) => {
    var savedToken = localStorage.getItem('accessToken');
    if (savedToken !== token) {
      var nextPath = RouterContainer.get().getCurrentQuery().nextPath || '/';

      RouterContainer.get().transitionTo(nextPath);
      localStorage.setItem('accessToken', token);
    }
    Dispatcher.dispatch({
      actionType: LOGIN_USER,
      accessToken: token
    });
  },
  
  logoutUser: () => {
    RouterContainer.get().transitionTo('/welcome');
    localStorage.removeItem('accessToken');
    Dispatcher.dispatch({
      actionType: LOGOUT_USER
    });
  }
}
