//导入工具类库
import Color from 'color';
import {StyleSheet} from 'react-native';
/**
 * 这里是配置全局的样式常量相关
 */
export const BG_COLOR = '#ffffff';
export const TEXT_COLOR = '#ffffff';
export const BLACK_COLOR = '#000000';
export const WHITE_COLOR = '#ffffff';
//设置全局的状态栏颜色
export const STATUS_BAR_STYLE = {
  animated: true,
  barStyle: 'light-content', // dark-content
  // hidden: true, //是否隐藏状态栏
  backgroundColor: BG_COLOR,
};
export const SHADOW_COLOR = '#ddd';
/**
 *详情页面自定义样式
 */
export const customMarkdownStyle = StyleSheet.create({
  view: {},
  codeBlock: {
    fontFamily: 'Courier',
    fontWeight: '500',
  },
  del: {
    backgroundColor: '#000000',
  },
  em: {
    fontStyle: 'italic',
  },

  text: {fontSize: 16},
  strikethrough: {
    textDecorationLine: 'line-through',
    color: '#FF0000',
  },
  a: {
    textDecorationLine: 'underline',
    color: '#FF0000',
  },
  u: {
    borderColor: '#000000',
    borderBottomWidth: 1,
  },
});

//代码查看器主题
export const CODE_VIEW_STYLES = [
  'agate',
  'androidstudio',
  'arduinoLight',
  'arta',
  'ascetic',
  'atelierCaveDark',
  'atelierCaveLight',
  'atelierDuneDark',
  ' atelierDuneLight',
  'atelierEstuaryDark',
  'atelierEstuaryLight',
  'atelierForestDark',
  'atelierForestLight',
  'atelierHeathDark',
  'atelierHeathLight',
  'atelierLakesideDark',
  'atelierLakesideLight',
  'atelierPlateauDark',
  'atelierPlateauLight',
  'atelierSavannaDark',
  'atelierSavannaLight',
  'atelierSeasideDark',
  'atelierSeasideLight',
  'atelierSulphurpoolDark',
  'atelierSulphurpoolLight',
  'atomOneDark',
  'atomOneLight',
  'brownPaper',
  'codepenEmbed',
  'colorBrewer',
  'darcula',
  'dark',
  'darkula',
  'defaultStyle',
  'docco',
  'dracula',
  'far',
  'foundation',
  'githubGist',
  'github',
  'googlecode',
  'grayscale',
  'gruvboxDark',
  'gruvboxLight',
  'hopscotch',
  'hybrid',
  'idea',
  'irBlack',
  'kimbieDark',
  'kimbieLight',
  'magula',
  'monoBlue',
  'monokaiSublime',
  'monokai',
  'obsidian',
  'ocean',
  'paraisoDark',
  'paraisoLight',
  'pojoaque',
  'purebasic',
  'qtcreatorDark',
  'qtcreatorLight',
  'railscasts',
  'rainbow',
  'routeros',
  'schoolBook',
  'solarizedDark',
  'solarizedLight',
  'sunburst',
  'tomorrowNightBlue',
  'tomorrowNightBright',
  'tomorrowNightEighties',
  'tomorrowNight',
  'tomorrow',
  'vs',
  'vs2015',
  'xcode',
  'xt256',
  'zenburn',
];

export const CODE_THEME_KEY = 'rngithub_code_theme_key';

export const CODE_DEFAULT_THEME = 'monokai';
