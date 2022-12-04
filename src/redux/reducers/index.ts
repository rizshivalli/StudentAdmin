import {CombinedState, combineReducers} from 'redux';
import loading from './loading';
import error from './error';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {reducer as network} from 'react-native-offline';
import {LOG_OUT} from '../actions';
import {NetworkState} from 'react-native-offline/dist/src/types';

const appReducer = combineReducers({
  loading,
  error,
  network,
});

const rootReducer = (
  state:
    | CombinedState<{
        loading: {[key: string]: any};
        error: {[key: string]: any};
        network: NetworkState;
      }>
    | undefined,
  action: {type: string; payload?: any},
) => {
  if (action.type === `${LOG_OUT}`) {
    // for all keys defined in your persistConfig(s)
    AsyncStorage.removeItem('persist:root');
    // storage.removeItem('persist:otherKey')
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
