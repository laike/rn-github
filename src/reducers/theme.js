import {GET_CODE_THEME, GET_THEME} from '../constants/types';
import {handleActions} from 'redux-actions';
import {BG_COLOR, BLACK_COLOR, CODE_DEFAULT_THEME} from '../constants/styles';

const initialState = {
  theme: BLACK_COLOR,
  codetheme: CODE_DEFAULT_THEME,
};
//这个代码是使用handleActions 进行改造了的
export default handleActions(
  {
    [GET_THEME]: (state, action) => {
      return {
        ...state,
        theme: action.res,
      };
    },
    [GET_CODE_THEME]: (state, action) => {
      return {
        ...state,
        codetheme: action.res,
      };
    },
  },
  initialState,
);
