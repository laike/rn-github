/**
 * 首先引入相关的包
 */
import Api from '../../untils/api';
import Qs from 'qs';
//clearAllRealmTabs();
/**
 * 
 * @param {*} username 
 * @param {*} data 
 */
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

/**
 *获取趋势
 * @param {string} since
 * @param {string} language
 */
export const getUserEvent = async (query, data) => {
  //这里是我们最关键的一步使用闭包保存query和data变量
  let save = createAsyncSaveFunc(
    [query, data],
    'UserDynamic',
    ['name', 'data', 'time'],
    `${query}/${Qs.stringify(data)}`,
    `name = "${query}/${Qs.stringify(data)}"`,
    Api.getUserDynamic,
  );
  let localDatas = getDataFromLocal(
    'UserDynamic',
    `name = "${query}/${Qs.stringify(data)}"`,
  );
  //如果查询到了数据那么就直接返回
  if (localDatas) {
    return {
      data: localDatas,
      result: true,
      save,
    };
  } else {
    return {
      data: [],
      result: false, //表示并没有获取到数据
      save,
    };
  }
};