/**
 * GitHub API 工具封装
 */
import {get, post} from './http';
//引入开源github trending api
import {
  languages,
  spokenLanguages,
  fetchDevelopers,
  fetchRepositories,
  fetchRandomRepositories,
} from '@huchenme/github-trending';
//引入Type
import {
  FETCH_DEVOLOPERS,
  FETCH_LANGUAGES,
  FETCH_REPOSITORIES,
  FETCH_RANDOM_REPOSITORIES,
  FETCH_SPOKEN_LANGUAGES,
} from '../constants/types';
export default {
  /**
   * 获取用户基本信息只需要传入
   * @param {string} username  用户昵称 eg:laike
   * @param {object } params 查询参数 eg:type,page,per_page,sort
   */
  searchUserInfo(username, params) {
    return get(`users?q=${username}`, params);
  },
  /**
   *获取用户仓库
   * @param {string} username 用户昵称 laike
   * @param {object} params 查询参数 eg:type,page,per_page,sort
   */
  getUserRestoriesInfo(username, params) {
    return get(`users/${username}/repos`, params);
  },
  /**
   * 搜索用户
   * @param {string} username  eg:lai laike ls
   * @param {object} params 查询阐述 eg:page,per_page,sort,order
   */
  searchUser(username, params) {
    return get(`users/${username}`, params);
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
    return get(`search/repositories?q=${query}`, params);
  },
  /**
   * 获取仓库详情
   * @param {string}} owner 仓库拥有者
   * @param {string} repo 仓库名字
   */
  getRestoriesDetail(owner, repo) {
    return get(`repos/${owner}/${repo}`);
  },
  /**
   * 获取仓库活动  这个是新增api
   * https://api.github.com/networks/laike/rn-github/events
   * @param {string} owner 仓库拥有者 比如 laike
   * @param {string} repo 仓库名 rn-github
   */
  getRestoriesEvent(owner, repo) {
    return get(`networks/${owner}/${repo}/events`);
  },
  /**
   * 获取仓库Forks
   * @param {string} owner 仓库拥有者
   * @param {string} repo 仓库名
   */
  getRestoriesForks(owner, repo) {
    return get(`repos/${owner}/${repo}/forks`);
  },
  /**
   * 获取仓库Stars
   * @param {string} owner 仓库拥有者
   * @param {string} repo 仓库名
   */
  getRestoriesStars(owner, repo) {
    return get(`repos/${owner}/${repo}/stargazers`);
  },
  /**
   * 获取仓库订阅者
   * @param {string} owner 仓库拥有者
   * @param {string} repo 仓库名
   */
  getRestoriesWatches(owner, repo) {
    return get(`repos/${owner}/${repo}/subsribers`);
  },
  /**
   * 获取仓库提交数
   * @param {string} owner 仓库拥有者
   * @param {string} repo 仓库名
   */
  getRestoriesCommits(owner, repo) {
    return get(`repos/${owner}/${repo}/commits`);
  },
  /**
   * 获取仓库指定提交详情
   * @param {string} owner 仓库拥有者
   * @param {string} repo 仓库名
   * @param {string} sha 指定的sha编码串
   */
  getRestoriesCommitDetail(owner, repo, sha) {
    return get(`repos/${owner}/${repo}/commits/${sha}`);
  },
  /**
   * 获取仓库提交数
   * @param {string} owner 仓库拥有者
   * @param {string} repo 仓库名
   */
  getRestoriesReleases(owner, repo) {
    return get(`repos/${owner}/${repo}/releases`);
  },
  /**
   * 获取仓库提交数
   * @param {string} owner 仓库拥有者
   * @param {string} repo 仓库名
   */
  getRestoriesTags(owner, repo) {
    return get(`repos/${owner}/${repo}/tags`);
  },
  /**
   * 获取仓库提交数
   * @param {string} owner 仓库拥有者
   * @param {string} repo 仓库名
   */
  getRestoriesContributers(owner, repo) {
    return get(`repos/${owner}/${repo}/contributors`);
  },
  //下面部分的api请求主要是关于issues方面的
  /**
   * 搜索Issues
   * @param {string} query 查询参数
   * @param {object} data 额外参数 eg:page per_page sort=dec order=asc
   */
  searchRepositoriesIssues(query, data = {}) {
    return get(`search/issues?q=${query}`, data);
  },
  /**
   * 获取仓库issues
   * @param {string} owner 仓库拥有者
   * @param {string} repo 仓库名
   * @param {object} data 额外查询参数
   */
  getRepositoriesIssues(owner, repo, data = {}) {
    return get(`repos/${owner}/${repo}/issues`, data);
  },
  /**
   * 获取流行趋势 使用的是开源api 返回Promise
   * @param {string} type  获取trending类型
   * @param {string} since  从哪里开始 daily monthly
   * @param {string} language  语言 JavaScript Java android swift
   */
  getTrendingApi(
    type = FETCH_REPOSITORIES,
    since = 'monthly',
    language = 'javascript',
  ) {
    let promise = null;
    switch (type) {
      case FETCH_SPOKEN_LANGUAGES:
        promise = spokenLanguages();
        break;
      case FETCH_DEVOLOPERS:
        promise = fetchDevelopers({language});
        break;
      case FETCH_LANGUAGES:
        promise = languages();
        break;
      case FETCH_RANDOM_REPOSITORIES:
        promise = fetchRandomRepositories({language, since});
        break;
      case FETCH_REPOSITORIES:
        promise = fetchRepositories(language, since);
        break;
      default:
        promise = fetchRepositories(language, since);
        break;
    }
    return promise;
  },
};
