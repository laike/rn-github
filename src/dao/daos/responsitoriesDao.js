/**
 * 首先引入相关的包
 */
import Api from '../../untils/api';
import Http from '../../untils/http';
import Realm from '../../dao/db';
import Qs from 'qs';
import {FETCH_REPOSITORIES} from '../../constants/types';
import {clearRealmTable, clearAllRealmTabs} from '../../untils/untils';
//clearAllRealmTabs();
/**
 * 搜索获取仓库信息（逻辑已经完善，接下来开发搜索页面）
 * @param {string} query  查询参数
 * @param {string} data 额外查询参数
 */
export const searchResponsitories = async (query, data) => {
  //这里获取数据
  const Query = `${query}/${Qs.stringify(data)}`;
  //这里是我们最关键的一步使用闭包保存query和data变量
  let save = async () => {
    let res = await Api.searchRepositories(query, data);
    if (res && res.data) {
      Realm.write(() => {
        let localDatas = Realm.objects('Reponsitories').filtered(
          `name="${Query}"`,
        );
        Realm.delete(localDatas);
        Realm.create('Reponsitories', {
          name: Query,
          data: JSON.stringify(res.data.items),
        });
      });
    }
    return {
      data: res.data.items,
      success: true,
    };
  };

  //先从Realm数据库中进行查询
  let localDatas = null;
  localDatas = Realm.objects('Reponsitories').filtered(`name="${Query}"`);
  //如果查询到了数据那么就直接返回
  if (localDatas && localDatas.length > 0) {
    return {
      data: JSON.parse(localDatas[0].data),
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

export const getTrending = async (since, language) => {
  //这里获取数据
  const Query = `${since}/${language}`;
  //这里是我们最关键的一步使用闭包保存query和data变量
  let save = async () => {
    let res = await Api.getTrendingApi(FETCH_REPOSITORIES, since, language);
    console.log(Query);

    if (res && res.data) {
      Realm.write(() => {
        let localDatas = Realm.objects('TrendingReponsitories').filtered(
          `name="${Query}"`,
        );
        Realm.delete(localDatas);
        Realm.create('TrendingReponsitories', {
          name: Query,
          data: JSON.stringify(res.data),
        });
      });
    }
    return {
      data: res.data,
      success: true,
    };
  };

  //先从Realm数据库中进行查询
  let localDatas = null;
  localDatas = Realm.objects('TrendingReponsitories').filtered(
    `name="${Query}"`,
  );
  //如果查询到了数据那么就直接返回
  if (localDatas && localDatas.length > 0) {
    return {
      data: JSON.parse(localDatas[0].data),
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
