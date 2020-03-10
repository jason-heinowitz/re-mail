import React from 'react';
import { connect } from 'react-redux';
import Home from '../components/Home';
import Login from '../components/Login';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import * as actions from '../actions/sagaActions';

const mapStateToProps = (state) => ({
  authed: state.login.authed,
});

const mapDispatchToProps = (dispatch) => ({
  login: (username, password) => dispatch(actions.login(username, password)),
  logout: () => dispatch(actions.logout()),
});

const MainContainer = (props) => {
  return (
    <div>
      <h1>Main Container</h1>

      <Router>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>

        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
