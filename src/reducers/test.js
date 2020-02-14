import {TEST_ACTION} from '../constants/types';
import {handleActions} from 'redux-actions';
import Api from '../untils/api';
const initialState = {
  todos: [],
};

//这个代码是使用handleActions 进行改造了的
export default handleActions(
  {
    [TEST_ACTION]: (state, action) => {
      alert('ok');
      Api.getUserRestoriesInfo('laike', {page: 1, per_page: 10}).then(res => {
        return Object.assign({}, state, {
          todos: res,
        });
      });
    },
  },
  initialState,
);
