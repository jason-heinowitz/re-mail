import * as types from '../constants/loginTypes';

const initialState = {
  authed: false,
};

/*
  Possible actions for reducer to read:
  - login success
  - login fail
  - logout
*/

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        authed: true,
      };
    case types.LOGIN_FAIL:
      return {
        ...state,
        authed: false,
      };
    case types.LOGOUT_SUCESS:
      return {
        ...state,
        authed: false,
      };
    default:
      return state;
  }
};

export default loginReducer;
