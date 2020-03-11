import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import authReducer from './authReducer';

const reducerCreator = (history) => {
  return combineReducers({
    router: connectRouter(history),
    auth: authReducer,
  });
};

export default reducerCreator;
