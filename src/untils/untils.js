/**
 * 工具类库（时间格式化 localstorage封装等等 realm库工具）
 */
import config from '../config/config';
import Realm from '../dao/db';
//这里我们需要引入一个toast
import Toast from 'react-native-root-toast';
import schema from '../dao/schema';
//引入Actions
import {Actions} from 'react-native-router-flux';
import {FETCH_LANGUAGES} from '../constants/types';
import {CONST_BASIC_LANGUAGES} from '../constants/constants';
//引入API
import Api from './api';
//引入判断工具库
import _ from 'lodash';
/**
 * 显示Toast
 * @param {string} msg
 * @param {number} duration
 * @param {string} pos
 */
export const toast = (
  msg,
  duration = Toast.durations.SHORT,
  pos = Toast.positions.CENTER,
) => {
  Toast.show(msg, {
    duration: duration,
    position: pos,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
  });
};
/**
 *隐藏某个Toast
 * @param {*} toast
 */
export const hideToast = toast => {
  Toast.hide(toast);
};
/**
 *
 * @param {*} url
 * @param {*} params
 */
export const parseUrl = (url, params) => {
  // {name:'laike',pwd:'123456'} => name=laike&pwd=123456
  //如果params为空 返回空字符串
  if (_.isEmpty(params)) {
    return url;
  }
  let str = Object.keys(params).reduce((result, key) => {
    result += `${key}=${params[key]}&`;
    return result;
  });

  return `${config.BASE_URL}${url}?${str.substr(0, str.length - 1)}`;
};
/**
 *
 * @param {string} code
 * @param {string} msg
 */
export const handleError = (code, msg = '') => {
  switch (code) {
    case 400:
      toast('请求错误');
      return '请求错误';
    case 401:
      //这里处理未授权
      //授权逻辑
      if (Actions.currentScene !== 'login') {
        Actions.reset('login');
      }
      return '未授权，请登录';
    case 403:
      toast('拒绝访问');
      return '拒绝访问';
    case 404:
      toast('未找到访问地址');
      return '未找到访问地址';
    case 408:
      toast('请求超时');
      return '请求超时';
    case 500:
      toast('服务器内部错误');
      return '服务器内部错误';
    case 501:
      toast('服务未实现');
      return '服务未实现';
    case 502:
      toast('网关错误');
      return '网关错误';
    case 503:
      toast('服务不可用');
      return '服务不可用';
    case 504:
      toast('网关超时');
      return '网关超时';
    case 505:
      toast('HTTP版本不受支持');
      return 'HTTP版本不受支持';
    default:
      if (msg) {
        //提示用
        toast(msg);
      }
      return '未知错误';
  }
};
/**
 * 清除指定数据库中的某个表，原因是有时候我们后面该需求或者调试代码
 * @param {string} table  表明
 */
export const clearRealmTable = table => {
  //先清空一下
  Realm.write(() => {
    let localDatas = Realm.objects(table);
    Realm.delete(localDatas);
    if (__DEV__) {
      console.log(`${table} 表已经清空了！`);
    }
  });
};
/**
 * 清除数据库中的所有表
 */
export const clearAllRealmTabs = () => {
  schema.forEach(s => {
    clearRealmTable(s.name);
  });
};
/**
 * 获取语言列表暂时没有用因为获取到了太多页面，并且很多请求都是空的。
 */
export const getLanguageList = () => {
  let langs = Api.getTrendingApi(FETCH_LANGUAGES);
  if (langs) {
    return langs;
  } else {
    return CONST_BASIC_LANGUAGES;
  }
};
