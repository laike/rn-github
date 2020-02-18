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
import Qs from 'qs';
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
export const clearAllCache = () => {
  Realm.write(() => {
    Realm.deleteAll();
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
//新增Realm数据表迁移相关工具
export const RealmMigrations = () => {
  //迁移表数据或者修改schema模型 现在的方法是修改db下面的schemaVersion
  //后期可能会有迁移字段这种需求或者数据库schema大型更新
};

/**
 * 检查数据是否过期，过期就要从新获取。
 * @param {number}} time
 */
export const checkIsDateDespred = time => {
  let now = Date.now();
  let diff = now - time;
  //要转换成小时
  let hours = Math.floor(diff / 1000 / 3600);
  if (hours > 4) {
    //四小时之内不需要更新用户缓存
    return true; //已经过期
  }
  return false;
};
/**
 * 创建一个save函数 根据参数和字段以及api调用
 * @param {object} params 参数
 * @param {string} table 表名
 * @param {array} fieldset 表字段
 * @param {promise} API api
 */
export const createAsyncSaveFunc = (
  params = [],
  table = '',
  fieldset = ['name', 'data', 'time'],
  query,
  filter = '',
  API,
) => {
  return async () => {
    console.log(`createAsyncSaveFunc\n ${table}\n ${query}\n ${filter}`);
    //这里获取数据
    let res = await API(...params);
    if (res && res.data) {
      Realm.write(() => {
        let instert = {};
        fieldset.forEach(item => {
          if (item === 'name') {
            instert[item] = query;
          } else if (item === 'data') {
            instert[item] = JSON.stringify(res.data);
          } else if (item === 'time') {
            instert[item] = Date.now().toString();
          }
        });
        let localDatas = Realm.objects(table).filtered(`${filter}`);
        if (localDatas && localDatas.length > 0) {
          Realm.delete(localDatas);
        }
        Realm.create(table, instert);
      });
      return {
        data: res.data,
        result: true,
      };
    }
  };
};
/**
 *
 * @param {string} table 表名字
 * @param {string} filter 过滤字段
 */

export const getDataFromLocal = (table = '', filter = '') => {
  //先从Realm数据库中进行查询
  let localDatas = null;
  // console.log(`getDataFromLocal\n ${table}\n ${filter}`);
  try {
    localDatas = Realm.objects(table).filtered(filter);
    if (localDatas && localDatas.length > 0) {
      //这里要判断过期没？
      if (checkIsDateDespred(Number(JSON.parse(localDatas[0].time)))) {
        return false;
      } else {
        return JSON.parse(localDatas[0].data);
      }
    } else {
      console.log('数据库里面没有查询到');
      return false; //没有获取到本地数据
    }
  } catch (error) {
    if (__DEV__) {
      console.log(error);
    }
    return false;
  }
};
/**
 * 查询realm数据库
 * @param {string} table 表
 * @param {string} filter 过滤
 * @param {string} filed 列
 */
export const queryOne = (table = '', filter = '', filed = 'data') => {
  let localDatas = null;
  try {
    localDatas = Realm.objects(table).filtered(filter);
    if (localDatas && localDatas.length > 0) {
      return filed === 'data'
        ? JSON.parse(localDatas[0][filed])
        : localDatas[0][filed];
    } else {
      return false; //没有获取到本地数据
    }
  } catch (error) {
    if (__DEV__) {
      console.log(error);
    }
    return false;
  }
};
/**
 * 查询realm数据库
 * @param {string} table 表
 * @param {string} filter 过滤
 * @param {number} limit 限制条数
 */
export const queryAll = (table = '', filter = '', limit = 5) => {
  let localDatas = null;
  try {
    localDatas = Realm.objects(table).filtered(filter);
    if (localDatas && localDatas.length > 0) {
      return localDatas.slice(
        0,
        limit > localDatas.length ? localDatas.length : limit,
      );
    } else {
      return false; //没有获取到本地数据
    }
  } catch (error) {
    if (__DEV__) {
      console.log(error);
    }
    return false;
  }
};
/**
 * 浅复制一个arr
 * @param {array} arr
 */
export const clone = (arr = []) => {
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    newArr[i] = arr[i];
  }
  return newArr;
};
/**
 * 初始化
 */
export const Init = () => {
  //当用户退出的时候可以执行这个工具函数
  clearAllRealmTabs(); //清除表
  clearAllCache(); //清除缓存
};
