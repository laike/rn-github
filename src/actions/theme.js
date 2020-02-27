import {GET_THEME} from '../constants/types';
import {createActions} from 'redux-actions';
import {dispatch} from '../stores';

export default createActions({
  [GET_THEME]: color => {
    dispatch({
      type: GET_THEME,
      res: color,
    });
  },
});
