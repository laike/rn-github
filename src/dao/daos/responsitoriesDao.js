/**
 * 首先引入相关的包
 */
import Api from '../../untils/api';
import Qs from 'qs';
import { FETCH_REPOSITORIES } from '../../constants/types';
import {
  clearRealmTable,
  clearAllRealmTabs,
  createAsyncSaveFunc,
  getDataFromLocal,
  clearAllCache,
} from '../../untils/untils';
//clearAllRealmTabs();
//clearAllCache();
/**
 * 搜索获取仓库信息（逻辑已经完善，接下来开发搜索页面）
 * @param {string} query  查询参数
 * @param {string} data 额外查询参数
 */
export const searchResponsitories = async (query, data) => {
  //这里是我们最关键的一步使用闭包保存query和data变量
  let save = createAsyncSaveFunc(
    [query, data],
    'Reponsitories',
    ['name', 'data', 'time'],
    `${query}/${Qs.stringify(data)}`,
    `name = "${query}/${Qs.stringify(data)}"`,
    Api.searchRepositories,
  );
  let localDatas = getDataFromLocal(
    'Reponsitories',
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
/**
 *获取趋势
 * @param {string} since
 * @param {string} language
 */
export const getTrending = async (since, language) => {
  let save = createAsyncSaveFunc(
    [FETCH_REPOSITORIES, since, language],
    'TrendingReponsitories',
    ['name', 'data', 'time'],
    `${since}/${language}`,
    `name = "${since}/${language}"`,
    Api.getTrendingApi,
  );
  let localDatas = getDataFromLocal(
    'TrendingReponsitories',
    `name = "${since}/${language}"`,
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
/**
 *获取readme数据
 * @param {*} fullname
 * @param {*} branch
 */
export const getReadMeData = async (fullname, branch = '') => {
  let save = createAsyncSaveFunc(
    [fullname, branch],
    'ReadMes',
    ['name', 'data', 'time'],
    `${fullname}/${branch}`,
    `name = "${fullname}/${branch}"`,
    Api.getRepositoryReadme,
  );
  let localDatas = getDataFromLocal(
    'ReadMes',
    `name = "${fullname}/${branch}"`,
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
