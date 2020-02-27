import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Image,
  Platform,
} from 'react-native';
import Color from 'color';
import {MAIN_COLOR, TEXT_COLOR, BG_COLOR} from '../constants/styles';
import {Actions} from 'react-native-router-flux';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import CommonDetailForTab from '../components/CommonDetailForTab';
import store from '../stores';

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

export default class Notifictions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        {
          key: 'notread',
          title: '未读',
          url: `notifications?participating=true`,
          component: 'normal',
        },
        {
          key: 'readed',
          title: '已读',
          url: `notifications?participating=false`,
          component: 'normal',
        },
        {
          key: 'all',
          title: '全部',
          url: `notifications?all=true`,
          component: 'normal',
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
    backgroundColor: BG_COLOR,
  },
  tabStyle: {
    borderBottomColor: TEXT_COLOR,
    borderBottomWidth: 0.3,
  },
  labelStyle: {},
});
