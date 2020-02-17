import {GET_LANGUAGES} from '../constants/types';
import {createActions} from 'redux-actions';
import {getLanguages} from '../dao/daos/languageDao';
export default createActions({
  /**
   * 这里的data 可以传入最重要的参数 page 以及 per_page 参数
   */
  [GET_LANGUAGES]: async (query = 'languages', data = []) => {
    //这里进行数据的获取
    let res = await getLanguages(query, data);
    return {
      ...res,
    };
  },
});
