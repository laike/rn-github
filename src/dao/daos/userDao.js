/**
 * 首先引入相关的包
 */
import Api from '../../untils/api';
import Qs from 'qs';
//clearAllRealmTabs();

export const getSearchUser = async (username, data) => {
  //这里是我们最关键的一步使用闭包保存query和data变量
  let res = await Api.searchUser(username, data);
  if (res && res.data) {
    return {
      data: res.data,
      result: true,
    };
  } else {
    return {
      data: [],
      result: false,
    };
  }
};
