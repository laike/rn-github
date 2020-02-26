//导入工具类库
import Color from 'color';
import {StyleSheet} from 'react-native';
/**
 * 这里是配置全局的样式常量相关
 */
export const BG_COLOR = '#ffffff';
export const TEXT_COLOR = '#ffffff';
export const MAIN_COLOR = '#ececec';
export const BLACK_COLOR = '#000000';
export const WHITE_COLOR = '#ffffff';
//设置全局的状态栏颜色
export const STATUS_BAR_STYLE = {
  animated: true,
  barStyle: 'light-content', // dark-content
  hidden: true, //是否隐藏状态栏
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
