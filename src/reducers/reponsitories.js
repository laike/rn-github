import {SEARCH_REPONSITORIES, GET_TRENDING} from '../constants/types';
import {handleActions} from 'redux-actions';

//这个代码是使用handleActions 进行改造了的
export default handleActions(
  {
    [GET_TRENDING]: (state, action) => {
      return {
        ...state,
        trending_list: action.res,
      };
    },
  },
  {},
);
