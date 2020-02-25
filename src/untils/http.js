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
import { BASE_URL, TOKEN_KEY, CODE_KEY } from '../config/config';
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
import { Actions } from 'react-native-router-flux';
import { DeviceEventEmitter } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { doUserLogin, setUserInfo } from './userUntils';
import { Alert } from 'react-native';

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
      withCredentials: false, //不允许跨域防止XSRF
    });

    //这里在本地存储里面查找
    AsyncStorage.getItem(TOKEN_KEY).then(token => {
      console.log('初始化成功', token);
      this.options.token = token;
      this.server.interceptors.request.use(
        config => {
          config.headers.Authorization = `token ${token}`;
          return config;
        },
        error => Promise.reject(error),
      );
    });
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
  doUserLogin() {

    //如果获取到了token那么就获取用户信息
    const token = this.getToken();
    if (token) {
      this.get('user', {
        headers: { Authorization: `token ${token}` }
      }).then((res) => {
        //这里成功以后我们将获取到的用户信息永久存储本地
        setUserInfo(JSON.stringify(res.data));
        //跳转到首页
        Actions.reset('root');

      }).catch(err => {
        //如果出错的话弹出一个框给用户，让用户选择是否继续尝试。
        Alert.alert(
          '提示信息',
          '用户信息获取失败，可能Github网络不稳定，或者您没有连接到wifi！是否尝试？',
          [
            {
              text: '取消',
              onPress: () => {
                //跳转到登录页面
                Actions.reset('Login');
              }, style: 'cancel'
            },
            {
              text: '确定',
              onPress: () => {
                this.doUserLogin();
              }
            },
          ],
          { cancelable: false }
        )
      })
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
