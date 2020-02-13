/**
 * 工具类库（时间格式化 localstorage封装等等 realm库工具）
 */
import config from '../config/config';

/**
 *
 * @param {*} url
 * @param {*} params
 */
export const parseUrl = (url, params) => {
  // {name:'laike',pwd:'123456'} => name=laike&pwd=123456
  let str = Object.keys(params).reduce((result, key) => {
    result += `${key}=${params[key]}&`;
    return result;
  });

  return `${config.BASE_URL}${url}?${str.substr(0, str.length - 1)}`;
};
