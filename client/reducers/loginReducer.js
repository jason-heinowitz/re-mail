import * as types from '../constants/loginTypes';
import React from 'react';
import { Redirect } from 'react-router-dom';

const initialState = {
  authed: null,
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
    case types.REGISTER_SUCCESS:
      return state;
    case types.REGISTER_FAIL:
      return state;
    default:
      return state;
  }
};

export default loginReducer;
