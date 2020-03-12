import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import { history } from '../store';
import * as actions from '../actions/authSaga';
import * as flash from '../actions/flashSaga';

import Login from '../components/Login';
import Register from '../components/Register';
import EmailContainer from './EmailContainer';
import NewPassword from '../components/NewPassword';
import Flash from '../components/Flash';

const mapStateToProps = (state) => ({
  authed: state.auth.authed,
  firstLoad: state.auth.firstLoad,
  flashes: state.flash.messages,
});

const mapDispatchToProps = (dispatch) => ({
  checkCookies: () => dispatch(actions.checkCookies()),
  login: (userObj) => dispatch(actions.login(userObj)),
  logout: () => dispatch(actions.logout()),
  register: (userObj) => dispatch(actions.register(userObj)),
  newPassword: (obj) => dispatch(actions.changePassword(obj)),
  remove: (index) => dispatch(flash.remove(index)),
});

const MainContainer = (props) => {
  useEffect(props.checkCookies, []);

  if (props.firstLoad === true) {
    return <h1>Please wait while your information loads...</h1>;
  }

  // create flash messages for user
  const flashMessages = props.flashes.map((flash, index) => (
    <Flash
      key={flash.message}
      index={index}
      remove={props.remove}
      message={flash.message}
      group={flash.group}
    />
  ));

  // Display action page after cookies are validated
  return (
    <>
      <ConnectedRouter history={history}>
        <div id="navbar">
          <div className="left">
            <h3>Re-Mail</h3>
          </div>
          <div className="right">
            <Link to="/">Home</Link>
            {props.authed === false ? (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
            ) : (
              <>
                <Link to="/emails">Emails</Link>
                <Link to="/newPassword">Change Password</Link>
                <button onClick={props.logout} type="submit">
                  Logout
                </button>
              </>
            )}
          </div>
        </div>

        {flashMessages}

        <Switch>
          <Route path="/" exact></Route>
          <Route path="/login">
            <Login login={props.login} />
          </Route>
          <Route path="/register">
            <Register register={props.register} />
          </Route>
          <Route path="/newPassword">
            <NewPassword newPassword={props.newPassword} />
          </Route>
          <Route path="/emails">
            <EmailContainer />
            {/* <h1>emails lol</h1> */}
          </Route>
        </Switch>
      </ConnectedRouter>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
