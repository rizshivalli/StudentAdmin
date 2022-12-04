/* Login Reducer
 * handles login states in the app
 */
import {SUCCESS, LOG_IN} from '../actions';

export const initialState = {
  jwt: undefined,
  user: {
    id: undefined,
    username: undefined,
    email: undefined,
  },
};

export default (
  state = initialState,
  {type, payload}: {type: string; payload: any},
) => {
  switch (type) {
    case `${LOG_IN}_${SUCCESS}`:
      return {
        ...state,
        ...payload,
      };

    default:
      return state;
  }
};
