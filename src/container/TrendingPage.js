/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {StyleSheet, StatusBar, View} from 'react-native';
import {STATUS_BAR_STYLE, BG_COLOR, TEXT_COLOR} from '../constants/styles';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import ScrollViewContainer from '../components/ScrollViewContainer';
import Color from 'color';
import {bindActionCreators} from 'redux';
import responsitoryActions from '../actions/reponsitories';
import {connect} from 'react-redux';
//引入react-native-dropdown-menus;
import DropDownMenus from 'react-native-dropdownmenus';
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
    };
  }
  componentDidMount() {
    //这里请求数据
    // getLanguageList().then(res => {
    //   this.setState({
    //     langs: [
    //       ['daily', 'weekly', 'monthly'],
    //       res.splice(0, 15).map(lang => lang.name),
    //     ],
    //   });
    //   console.log(this.state.langs);
    // });
  }

  renderTabBar() {
    return (
      <View
        style={{
          height: 50,
          zIndex: 2,
        }}>
        <DropDownMenus
          data={TRENDING_PAGE_MENUS_DATA}
          titleStyle={{
            fontSize: 16,
          }}
          bgColor={TEXT_COLOR}
          tintColor={'#999'}
          optionTextStyle={{fontSize: 16}}
          activityTintColor={Color(BG_COLOR)
            .darken(0.8)
            .hex()}
          handler={(selection, row) => {
            console.log(selection, row);
            if (selection === 0) {
              //第一个数组
              this.setState({
                selectIndex: [0, row],
                since: TRENDING_PAGE_MENUS_DATA_QUERY[selection][row],
              });
            } else if (selection === 1) {
              //第二个数组
              this.setState({
                selectIndex: [1, row],
                language: TRENDING_PAGE_MENUS_DATA_QUERY[selection][row],
              });
            }
          }}
          seletIndex={this.state.selectIndex}
        />
      </View>
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar {...STATUS_BAR_STYLE} />
        {/*这里暂时不封装scrollview，后面真个项目功能基本完善以后再来做代码重构。 */}
        <ScrollableTabView
          ref={ref => {
            this.scrollTabs = ref;
          }}
          renderTabBar={() => {
            return this.renderTabBar();
          }}>
          <ScrollViewContainer
            key="trending"
            type="trending"
            selectIndex={this.state.selectIndex}
            action={this.props.responsitories.getTrending(
              this.state.since,
              this.state.language,
            )}
          />
        </ScrollableTabView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Home;