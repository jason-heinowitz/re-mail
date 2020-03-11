import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../store';
import Home from '../components/Home';
import Login from '../components/Login';
import Page404 from '../components/Page404';
import Emails from '../components/Emails';
import Register from '../components/Register';
import CreateEmail from '../components/CreateEmail';
import NewPassword from '../components/NewPassword';
import * as actions from '../actions/sagaActions';

const mapStateToProps = (state) => ({
  authed: state.login.authed,
  first: state.login.first,
  emails: state.email.emails,
});

const mapDispatchToProps = (dispatch) => ({
  // auth actions
  login: (username, password) => dispatch(actions.login(username, password)),
  logout: () => dispatch(actions.logout()),
  checkCookies: () => dispatch(actions.check()),
  register: (user) => dispatch(actions.register(user)),
  newPassword: (obj) => dispatch(actions.changePassword(obj)),

  // email actions
  getEmails: () => dispatch(actions.getEmails()),
  sendEmail: (obj) => dispatch(actions.sendEmail(obj)),
  deleteEmail: (id) => dispatch(actions.delEmail(id)),
});

const MainContainer = (props) => {
  useEffect(props.checkCookies, []);

  if (props.first === false) {
    return (
      <div>
        <h1>Welcome to Re(act)-Mail</h1>

        <ConnectedRouter history={history}>
          <Link to="/">Home</Link>
          <br />
          {props.authed === false ? (
            <>
              <Link to="/login">Login</Link>
              <br />
              <Link to="/register">Register</Link>
            </>
          ) : (
            <>
              <button onClick={props.logout}>Logout</button>
              <br />
              <Link to="/emails">Emails</Link>
              <br />
              <Link to="/create">Create Email</Link>
              <br />
              <Link to="/newPassword">Change Password</Link>
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
                  <Emails
                    deleteEmail={props.deleteEmail}
                    getEmails={props.getEmails}
                    emails={props.emails}
                  />
                </Route>
                <Route path="/create">
                  <CreateEmail sendEmail={props.sendEmail} />
                </Route>
                <Route path="/newPassword">
                  <NewPassword newPassword={props.newPassword} />
                </Route>
              </>
            )}

            <Route>
              <Page404 />
            </Route>
          </Switch>
        </ConnectedRouter>
      </div>
    );
  }
  return <h1>Loading...</h1>;
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
