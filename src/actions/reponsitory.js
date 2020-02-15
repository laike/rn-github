import {SEARCH_REPONSITORIES, GET_TRENDING} from '../constants/types';
import {createActions} from 'redux-actions';
import {getTrending, searchResponsitories} from '../dao/daos/responsitoriesDao';

export default createActions({
  /**
   * 这里的data 可以传入最重要的参数 page 以及 per_page 参数
   */
  [SEARCH_REPONSITORIES]: (query, data) => {
    //这里进行数据的获取
    searchResponsitories(query, data);
  },
  [GET_TRENDING]: (since, language) => {
    getTrending(since, language);
  },
});
