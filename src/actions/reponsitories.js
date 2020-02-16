import {SEARCH_REPONSITORIES, GET_TRENDING} from '../constants/types';
import {createActions} from 'redux-actions';
import {getTrending, searchResponsitories} from '../dao/daos/responsitoriesDao';
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
  [GET_TRENDING]: async (since, language) => {
    let res = await getTrending(since, language);
    if (res && res.result && res.data.length > 0) {
      dispatch({
        type: SEARCH_REPONSITORIES,
        res: res.data,
      });
    }
  },
});
