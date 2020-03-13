import { createStore, compose, applyMiddleware } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducerCreator from './reducers/reducerCreator';
import { watchAuth, watchNewPassword } from './sagas/authSaga';
import { watchGet, watchDelete, watchSend } from './sagas/emailSaga';
import {
  watchFlashCreate,
  watchFlashDelete,
  flashAll,
} from './sagas/flashSaga';

export const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducerCreator(history),
  compose(
    applyMiddleware(sagaMiddleware),
    applyMiddleware(routerMiddleware(history)),
    composeWithDevTools()
  )
);

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchNewPassword);
sagaMiddleware.run(watchGet);
sagaMiddleware.run(watchDelete);
sagaMiddleware.run(watchSend);
sagaMiddleware.run(watchFlashCreate);
sagaMiddleware.run(watchFlashDelete);
sagaMiddleware.run(flashAll);

export default store;
