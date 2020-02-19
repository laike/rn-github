/**
 * 网络请求封装类库，使用axios封装，也可以选择使用fetch，注意这里可能我们要封装
 * 下设置请求头，以及根据服务器端像一个的状态码判断，提示用户提升用户体验
 */
import axios from 'axios';
import {parseUrl, handleError} from './untils';
import {BASE_URL, TOKEN_KEY, CODE_KEY} from '../config/config';
import QS from 'qs'; //这个库很强大
import {
  CODE_NOT_FOUND,
  CODE_PERMENTLY_REDIRECT,
  CODE_SERVER_ERROR,
  CODE_SUCCESS,
  CONTENT_TYPE_FORMURL,
  CONTENT_TYPE_JSON,
  NEED_AUTH,
} from '../constants/net';
import {AsyncStorage} from '@react-native-community/async-storage';
import {Actions} from 'react-native-router-flux';
//在这里我们再封装一层使用单例模式，并且使用异步函数结合await
class Http {
  static instance = null;
  constructor() {
    this.options = {
      token: null,
      code: null,
      timeout: 15000, //这里设置十秒因为国内访问github api还是很慢
    };
    this.server = axios.create({
      baseURL: BASE_URL,
      timeout: this.options.timeout, //请求超时时间
      withCredentials: false, //不允许跨域防止XSRF
    });
    //这里我们设置请求拦截所有的请求方式默认都是Form方式请求提高兼容性 get 和post
    //方法都是通用的 设置请求拦截
    this.server.interceptors.request.use(
      config => {
        config.headers['Content-Type'] = CONTENT_TYPE_JSON;
        return config;
      },
      error => Promise.reject(error),
    );
    //设置响应拦截
    this.server.interceptors.response.use(
      resp => {
        //请求需要权限这里可以处理跳转到登录页面
        if (resp.status === 401) {
          handleError(resp.status);
          return {
            success: false,
            code: NEED_AUTH,
            msg: '权限不够，需要登录后进行操作！',
          };
        }
        //请求成功的处理方式
        return {
          success: true,
          code: CODE_SUCCESS,
          data: resp.data,
        };
      },
      error => {
        if (__DEV__) {
          console.log('请求的错误代码：' + error.response.status);
        }
        //错误处理
        if (error && error.response && error.response.status) {
          handleError(error.response.status);
          return Promise.reject(error);
        }
      },
    );
  }
  /**
   * 获取TOKEN
   */
  getToken() {
    try {
      const token = AsyncStorage.getItem(TOKEN_KEY);
      if (!token) {
        //这里我们可能可以得到CODE用CODE去重新获取TOKEN
        Actions.reset('login');
        return null;
      } else {
        this.options.token = token;
        return token;
      }
    } catch (err) {
      //获取失败也跳转到登录页面
      Actions.reset('login');
      return null;
    }
  }
  /**
   * 设置TOKEN
   */
  setToken() {
    AsyncStorage.setItem(TOKEN_KEY, this.options.token);
  }
  /**
   * 清楚TOKEN
   */
  clearToken() {
    AsyncStorage.removeItem(TOKEN_KEY);
    this.options.token = null;
  }
  /**
   *
   * @param {*} url
   * @param {*} params
   */
  get(url, config = {}) {
    return this.server.get(url, config);
  }
  /**
   *
   * @param {*} url
   * @param {*} config
   */
  post(url, config = {}) {
    return this.server.post(url, config);
  }
  /**
   *
   * @param {*} url
   * @param {*} config
   */
  delete(url, config) {
    return this.server.delete(url, config);
  }
  /**
   *
   * @param {*} url
   * @param {*} config
   */
  head(url, config) {
    return this.server.head(url, config);
  }
  /**
   *
   * @param {*} url
   * @param {*} config
   */
  put(url, config) {
    return this.server.put(url, config);
  }
  /**
   *
   * @param {*} url
   * @param {*} config
   */
  patch(url, config) {
    return this.server.patch(url, config);
  }
  /**
   *
   * @param {*} url
   * @param {*} config
   */
  request(url, config) {
    return this.server.request(url, config);
  }
  /**
   * 返回Http实例
   */
  static getInstance() {
    if (Http.instance instanceof Http) {
      return Http.instance;
    } else {
      return (Http.instance = new Http());
    }
  }
}

export default Http.getInstance();
