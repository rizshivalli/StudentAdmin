import ChatList from './ChatList';
import {connect, ConnectedProps} from 'react-redux';
import type {Dispatch} from 'redux';
import {LOG_IN, LOG_OUT, REQUEST} from '../../redux/actions';

interface StateProps {
  studentChatListReducer: {
    students: Array<any>;
  };
}
export type FormValues = {
  identifier: string;
  password: string;
};

interface DispatchProps {}

const mapStateToProps = (state: StateProps) => {
  const {students} = state.studentChatListReducer || {};
  return {
    students,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {};
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(ChatList);
