import {TEST_ACTION} from '../constants/types';
import {createActions} from 'redux-actions';
export default createActions({
  [TEST_ACTION]: msg => {
    return {
      msg,
    };
  },
});
