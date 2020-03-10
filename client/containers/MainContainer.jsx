import React from 'react';
import { connect } from 'react-redux';
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
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
