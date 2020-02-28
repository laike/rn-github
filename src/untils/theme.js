//主题样式工具
import randomColor from 'randomcolor';
import {storeData, getData, toast} from './untils';
import {THEME_KEY, RESTART_TO_CHANGE_THEM} from '../constants/constants';
import store from '../stores';
import {GET_THEME, GET_CODE_THEME} from '../constants/types';
import {DeviceEventEmitter} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {BG_COLOR, CODE_THEME_KEY} from '../constants/styles';
const {dispatch, getState} = store;
export const changeTheme = color => {
  storeData(THEME_KEY, color);
  if (__DEV__) {
    console.log(getState());
  }
  toast('主题修改成功！');
  Theme.getInstance().color = color;
  dispatch({
    type: GET_THEME,
    res: color,
  });
  Actions.reset('root');
};

export const changeCodeTheme = color => {
  storeData(CODE_THEME_KEY, color);
  toast('代码主题修改成功！');
};

export const getGlobalCodeTheme = async () => {
  const theme = await getData(CODE_THEME_KEY, false);
  return theme;
};

export const getGlobalTheme = async () => {
  const theme = await getData(THEME_KEY, false);
  console.log('getGlobalTheme:', theme);
  return theme;
};
export const getTheme = () => {
  //code
  return randomColor({
    luminosity: 'light',
    count: 60,
    format: 'rgba',
  });
};

export const initTheme = () => {
  //这里我们进行初始化
  getGlobalTheme()
    .then(color => {
      console.log('color: ', color);
      dispatch({
        type: GET_THEME,
        res: color,
      });
      console.log(getState());
    })
    .catch(err => {
      console.log(err);
    });

  getGlobalCodeTheme()
    .then(color => {
      dispatch({
        type: GET_CODE_THEME,
        res: color,
      });
    })
    .catch(err => {
      console.log(err);
    });
};

//这里定义一个单例模式
export default class Theme {
  static instance = null;
  constructor() {
    this.color = BG_COLOR;
    getGlobalTheme().then(cl => {
      console.log(cl);
      this.color = cl;
    });
  }
  static getInstance() {
    if (Theme.instance instanceof Theme) {
      return Theme.instance;
    } else {
      return (Theme.instance = new Theme());
    }
  }
}
