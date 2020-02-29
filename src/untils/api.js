/**
 * GitHub API 工具封装
 */
import HttpManager from './http';
import Qs from 'qs';
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
    return new Promise((resolve, reject) => {
      HttpManager.get(`users?q=${username}`, {params})
        .then(res => {
          resolve({
            data: res.data.items,
          });
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  /**
   *获取用户仓库
   * @param {string} username 用户昵称 laike
   * @param {object} params 查询参数 eg:type,page,per_page,sort
   */
  getUserRestoriesInfo(username, params) {
    return HttpManager.get(`users/${username}/repos`, {params});
  },
  /**
   * 搜索用户
   * @param {string} username  eg:lai laike ls
   * @param {object} params 查询阐述 eg:page,per_page,sort,order
   */
  searchUser(username, params) {
    return new Promise((resolve, reject) => {
      HttpManager.get(`search/users?q=${username}`, {params})
        .then(res => {
          resolve({
            data: res.data.items,
          });
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  },
  /**
   * 根据昵称获取某个用户的跟随者
   * @param {sting} username 昵称
   */
  getUserFollowers(username) {
    return HttpManager.get(`users/${username}/followers`);
  },
  /**
   * 根据昵称获取某个用户正在跟随哪些人
   * @param {string} username
   */
  getUserFollowing(username) {
    return HttpManager.get(`users/${username}/followig`);
  },
  /**
   *认证待开发
   * @param {*} data
   */
  authorizating(data) {
    return HttpManager.post('authorizations', data);
  },
  /**
   * 根据query搜索仓库
   * @param {string} query
   * @param {object} params
   */
  searchRepositories(query, params) {
    return new Promise((resolve, reject) => {
      HttpManager.get(`search/repositories?q=${query}`, {params})
        .then(res => {
          resolve({
            data: res.data.items,
          });
        })
        .catch(err => {
          reject(err);
        });
    });
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
        promise = new Promise((resolve, reject) => {
          resolve(spokenLanguages);
        });
        break;
      case FETCH_DEVOLOPERS:
        promise = new Promise((resolve, reject) => {
          fetchDevelopers({language})
            .then(res => {
              resolve({
                data: res,
              });
            })
            .catch(error => reject(error));
        });
        break;
      case FETCH_LANGUAGES:
        promise = new Promise((resolve, reject) => {
          resolve(languages);
        });
        break;
      case FETCH_RANDOM_REPOSITORIES:
        promise = new Promise((resolve, reject) => {
          fetchRandomRepositories({language, since})
            .then(res => {
              resolve({
                data: res,
              });
            })
            .catch(error => reject(error));
        });
        break;
      case FETCH_REPOSITORIES:
        promise = new Promise((resolve, reject) => {
          fetchRepositories({language, since})
            .then(res => {
              resolve({
                data: res,
              });
            })
            .catch(error => reject(error));
        });

        break;
      default:
        promise = new Promise((resolve, reject) => {
          fetchRepositories({language, since})
            .then(res => {
              resolve({
                data: res,
              });
            })
            .catch(error => reject(error));
        });

        break;
    }

    return promise;
  },
  /**
   * 获取仓库reademe资料
   * @param {string} responsitoryName 仓库全名
   * @param {string} branch 仓库分支
   */
  getRepositoryReadme(fullname = 'laike/rn-github', branch = 'master') {
    return new Promise((resolve, reject) => {
      console.log(`repos/${fullname}/readme`);
      HttpManager.get(`repos/${fullname}/readme`, {
        headers: {Accept: 'application/vnd.github.3.html'},
        params: {branch},
      })
        .then(res => {
          resolve({
            data: res.data,
          });
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  /**
   *
   * @param {*} query
   * @param {*} data
   */
  getUserDynamic(query, data) {
    return new Promise((resolve, reject) => {
      console.log(`${query}?${Qs.stringify(data)}`);
      HttpManager.get(`${query}?${Qs.stringify(data)}`)
        .then(res => {
          resolve({
            data: res.data,
          });
        })
        .catch(err => {
          reject(err);
        });
    });
  },
};
