import React from 'react';
import Router, {Route, NotFoundRoute, Redirect} from 'react-router';

import Master from './components/Master.jsx'
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Welcome from './components/Welcome';
import About from './components/About';
import GetStarted from './components/GetStarted';
import Features from './components/Features';
import NoteItem from './components/notes/NoteItem';

import LoginActions from './actions/LoginActions';
import RouterContainer from './services/RouterContainer';
import injectTapEventPlugin from 'react-tap-event-plugin';

let routes = (
  <Route name="root" handler={Master}>
    <Route name="welcome" path="/welcome" handler={Welcome}/>
    <Route name="get-started" path="/get-started" handler={GetStarted}/>
    <Route name="about" path="/about" handler={About}/>
    <Route name="features" path="/features" handler={Features}/>
    <Route name="login" path="/login" handler={Login}/>
    <Route name="signup" path="/signup" handler={Signup}/>
    <Route name="home" path="/" handler={Home}>
      <Route name="note" path="/notes/:noteId" handler={NoteItem}/>
    </Route>
    <NotFoundRoute handler={Welcome}/>
    <Redirect from="boobs" to="welcome" />
  </Route>
);

//Needed for onTouchTap
  //Can go away when react 1.0 release
  //Check this repo:
  //https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

let router = Router.create({routes});
RouterContainer.set(router);

let accessToken = localStorage.getItem('accessToken');
if (accessToken) {
  LoginActions.loginUser(accessToken);
}

router.run(function (Handler) {
  React.render(<Handler />, document.getElementById('content'));
});
