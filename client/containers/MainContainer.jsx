import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import { history } from '../store';
import * as actions from '../actions/authSaga';

import Login from '../components/Login';
import Register from '../components/Register';
import EmailContainer from './EmailContainer';

const mapStateToProps = (state) => ({
  authed: state.auth.authed,
  firstLoad: state.auth.firstLoad,
});

const mapDispatchToProps = (dispatch) => ({
  checkCookies: () => dispatch(actions.checkCookies()),
  login: (userObj) => dispatch(actions.login(userObj)),
  logout: () => dispatch(actions.logout()),
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
                <button onClick={props.logout} type="submit">
                  Logout
                </button>
              </>
            )}
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
