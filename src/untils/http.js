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
/**
 *
 * @param {*} url
 * @param {*} params
 */
export const get = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASE_URL}${parseUrl(url, params)}`)
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
      .post(`${BASE_URL}${url}`, data)
      .then(resp => {
        resolve(resp);
      })
      .catch(error => {
        reject(error);
      });
  });
};

//在这里我们再封装一层使用单例模式，并且使用异步函数结合await
class Http {
  static instance = null;
  static server = null;
  constructor() {
    this.options = {
      token: null,
      code: null,
      timeout: 10000, //这里设置十秒因为国内访问github api还是很慢
    };
    Http.server = axios.create({
      baseURL: BASE_URL,
      timeout: this.options.timeout, //请求超时时间
      withCredentials: false, //不允许跨域防止XSRF
    });
    //这里我们设置请求拦截所有的请求方式默认都是Form方式请求提高兼容性 get 和post
    //方法都是通用的 设置请求拦截
    Http.server.interceptors.request.use(
      config => {
        config.headers['Content-Type'] = CONTENT_TYPE_FORMURL;
        return config;
      },
      error => Promise.reject(error),
    );
    //设置响应拦截
    Http.server.interceptors.response.use(
      resp => {
        //请求需要权限这里可以处理跳转到登录页面
        if (resp.data.statusCode == 401) {
          handleError(resp.data.statusCode);
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
  async get(url, params = {}, header) {
    //在这里我们可能要对普通的Http请求进行一些处理和拦截
  }
  async post(url, data = {}) {
    //在这里我们可能要对普通的Http请求进行一些处理和拦截
  }
  static getInstance() {
    if (Http.instance instanceof Http) {
      return Http.instance;
    } else {
      return (Http.instance = new Http());
    }
  }
}

export default Http.getInstance();
