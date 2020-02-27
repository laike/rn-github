/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  StyleSheet,
  StatusBar,
  View,
  Text,
  Button,
  TouchableOpacity,
} from 'react-native';
import {STATUS_BAR_STYLE, TEXT_COLOR} from '../constants/styles';
import store from '../stores';

import ScrollViewContainer from '../components/ScrollViewContainer';
import Color from 'color';
import {bindActionCreators} from 'redux';
import responsitoryActions from '../actions/reponsitories';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';
const {Popover} = renderers;
// import {getLanguageList} from '../untils/untils';
//导入trending常量
import {
  TRENDING_PAGE_MENUS_DATA,
  TRENDING_PAGE_MENUS_DATA_QUERY,
} from '../constants/constants';

@connect(
  state => ({
    trendingState: state.trending_list,
  }),
  dispatch => ({
    responsitories: bindActionCreators(responsitoryActions, dispatch),
  }),
)
class Home extends Component {
  constructor(props) {
    super(props);
    //这里要设置一个状态
    this.state = {
      since: TRENDING_PAGE_MENUS_DATA_QUERY[0][0], //有三种 weekly monthly daily
      language: TRENDING_PAGE_MENUS_DATA_QUERY[1][0], //否则就需要传递参数了
      selectIndex: [0, 0],
      langs: TRENDING_PAGE_MENUS_DATA,
      iconname: 'chevron-down',
      s: TRENDING_PAGE_MENUS_DATA[0][0],
      l: TRENDING_PAGE_MENUS_DATA[1][0],
    };
  }
  componentDidMount() {}
  onSelect(opt) {
    this.setState({
      selectIndex: [0, opt],
      since: TRENDING_PAGE_MENUS_DATA_QUERY[0][opt],
    });
  }
  onSelect2(opt) {
    this.setState({
      selectIndex: [1, opt],
      language: TRENDING_PAGE_MENUS_DATA_QUERY[1][opt],
    });
  }
  render() {
    const {Touchable} = this.state;
    return (
      <View style={styles.container}>
        <StatusBar {...STATUS_BAR_STYLE} />
        {/*这里暂时不封装scrollview，后面真个项目功能基本完善以后再来做代码重构。 */}

        <View style={styles.top}>
          <Menu
            style={styles.menu}
            renderer={Popover}
            rendererProps={{
              preferredPlacement: 'bottom',
            }}
            onSelect={this.onSelect.bind(this)}>
            <MenuTrigger style={styles.item} text={this.state.s} />
            <Icon name={this.state.iconname} style={styles.icon} />
            <MenuOptions
              customStyles={{
                OptionTouchableComponent: TouchableOpacity,
                optionTouchable: touchableOpacityProps,
              }}>
              {TRENDING_PAGE_MENUS_DATA[0].map((item, key) => (
                <MenuOption
                  key={key}
                  text={item}
                  style={styles.option}
                  value={key}
                />
              ))}
            </MenuOptions>
          </Menu>
          <Menu
            style={styles.menu}
            renderer={Popover}
            rendererProps={{
              preferredPlacement: 'bottom',
            }}
            onSelect={this.onSelect2.bind(this)}>
            <MenuTrigger style={styles.item} text={this.state.l} />
            <Icon name={this.state.iconname} style={styles.icon} />
            <MenuOptions
              customStyles={{
                OptionTouchableComponent: TouchableOpacity,
                optionTouchable: touchableOpacityProps,
              }}>
              {TRENDING_PAGE_MENUS_DATA[1].map((item, key) => (
                <MenuOption
                  key={key}
                  text={item}
                  style={styles.option}
                  value={key}
                />
              ))}
            </MenuOptions>
          </Menu>
        </View>
        <ScrollViewContainer
          key="trending"
          type="trending"
          selectIndex={this.state.selectIndex}
          action={this.props.responsitories.getTrending(
            this.state.since,
            this.state.language,
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menu: {
    width: 110,
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  item: {
    padding: 10,
    paddingLeft: 30,
    paddingRight: 10,
  },
  option: {
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 50,
    paddingRight: 50,
  },
});

const touchableOpacityProps = {
  activeOpacity: 0.6,
};
export default Home;
