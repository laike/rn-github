import {TEST_ACTION} from '../constants/types';
import {handleActions} from 'redux-actions';
import Api from '../untils/api';
const initialState = {
  todos: [],
};

//这个代码是使用handleActions 进行改造了的
export default handleActions(
  {
    [TEST_ACTION]: (state, {payload: {msg}}) => {
      Api.getUserRestoriesInfo('laike', {page: 1, per_page: 10})
        .then(res => {
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
      return {
        ...state,
        msg,
      };
    },
  },
  initialState,
);
