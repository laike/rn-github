/**
 * 首先引入相关的包
 */
import Realm from '../../dao/db';
import Api from '../../untils/api';
import {FETCH_LANGUAGES} from '../../constants/types';
import {CONST_BASIC_LANGUAGES} from '../../constants/constants';
/**
 * 搜索获取仓库信息（逻辑已经完善，接下来开发搜索页面）
 * @param {string} query  查询参数
 * @param {string} data 额外查询参数
 */
export const getLanguages = async (query, data) => {
  //这里获取数据
  const Query = `${query}`;
  //这里是我们最关键的一步使用闭包保存query和data变量
  let save = async () => {
    Realm.write(() => {
      let localDatas = Realm.objects('Languages').filtered(`name="${Query}"`);
      Realm.delete(localDatas);
      Realm.create('Languages', {
        name: Query,
        data: JSON.stringify(data),
        time: Date.now().toString(),
      });
    });
    return {
      data: data,
      success: true,
    };
  };

  //先从Realm数据库中进行查询
  let localDatas = null;
  localDatas = Realm.objects('Languages').filtered(`name="${Query}"`);
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

/**
 * 获取语言列表暂时没有用因为获取到了太多页面，并且很多请求都是空的。
 */
export const getLanguageList = () => {
  let langs = Api.getTrendingApi(FETCH_LANGUAGES);
  if (langs) {
    return langs;
  } else {
    return CONST_BASIC_LANGUAGES;
  }
};
