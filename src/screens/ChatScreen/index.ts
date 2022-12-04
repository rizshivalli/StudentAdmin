import ChatScreen from './ChatScreen';
import {connect, ConnectedProps} from 'react-redux';
import type {Dispatch} from 'redux';
import {LOG_IN, LOG_OUT, REQUEST} from '../../redux/actions';

interface StateProps {
  loading: {
    messagesReducer?: boolean;
  };
  messagesReducer: {
    allMessages: Array<any>;
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
  storeMessages: {
    user_id: string;
    messages: Array<any>;
  };
}

const mapStateToProps = (state: StateProps) => {
  const {messagesReducer: messageLoading} = state.loading || {};
  const prevMessages = state.messagesReducer || {};
  console.log(
    '%cMyProject%cline:32%cstate.messagesReducer',
    'color:#fff;background:#ee6f57;padding:3px;border-radius:2px',
    'color:#fff;background:#1f3c88;padding:3px;border-radius:2px',
    'color:#fff;background:rgb(248, 214, 110);padding:3px;border-radius:2px',
    state.messagesReducer,
  );
  return {
    messageLoading,
    prevMessages,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  const storeMessages = (payload: DispatchProps['storeMessages']) => {
    const {user_id, messages} = payload || {};

    // reference all messages to user_id
    const allMessages = {
      [user_id]: messages,
    };
    return dispatch({
      type: 'STORE_MESSAGES',
      payload: allMessages,
    });
  };

  const storeStudentChatList = (payload: {}) => {
    return dispatch({
      type: 'STORE_STUDENT_CHAT_LIST',
      payload,
    });
  };

  return {
    storeMessages,
    storeStudentChatList,
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(ChatScreen);
