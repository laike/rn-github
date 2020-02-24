//导入工具类库
import Color from 'color';
import { StyleSheet } from 'react-native'
/**
 * 这里是配置全局的样式常量相关
 */
export const BG_COLOR = '#6495ed';
export const TEXT_COLOR = '#fff';
export const MAIN_COLOR = '#ececec';
export const BLACK_COLOR = '#000000';

//设置全局的状态栏颜色
export const STATUS_BAR_STYLE = {
  animated: true,
  backgroundColor: Color(BG_COLOR)
    .darken(0.6)
    .hex(),
  barStyle: 'light-content', // dark-content
  hidden: false, //是否隐藏状态栏
};
export const SHADOW_COLOR = '#ddd';

/**
 *详情页面自定义样式
 */
export const customMarkdownStyle = StyleSheet.create({
  view: {},
  codeBlock: {
    fontFamily: "Courier",
    fontWeight: "500"
  },
  del: {
    backgroundColor: "#000000"
  },
  em: {
    fontStyle: "italic"
  },

  text: { fontSize: 16 },
  strikethrough: {
    textDecorationLine: "line-through",
    color: "#FF0000"
  },
  a: {
    textDecorationLine: "underline",
    color: "#FF0000"
  },
  u: {
    borderColor: "#000000",
    borderBottomWidth: 1
  }
});

