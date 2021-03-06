//定义全局的常量
import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;
export const TRENDING_PAGE_MENUS_DATA = [
  ['今日', '本周', '本月'],
  [
    '全部',
    'Javascript',
    'Python',
    'HTML',
    'CSS',
    'C++',
    'JS',
    'PHP',
    'C',
    'Swift',
  ],
];

export const CONST_BASIC_LANGUAGES = [
  '',
  'Javascript',
  'Python',
  'HTML',
  'CSS',
  'C++',
  'JS',
  'PHP',
  'C',
  'Swift',
];

export const TRENDING_PAGE_MENUS_DATA_QUERY = [
  ['daily', 'weekly', 'monthly'],
  CONST_BASIC_LANGUAGES,
];

export const SEARCH_TABS = [
  {type: 'search/reponsitories', name: '仓库'},
  {type: 'search/users', name: '用户'},
];

//用户登录相关提示

export const USERNAME_NOT_ALLOWED_NULL = '用户名不能为空！';
export const PASSWORD_NOT_ALLOWED_NULL = '密码不能为空！';
export const GITHUB_THIRDPARTY_AUTHORIZATION_URL =
  'https://github.com/login/oauth/authorize';
export const CLIENT_ID = '6d3b92a0131a6b5a7b92';
export const USER_HAS_LOGIN_IN = 'USER_HAS_LOGIN_IN';
export const GH_CHART_API = 'https://ghchart.rshah.org/';
export const USER_KEY = 'rn_github_user_key';
export const GITHUB_CHARTS_URL = `https://github.com/users/laike/contributions?to=2020-02-26`;

//系统变量相关
export const SYSTEM_VERSION = '1.0.1'; //用于更新缓存

//搜索相关
export const SEACH_FILTERS = 'SEACH_FILTERS';

//主题相关
export const THEME_KEY = 'rn_github_theme_key';
export const RESTART_TO_CHANGE_THEM = 'RESTART_TO_CHANGE_THEM';
