import { SEARCH_USER, GET_USER_DYNAMIC } from '../constants/types';
import { createActions } from 'redux-actions';
import { getSearchUser } from '../dao/daos/userDao';
export default createActions({
  [SEARCH_USER]: async (username, data) => {
    let res = await getSearchUser(username, data);
    return {
      ...res,
    };
  },
  [GET_USER_DYNAMIC]: async (query, data = {}) => {
    //这里进行数据的获取
    let res = await getUserEvent(query, data);
    return {
      ...res,
    };
  },
});
