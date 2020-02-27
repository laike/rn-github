import {combineReducers} from 'redux';

import responsitories from '../reducers/reponsitories';
import theme from '../reducers/theme';

export default combineReducers({
  responsitories,
  theme,
});
