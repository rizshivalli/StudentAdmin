import {connect, ConnectedProps} from 'react-redux';
import StudentList from './StudentList';
import type {Dispatch} from 'redux';
import {LOG_IN, LOG_OUT, REQUEST} from '../../redux/actions';
import {FormikHelpers} from 'formik';

interface StateProps {
  loading: {
    login?: boolean;
  };
  loginReducer: {
    token: string;
  };
}
export type FormValues = {
  identifier: string;
  password: string;
};

interface DispatchProps {
  login: {
    values: FormValues;
    actions?: FormikHelpers<FormValues>;
    callback?: (payload?: any) => void;
  };
}

const mapStateToProps = (state: StateProps) => {
  const {login: loginLoading} = state.loading || {};
  const {token} = state.loginReducer || {};
  return {
    loginLoading,
    token,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  const logout = () => {
    return dispatch({
      type: `${LOG_OUT}`,
    });
  };
  const login = (props: DispatchProps['login']) => {
    const {values, actions, callback = () => {}} = props || {};
    const {
      identifier = 'rizshivalli@gmail.com',
      password = 'qwertyuiop',
    }: FormValues = values || {};
    return dispatch({
      type: `${LOG_IN}_${REQUEST}`,
      payload: {identifier, password},
      actions: actions,
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
