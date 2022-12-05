import {
  all,
  fork,
  takeLatest,
  call,
  put,
  CallEffect,
  PutEffect,
} from 'redux-saga/effects';
import {
  REQUEST,
  FETCH_STUDENTS,
  UPDATE_STUDENT,
  FETCH_ONE_STUDENT,
  SUCCESS,
  FAIL,
} from '../actions';
import {getErrorMessage} from '../../utils/ErrorUtil';
import {API_INSTANCE} from '../../utils/ApiUtils';
import {STUDENTS} from '../../constants/ApiEndpoints';

function* FetchStudentsFromAPI({
  payload,
  callback = function () {},
}: any): Generator<
  | CallEffect<unknown>
  | PutEffect<{
      type: string;
      payload: any;
    }>,
  void,
  any
> {
  try {
    const {token, ...rest} = payload;
    const res = yield call(API_INSTANCE().get, STUDENTS, {
      ...rest,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.data.data) {
      yield put({
        type: `${FETCH_STUDENTS}_${SUCCESS}`,
        payload: {...res.data.data},
      });
      callback && callback(res.data.data);
    }
  } catch (error) {
    const message = getErrorMessage(error, FETCH_STUDENTS);

    yield put({
      type: `${FETCH_STUDENTS}_${FAIL}`,
      payload: error,
    });
  }
}

function* UpdateStudent({payload, callback = function () {}}: any): Generator<
  | CallEffect<unknown>
  | PutEffect<{
      type: string;
      payload: any;
    }>,
  void,
  any
> {
  try {
    const res = yield call(API_INSTANCE().put, STUDENTS, {
      ...payload,
    });

    if (res.data.data) {
      yield put({
        type: `${UPDATE_STUDENT}_${SUCCESS}`,
        payload: {...res.data.data},
      });
    }
  } catch (error) {
    const message = getErrorMessage(error, UPDATE_STUDENT);
  }
}

function* FetchOneStudent({payload, callback = function () {}}: any): Generator<
  | CallEffect<unknown>
  | PutEffect<{
      type: string;
      payload: any;
    }>,
  void,
  any
> {
  try {
    const res = yield call(API_INSTANCE().get, `${STUDENTS}/${payload.id}`, {
      ...payload,
    });

    if (res.data.data) {
      yield put({
        type: `${FETCH_ONE_STUDENT}_${SUCCESS}`,
        payload: {...res.data.data},
      });
    }
  } catch (error) {
    const message = getErrorMessage(error, FETCH_ONE_STUDENT);
  }
}

function* FetchStudentsRequest() {
  yield takeLatest(`${FETCH_STUDENTS}_${REQUEST}`, FetchStudentsFromAPI);
}

function* UpdateStudentsRequest() {
  yield takeLatest(`${UPDATE_STUDENT}_${REQUEST}`, UpdateStudent);
}

function* FetchOneStudentRequest() {
  yield takeLatest(`${FETCH_ONE_STUDENT}_${REQUEST}`, FetchOneStudent);
}
export default function* root() {
  yield all([fork(FetchStudentsRequest)]);
  yield all([fork(UpdateStudentsRequest)]);
  yield all([fork(FetchOneStudentRequest)]);
}
