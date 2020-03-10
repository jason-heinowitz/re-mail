import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Home from '../components/Home';
import Login from '../components/Login';
import Page404 from '../components/Page404';
import Emails from '../components/Emails';
import Register from '../components/Register';
import CreateEmail from '../components/CreateEmail';
import * as actions from '../actions/sagaActions';

const mapStateToProps = (state) => ({
  authed: state.login.authed,
  emails: state.email.emails,
});

const mapDispatchToProps = (dispatch) => ({
  // auth actions
  login: (username, password) => dispatch(actions.login(username, password)),
  logout: () => dispatch(actions.logout()),
  checkCookies: () => dispatch(actions.check()),
  register: (user) => {
    dispatch(actions.register(user));
  },

  // email actions
  getEmails: () => dispatch(actions.getEmails()),
  sendEmail: (obj) => dispatch(actions.sendEmail(obj)),
});

const MainContainer = (props) => {
  useEffect(props.checkCookies, []);

  return (
    <div>
      <h1>Main Container</h1>
      <button onClick={props.logout}>Logout</button>

      <Router>
        <Link to="/">Home</Link>
        {props.authed === false ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <Link to="/emails">Emails</Link>
            <Link to="/create">Create Email</Link>
          </>
        )}

        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>

          {props.authed === false ? (
            <>
              <Route path="/login">
                <Login login={props.login} />
              </Route>
              <Route path="/register">
                <Register register={props.register} />
              </Route>

              <Route path="/emails">
                <Redirect to="/" />
              </Route>
              <Route path="/create">
                <Redirect to="/" />
              </Route>
            </>
          ) : (
            <>
              <Route path="/login">
                <Redirect to="/emails" />
              </Route>
              <Route path="/register">
                <Redirect to="/emails" />
              </Route>

              <Route path="/emails">
                <Emails getEmails={props.getEmails} emails={props.emails} />
              </Route>
              <Route path="/create">
                <CreateEmail sendEmail={props.sendEmail} />
              </Route>
            </>
          )}

          <Route>
            <Page404 />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
