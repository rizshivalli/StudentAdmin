import {connect, ConnectedProps} from 'react-redux';
import StudentList from './StudentList';
import type {Dispatch} from 'redux';
import {FETCH_STUDENTS, LOG_IN, LOG_OUT, REQUEST} from '../../redux/actions';

interface StateProps {
  loading: {
    login?: boolean;
  };
  loginReducer: {
    jwt: string;
  };
  studentChatListReducer: {
    students: Array<any>;
  };
}
export type FormValues = {
  identifier: string;
  password: string;
};

interface DispatchProps {
  login: {
    values: FormValues;
    callback?: (payload?: any) => void;
  };
  fetchStudents: {
    callback?: (payload?: any) => void;
    payload?: {
      limit?: number;
      start?: number;
      token?: string;
    };
  };
}

const mapStateToProps = (state: StateProps) => {
  const {login: loginLoading} = state.loading || {};
  const {jwt: token} = state.loginReducer || {};
  const {students} = state.studentChatListReducer || {};
  return {
    loginLoading,
    token,
    students,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  const logout = () => {
    return dispatch({
      type: `${LOG_OUT}`,
    });
  };
  const login = (props: DispatchProps['login']) => {
    const {values, callback = () => {}} = props || {};
    const {
      identifier = 'rizshivalli@gmail.com',
      password = 'qwertyuiop',
    }: FormValues = values || {};
    return dispatch({
      type: `${LOG_IN}_${REQUEST}`,
      payload: {identifier, password},
      callback: callback,
    });
  };

  const fetchStudents = (props: DispatchProps['fetchStudents']) => {
    const {callback = () => {}, payload} = props || {};
    return dispatch({
      type: `${FETCH_STUDENTS}_${REQUEST}`,
      callback: callback,
      payload: payload,
    });
  };

  return {
    logout,
    login,
    fetchStudents,
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(StudentList);
