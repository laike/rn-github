/**
 * GitHub API 工具封装
 */
import {get, post} from './http';
import {parseUrl} from './untils';
export const API = {
  /**
   * 获取用户基本信息只需要传入
   * @param {string} username  用户昵称 eg:laike
   */
  getUserInfo(username) {
    return get(`users/${username}`);
  },
  /**
   *获取用户仓库
   * @param {string} username 用户昵称 laike
   * @param {object} params 查询参数 eg:type,page,per_page,sort
   */
  getUserRestoriesInfo(username, params) {
    return get(parseUrl(`users/${username}`, params));
  },
  /**
   * 搜索用户
   * @param {string} username  eg:lai laike ls
   * @param {object} params 查询阐述 eg:page,per_page,sort,order
   */
  searchUser(username, params) {
    return get(parseUrl(`users/${username}`, params));
  },
  /**
   * 根据昵称获取某个用户的跟随者
   * @param {sting} username 昵称
   */
  getUserFollowers(username) {
    return get(`users/${username}/followers`);
  },
  /**
   * 根据昵称获取某个用户正在跟随哪些人
   * @param {string} username
   */
  getUserFollowing(username) {
    return get(`users/${username}/followig`);
  },
  /**
   *认证待开发
   * @param {*} data
   */
  authorizating(data) {
    return post('authorizations', data);
  },
  /**
   * 根据query搜索仓库
   * @param {string} query
   * @param {object} params
   */
  searchRepositories(query, params) {
    return get(parseUrl(`search/repositories?=${query}`, params));
  },
};
