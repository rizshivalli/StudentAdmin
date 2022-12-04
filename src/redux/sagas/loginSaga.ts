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
      ...payload,
    });
    console.log(
      '%cMyProject%cline:25%cres',
      'color:#fff;background:#ee6f57;padding:3px;border-radius:2px',
      'color:#fff;background:#1f3c88;padding:3px;border-radius:2px',
      'color:#fff;background:rgb(56, 13, 49);padding:3px;border-radius:2px',
      res.data,
    );

    yield put({
      type: `${LOG_IN}_${SUCCESS}`,
      payload: {...res.data},
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
