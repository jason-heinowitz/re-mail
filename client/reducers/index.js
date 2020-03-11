import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import loginReducer from './loginReducer';
import emailReducer from './emailReducer';

const reducers = (history) =>
  combineReducers({
    router: connectRouter(history),
    login: loginReducer,
    email: emailReducer,
  });

export default reducers;
