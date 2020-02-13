import {TEST_ACTION} from '../constants/types';
const initialState = {
  todos: [],
};
export function test(state = initialState, action) {
  switch (action.type) {
    case TEST_ACTION:
      return Object.assign({}, state, {
        todos: [
          ...state.todos,
          {
            msg: action.msg,
            complete: false,
          },
        ],
      });
    default:
      return state;
  }
}
