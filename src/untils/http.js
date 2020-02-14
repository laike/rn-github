/**
 * 网络请求封装类库，使用axios封装，也可以选择使用fetch，注意这里可能我们要封装
 * 下设置请求头，以及根据服务器端像一个的状态码判断，提示用户提升用户体验
 */
import axios from 'axios';
import {parseUrl} from './untils';
/**
 *
 * @param {*} url
 * @param {*} params
 */
export const get = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    axios
      .get(parseUrl(url, params))
      .then(resp => {
        resolve(resp);
      })
      .catch(error => {
        reject(error);
      });
  });
};
/**
 *
 * @param {*} url
 * @param {*} data
 */
export const post = (url, data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(url, data)
      .then(resp => {
        resolve(resp);
      })
      .catch(error => {
        reject(error);
      });
  });
};
