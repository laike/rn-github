import {
  SEARCH_REPONSITORIES,
  GET_TRENDING,
  GET_README,
} from '../constants/types';
import {createActions} from 'redux-actions';
import {
  getTrending,
  searchResponsitories,
  getReadMeData,
} from '../dao/daos/responsitoriesDao';
import store from '../stores';
const {dispatch} = store;
export default createActions({
  /**
   * 这里的data 可以传入最重要的参数 page 以及 per_page 参数
   */
  [SEARCH_REPONSITORIES]: async (query, data = {}) => {
    //这里进行数据的获取
    let res = await searchResponsitories(query, data);
    return {
      ...res,
    };
  },
  /**
   * 获取趋势数据
   */
  [GET_TRENDING]: async (since, language) => {
    let res = await getTrending(since, language);
    return {
      ...res,
    };
  },
  /**
   * 获取readme数据
   */
  [GET_README]: async (fullname, branch) => {
    let res = await getReadMeData(fullname, branch);
    return {
      ...res,
    };
  },
});
