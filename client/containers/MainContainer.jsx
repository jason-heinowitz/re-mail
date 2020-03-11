import React, { useEffect } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  authed: state.auth.authed,
  firstLoad: state.auth.firstLoad,
});

const mapDispatchToProps = (dispatch) => ({});

const MainContainer = (props) => {
  if (props.firstLoad === true) {
    return <h1>Please wait while your information loads...</h1>;
  }

  return <h1>Welcome to Re-Mail</h1>;
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
// export default MainContainer;
