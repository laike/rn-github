import {LOGIN_IN, LOGIN_OUT} from '../constants/types';
import {createActions} from 'redux-actions';
export default createActions({
  [LOGIN_IN]: msg => {
    return {
      msg,
    };
  },
  [LOGIN_OUT]: () => {
    return {};
  },
});
