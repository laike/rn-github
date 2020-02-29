import {GET_THEME} from '../constants/types';
import {createAction} from 'redux-actions';
import {dispatch} from '../stores';

export const getTheme = createAction(GET_THEME, color => {
  dispatch({
    type: GET_THEME,
    res: color,
  });
});
