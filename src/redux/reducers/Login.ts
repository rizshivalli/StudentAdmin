/* Login Reducer
 * handles login states in the app
 */
import {SUCCESS, LOG_IN, REQUEST} from '../actions';

export const initialState = {
  email: undefined,
  token: undefined,
};

export default (
  state = initialState,
  {type, payload}: {type: string; payload: any},
) => {
  switch (type) {
    case `${LOG_IN}_${SUCCESS}`:
      return {
        ...state,
        email: payload.email,
      };

      return {
        ...state,
        token: payload.emr_token,
        book_token: payload.book_token,
      };
    default:
      return state;
  }
};
