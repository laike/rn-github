import {SEARCH_USER, GET_USER_DYNAMIC} from '../constants/types';
import {createAction} from 'redux-actions';
import {getSearchUser, getUserEvent} from '../dao/daos/userDao';

export const searchUser = createAction(SEARCH_USER, async (username, data) => {
  let res = await getSearchUser(username, data);
  return {
    ...res,
  };
});

export const getUserDynamic = createAction(
  GET_USER_DYNAMIC,
  async (query, data = {}) => {
    //这里进行数据的获取
    let res = await getUserEvent(query, data);
    return {
      ...res,
    };
  },
);
