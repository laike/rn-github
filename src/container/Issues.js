import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import Color from 'color';
import store from '../stores';
import {MAIN_COLOR, TEXT_COLOR, BG_COLOR} from '../constants/styles';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import CommonDetailForTab from '../components/CommonDetailForTab';
const renderScene = SceneMap({
  notread: CommonDetailForTab,
  readed: CommonDetailForTab,
  all: CommonDetailForTab,
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
export default class Issues extends Component {
  constructor(props) {
    super(props);
    const {url} = props;
    this.state = {
      index: 0,
      routes: props.routes
        ? props.routes
        : [
            {
              key: 'notread',
              title: '开启',
              url: `${url}?state=open`,
              component: 'issues',
            },
            {
              key: 'readed',
              title: '关闭',
              url: `${url}?state=close`,
              component: 'issues',
            },
            {
              key: 'all',
              title: '全部',
              url: `${url}?state=all`,
              component: 'issues',
            },
          ],
    };
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
    backgroundColor: Color(BG_COLOR)
      .darken(0.6)
      .hex(),
  },
  tabStyle: {
    borderBottomColor: TEXT_COLOR,
    borderBottomWidth: 0.3,
  },
  labelStyle: {},
});
