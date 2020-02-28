import {SEARCH_REPONSITORIES, GET_THEME, GET_DYNAMIC} from '../constants/types';
import {handleActions} from 'redux-actions';
import {BG_COLOR, BLACK_COLOR} from '../constants/styles';

const initialState = {
  lists: [],
};
//这个代码是使用handleActions 进行改造了的
export default handleActions(
  {
    [GET_DYNAMIC]: (state, action) => {
      return {
        ...state,
        dynamic: {
          lists: action.res,
        },
      };
    },
  },
  initialState,
);
