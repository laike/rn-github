import {GET_LANGUAGES} from '../constants/types';
import {createAction} from 'redux-actions';
import {getLanguage} from '../dao/daos/languageDao';

export const getLanguages = createAction(
  GET_LANGUAGES,
  async (query = 'languages', data = []) => {
    //这里进行数据的获取
    let res = await getLanguage(query, data);
    return {
      ...res,
    };
  },
);
