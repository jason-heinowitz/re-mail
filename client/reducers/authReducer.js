import * as types from '../constants/authTypes';

const initialState = {
  authed: false,
  firstLoad: true,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        authed: true,
        firstLoad: false,
      };

    case types.LOGIN_FAILED:
      return {
        ...state,
        authed: false,
        firstLoad: false,
      };

    case types.REGISTER_SUCCESS:
      return {
        ...state,
        authed: true,
        firstLoad: false,
      };

    case types.LOGOUT_SUCCESS:
      return {
        ...state,
        authed: false,
        firstLoad: false,
      };
    default:
      return state;
  }
};

export default authReducer;
