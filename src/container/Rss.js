import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';

import store from '../stores';
import Color from 'color';
import {MAIN_COLOR, TEXT_COLOR, BG_COLOR} from '../constants/styles';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import CommonDetail from '../components/CommonDetail';

const renderScene = SceneMap({
  notread: CommonDetail,
  readed: CommonDetail,
  all: CommonDetail,
});

const renderTabBar = props => (
  <TabBar
    {...props}
    scrollEnabled
    indicatorStyle={styles.indicatorStyle}
    style={styles.tabbar}
    labelStyle={styles.labelStyle}
    tabStyle={styles.tabStyle}
  />
);

export default class Rss extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        {key: 'notread', title: '未读'},
        {key: 'readed', title: '已读'},
        {key: 'all', title: '全部'},
      ],
    };
  }
  componentDidMount() {
    //进行请求获取用户信息
    // this.load();
  }

  onRefresh() {
    load();
  }

  onIndexChange(index) {
    this.setState({
      index,
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <TabView
          lazy
          navigationState={this.state}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          onIndexChange={this.onIndexChange.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: TEXT_COLOR,
    flex: 1,
  },

  tabbar: {
    backgroundColor: BG_COLOR,
  },
  tabStyle: {
    borderBottomColor: TEXT_COLOR,
    borderBottomWidth: 0.3,
  },
  labelStyle: {},
});
