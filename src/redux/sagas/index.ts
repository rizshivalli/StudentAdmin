import {all, fork} from 'redux-saga/effects';

import LoginSaga from './loginSaga';

import {networkSaga} from 'react-native-offline';

export default function* rootSaga() {
  yield all([
    fork(LoginSaga),
    // @ts-ignore
    fork(networkSaga, {
      pingInterval: 20000,
      pingServerUrl: 'https://google.com',
      pingInBackgroundL: true,
      pingOnlyIfOffline: true,
    }),
  ]);
}
