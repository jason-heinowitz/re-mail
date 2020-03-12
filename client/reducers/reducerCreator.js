import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import authReducer from './authReducer';
import emailReducer from './emailReducer';

const reducerCreator = (history) => {
  return combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    email: emailReducer,
  });
};

export default reducerCreator;
