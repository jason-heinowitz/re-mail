import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import { history } from '../store';
import * as actions from '../actions/authSaga';

import Login from '../components/Login';
import Register from '../components/Register';

const mapStateToProps = (state) => ({
  authed: state.auth.authed,
  firstLoad: state.auth.firstLoad,
});

const mapDispatchToProps = (dispatch) => ({
  checkCookies: () => dispatch(actions.checkCookies()),
  login: (userObj) => dispatch(actions.login(userObj)),
  register: (userObj) => dispatch(actions.register(userObj)),
});

const MainContainer = (props) => {
  useEffect(props.checkCookies, []);

  if (props.firstLoad === true) {
    return <h1>Please wait while your information loads...</h1>;
  }

  // Display action page after cookies are validated
  return (
    <>
      <h1>Welcome to Re-Mail</h1>

      <ConnectedRouter history={history}>
        <div id="navbar">
          <div className="left">
            <h3>Re-Mail</h3>
          </div>
          <div className="right">
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        </div>

        <Switch>
          <Route path="/" exact></Route>
          <Route path="/login">
            <Login login={props.login} />
          </Route>
          <Route path="/register">
            <Register register={props.register} />
          </Route>
        </Switch>
      </ConnectedRouter>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
