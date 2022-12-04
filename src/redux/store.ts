import {createStore, compose, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import {createNetworkMiddleware} from 'react-native-offline';

import appReducer from './reducers';
import appSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
const networkMiddleware = createNetworkMiddleware({
  regexActionType: /.*REQUEST/,
});

let middleware = [networkMiddleware, sagaMiddleware];

let composeEnhancers = compose;

if (__DEV__) {
  // @ts-ignore
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const createDebugger = require('redux-flipper').default;
  middleware.push(createDebugger());
}

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['loading', 'error', 'currentSession'],
  debug: true, //to get useful logging};
};

const persistedReducer = persistReducer(persistConfig, appReducer);

export const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(...middleware)),
);

export default function configureStore() {
  const persistor = persistStore(store);
  sagaMiddleware.run(appSaga);
  return {store, persistor};
}
