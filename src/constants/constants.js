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
