import {connect, ConnectedProps} from 'react-redux';
import StudentList from './StudentList';
import type {Dispatch} from 'redux';
import {FETCH_STUDENTS, LOG_IN, LOG_OUT, REQUEST} from '../../redux/actions';

interface StateProps {
  loading: {
    login?: boolean;
    FETCH_STUDENTS?: boolean;
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
      page: number;
    };
  };
}

const mapStateToProps = (state: StateProps) => {
  const {FETCH_STUDENTS: studentChatLoading} = state.loading || {};
  const {students} = state.studentChatListReducer || {};
  return {
    students,
    studentChatLoading: Boolean(studentChatLoading),
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  const fetchStudents = (props: DispatchProps['fetchStudents']) => {
    const {callback = () => {}, payload} = props || {};
    return dispatch({
      type: `${FETCH_STUDENTS}_${REQUEST}`,
      callback: callback,
      payload: payload,
    });
  };

  return {
    fetchStudents,
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(StudentList);
