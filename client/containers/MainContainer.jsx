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
import * as actions from '../actions/sagaActions';

const mapStateToProps = (state) => ({
  authed: state.login.authed,
});

const mapDispatchToProps = (dispatch) => ({
  // auth actions
  login: (username, password) => dispatch(actions.login(username, password)),
  logout: () => dispatch(actions.logout()),
  checkCookies: () => dispatch(actions.check()),

  // email actions
  getEmails: () => dispatch(actions.getEmails()),
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
          <Link to="/emails">Emails</Link>
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
                <Register />
              </Route>

              <Route path="/emails">
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
                <Emails getEmails={props.getEmails} />
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
