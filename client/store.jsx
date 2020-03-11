import { createStore, compose, applyMiddleware } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';

import createSagaMiddleware from 'redux-saga';
import {
  watchAuth,
  watchRegister,
  watchPasswordChange,
} from './sagas/loginSaga';
import { watchEmails, watchSend, watchDelete } from './sagas/emailSaga';

import reducers from './reducers/index';
export const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducers(history),
  compose(
    applyMiddleware(sagaMiddleware),
    applyMiddleware(routerMiddleware(history)),
    composeWithDevTools()
  )
);

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchRegister);
sagaMiddleware.run(watchPasswordChange);
sagaMiddleware.run(watchEmails);
sagaMiddleware.run(watchSend);
sagaMiddleware.run(watchDelete);

export default store;
