import {
  all,
  fork,
  takeLatest,
  call,
  put,
  CallEffect,
  PutEffect,
} from 'redux-saga/effects';
import {REQUEST, LOG_IN, SUCCESS, FAIL} from '../actions';

import NavigationService from '@utils/NavigationService';
import {getErrorMessage} from '../../utils/ErrorUtil';
import {API_INSTANCE} from '../../utils/ApiUtils';
import {LOGIN_URL} from '../../constants/ApiEndpoints';

function* Login({payload, callback = function () {}}: any): Generator<
  | CallEffect<unknown>
  | PutEffect<{
      type: string;
      payload: any;
    }>,
  void,
  any
> {
  try {
    const res = yield call(API_INSTANCE().post, LOGIN_URL, {
      data: payload,
    });

    yield put({
      type: `${LOG_IN}_${SUCCESS}`,
      payload: {...res.data.data, ...payload},
    });

    callback && callback(res.data.data?.otp_token);
  } catch (error) {
    const message = getErrorMessage(error, LOG_IN);

    yield put({
      type: `${LOG_IN}_${FAIL}`,
      payload: error,
    });
  }
}

function* LoginRequest() {
  yield takeLatest(`${LOG_IN}_${REQUEST}`, Login);
}

export default function* root() {
  yield all([fork(LoginRequest)]);
}
