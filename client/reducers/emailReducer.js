import * as types from '../constants/emailTypes';

const initialState = {
  emails: [],
};

const emailReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_EMAILS_SUCCESS:
      return {
        ...state,
        emails: action.emails.reverse(),
      };
    default:
      return state;
  }
};

export default emailReducer;
