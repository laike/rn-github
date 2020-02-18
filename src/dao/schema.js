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
];

export const a = {
  name: 'SearchHistory',
  properties: {
    name: 'string',
    data: 'string',
    time: 'string',
  },
};
