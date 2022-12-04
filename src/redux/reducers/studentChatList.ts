// messages reducer is responsible for handling messages state

import {STORE_STUDENT_CHAT_LIST} from '../actions';

export const initialState = {
  students: [],
};

export default (
  state = initialState,
  {type, payload}: {type: string; payload: any},
) => {
  switch (type) {
    case `${STORE_STUDENT_CHAT_LIST}`:
      // check if payload.id is already in state.students
      const studentIndex = state.students.findIndex(
        (student: any) => student.id === payload.id,
      );
      // if studentIndex is -1, then student is not in state.students
      if (studentIndex === -1) {
        // add student to state.students
        return {
          ...state,
          students: [...state.students, payload],
        };
      }
      return {
        ...state,
      };
    default:
      return state;
  }
};
