import { createStore, compose, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import createSagaMiddleware from 'redux-saga';
import { watchAuth } from './sagas/loginSaga';
import { watchEmails } from './sagas/emailSaga';

import reducers from './reducers/index';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducers,
  compose(applyMiddleware(sagaMiddleware), composeWithDevTools())
);

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchEmails);

export default store;
