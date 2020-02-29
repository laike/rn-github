import {
  SEARCH_REPONSITORIES,
  GET_TRENDING,
  GET_README,
} from '../constants/types';
import {createAction} from 'redux-actions';
import {
  getTrend,
  searchRepository,
  getReadMeData,
} from '../dao/daos/responsitoriesDao';

export const searchResponsitories = createAction(
  SEARCH_REPONSITORIES,
  async (query, data = {}) => {
    //这里进行数据的获取
    let res = await searchRepository(query, data);
    return {
      ...res,
    };
  },
);

export const getTrending = createAction(
  GET_TRENDING,
  async (since, language) => {
    let res = await getTrend(since, language);
    return {
      ...res,
    };
  },
);

export const getReadme = createAction(GET_README, async (fullname, branch) => {
  let res = await getReadMeData(fullname, branch);
  return {
    ...res,
  };
});
