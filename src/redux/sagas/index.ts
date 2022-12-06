import {all, fork} from 'redux-saga/effects';

import StudentSaga from './studentSaga';

import {networkSaga} from 'react-native-offline';

export default function* rootSaga() {
  yield all([
    fork(StudentSaga),
    // @ts-ignore
    fork(networkSaga, {
      pingInterval: 20000,
      pingServerUrl: 'https://google.com',
      pingInBackgroundL: true,
      pingOnlyIfOffline: true,
    }),
  ]);
}
