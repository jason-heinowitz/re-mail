import * as types from '../constants/authTypes';

const initialState = {
  authed: false,
  firstLoad: true,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default authReducer;
