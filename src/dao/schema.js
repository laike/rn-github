/**
 * 这里是realm 库的schema 表结构
 */
export default [
  //仓库表
  {
    name: 'Reponsitories',
    properties: {
      name: 'string',
      data: 'string',
      time: 'string',
    },
  },
  //趋势表
  {
    name: 'TrendingReponsitories',
    properties: {
      name: 'string',
      data: 'string',
      time: 'string',
    },
  },
  //语言表
  {
    name: 'Languages',
    properties: {
      name: 'string',
      data: 'string',
      time: 'string',
    },
  },
  //搜索历史的表
  {
    name: 'SearchHistory',
    properties: {
      name: 'string',
      data: 'string',
      time: 'string',
    },
  },
  //ReadMe表
  {
    name: 'ReadMes',
    properties: {
      name: 'string',
      data: 'string',
      time: 'string',
    },
  },
  //用户token表
  {
    name: 'UserToken',
    properties: {
      key: 'string',
      token: 'string',
      data: 'string',
      time: 'string',
    },
  },
  //用户动态表
  {
    name: 'UserDynamic',
    properties: {
      name: 'string',
      data: 'string',
      time: 'string',
    },
  },
];
