import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import authReducer from './authReducer';
import emailReducer from './emailReducer';
import flashReducer from './flashReducer';

const reducerCreator = (history) => {
  return combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    email: emailReducer,
    flash: flashReducer,
  });
};

export default reducerCreator;
