import {SEARCH_REPONSITORIES, GET_THEME} from '../constants/types';
import {handleActions} from 'redux-actions';
import {BG_COLOR} from '../constants/styles';

const initialState = {
  theme: BG_COLOR,
};
//这个代码是使用handleActions 进行改造了的
export default handleActions(
  {
    [GET_THEME]: (state, action) => {
      return {
        ...state,
        theme: {
          color: action.res,
        },
      };
    },
  },
  initialState,
);
