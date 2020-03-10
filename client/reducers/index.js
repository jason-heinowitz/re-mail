import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import emailReducer from './emailReducer';

const reducers = combineReducers({
  login: loginReducer,
  email: emailReducer,
});

export default reducers;
