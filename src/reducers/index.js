import {combineReducers} from 'redux';
import responsitories from '../reducers/reponsitories';
import theme from '../reducers/theme';
import dynamic from '../reducers/dynamic';
export default combineReducers({
  responsitories,
  theme,
  dynamic,
});
