// messages reducer is responsible for handling messages state

import {STORE_MESSAGES} from '../actions';

export const initialState = {};

export default (
  state = initialState,
  {type, payload}: {type: string; payload: any},
) => {
  switch (type) {
    case `${STORE_MESSAGES}`:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};
