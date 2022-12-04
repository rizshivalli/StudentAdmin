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
      } else {
        // update student in state.students
        return {
          ...state,
          students: [
            ...state.students.slice(0, studentIndex),
            payload,
            ...state.students.slice(studentIndex + 1),
          ],
        };
      }

    default:
      return state;
  }
};
