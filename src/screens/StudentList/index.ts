import {connect, ConnectedProps} from 'react-redux';
import StudentList from './StudentList';
import type {Dispatch} from 'redux';
import {LOG_IN, LOG_OUT, REQUEST} from '../../redux/actions';

interface StateProps {
  loading: {
    login?: boolean;
  };
  loginReducer: {
    token: string;
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
}

const mapStateToProps = (state: StateProps) => {
  const {login: loginLoading} = state.loading || {};
  const {token} = state.loginReducer || {};
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

  return {
    logout,
    login,
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(StudentList);
