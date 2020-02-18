import {SEARCH_USER} from '../constants/types';
import {createActions} from 'redux-actions';
import {getSearchUser} from '../dao/daos/userDao';
export default createActions({
  [SEARCH_USER]: async (username, data) => {
    let res = await getSearchUser(username, data);
    console.log(res);
    return {
      ...res,
    };
  },
});
