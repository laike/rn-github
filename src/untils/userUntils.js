/**
 * 获取用户基本信息的方法
 */
//导入http类 这是一个单例类


import { USER_KEY } from '../constants/constants';
import { getData, storeData } from './untils';


/**
 * 
 */
export const getUserInfo = async () => {
    const userinfo = await getData(USER_KEY);
    return userinfo;
}

export const setUserInfo = async (user) => {
    const result = await storeData(USER_KEY, user);
    return result;
}
