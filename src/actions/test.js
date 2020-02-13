import {TEST_ACTION} from '../constants/types';
export const testAction = msg => {
  return {
    type: TEST_ACTION,
    msg,
  };
};
