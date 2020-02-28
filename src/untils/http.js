/**
 * 网络请求封装类库，使用axios封装，也可以选择使用fetch，注意这里可能我们要封装
 * 下设置请求头，以及根据服务器端像一个的状态码判断，提示用户提升用户体验
 */
import axios from 'axios';
import {
  parseUrl,
  handleError,
  getData,
  storeData,
  insert,
  queryOne,
  toast,
} from './untils';
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
import {
  GITHUB_THIRDPARTY_AUTHORIZATION_URL,
  CLIENT_ID,
  USERNAME_NOT_ALLOWED_NULL,
  USER_HAS_LOGIN_IN,
  USER_KEY,
} from '../constants/constants';
import {Actions} from 'react-native-router-flux';
import {DeviceEventEmitter} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {doUserLogin, setUserInfo} from './userUntils';
import {Alert} from 'react-native';

//在这里我们再封装一层使用单例模式，并且使用异步函数结合await
class Http {
  static instance = null;
  constructor() {
    this.options = {
      token: null,
      timeout: 15000, //这里设置十秒因为国内访问github api还是很慢
    };
    //初始化的时候要
    this.server = axios.create({
      baseURL: BASE_URL,
      timeout: this.options.timeout, //请求超时时间
    });
    //这里在本地存储里面查找
    AsyncStorage.getItem(TOKEN_KEY).then(token => {
      console.log('初始化成功', token);
      this.options.token = token;
      this.server.interceptors.request.use(
        config => {
          config.headers.Authorization = `token ${token}`;
          config.headers.UserAgent = 'laike';
          return config;
        },
        error => Promise.reject(error),
      );
    });
    //设置响应拦截
    this.server.interceptors.response.use(
      resp => {
        return resp;
      },
      error => {
        if (__DEV__) {
          console.log('请求的错误代码：' + error);
        }
        //错误处理
        if (error && error.response && error.response.status) {
          handleError(error.response.status);
          return Promise.reject(error);
        }
      },
    );
  }
  //这里我们要写一个，当用户登录以后马上向本地数据库中存储用户的基本信息
  //https://api.github.com/user
  saveUserInfo() {
    this.get('user')
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        //一般不会错
      });
  }
  doUserLogin(scene = 'loginpage') {
    //如果获取到了token那么就获取用户信息
    const token = this.getToken();
    console.log(`douserlogin `, token);
    if (token) {
      this.get(`https://windke.cn/auth/user`, {
        params: {
          access_token: token,
        },
      })
        .then(res => {
          //这里成功以后我们将获取到的用户信息永久存储本地
          console.log(`res.data is ${res.data}`);
          setUserInfo(res.data);
          if (scene === 'loginpage') {
            //跳转到首页
            Actions.reset('root');
          } else if (scene === 'settingpage') {
            //提示
            toast('用户信息刷新成功！');
          }
        })
        .catch(err => {
          if (scene === 'loginpage') {
            //提示用户个人信息获取失败，然后还是跳转到首页因为到达这一步已经获取到了access_token
            toast(
              '用户信息获取失败!可能网络不稳定或者您没有连接到wifi,是否尝试？',
            );
            Actions.reset('Login');
          } else if (scene === 'settingpage') {
            //提示
            toast('用户信息刷新失败，请稍后重试！');
          }
        });
    } else {
      //否则跳转到登录页面
      Actions.reset('Login');
    }
  }
  openAuthorizationPage() {
    Actions.replace('GitHubLoginPage', {
      source: {
        uri: `${GITHUB_THIRDPARTY_AUTHORIZATION_URL}?client_id=${CLIENT_ID}&scope=user,public_repo,repo,notifications,gist`,
      },
      onMessage: event => {
        let params = JSON.parse(event.nativeEvent.data);
        if (__DEV__) {
          console.log(`获取到的AccessToken：${params.accessToken}`);
        }
        if (params.accessToken) {
          this.options.token = params.accessToken;
          //设置token永久存储
          AsyncStorage.setItem(TOKEN_KEY, params.accessToken)
            .then(() => {
              console.log('登录成功', params.accessToken);
              //设置header
              this.server.interceptors.request.use(
                config => {
                  config.headers.Authorization = `token ${params.accessToken}`;
                  config.headers.UserAgent = 'laike';
                  return config;
                },
                error => Promise.reject(error),
              );
              //这里通知用户登录成功！
              toast('登录成功！正在获取用户信息...');
              this.doUserLogin();
            })
            .catch(() => {
              //这里通知用户登录成功！
              toast('登录失败');
              //然后跳转到首页
              Actions.reset('Login');
            });
        } else {
          //授权失败
          //这里通知用户登录成功！
          toast('授权获取失败！');
          //然后跳转到首页
          Actions.reset('Login');
        }
      },
    });
  }
  /**
   * 获取TOKEN
   */
  getToken() {
    //首先我们从自身上获取token
    if (this.options.token !== null) {
      return this.options.token;
    } else {
      return null;
    }
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
