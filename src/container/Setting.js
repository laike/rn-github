/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  ScrollViewPropertiesAndroid,
  RefreshControl
} from 'react-native';
import WebView from 'react-native-webview';
import Icon from 'react-native-vector-icons/FontAwesome';
import { STATUS_BAR_STYLE, BLACK_COLOR, TEXT_COLOR, BG_COLOR } from '../constants/styles';
import Color from 'color';
import TouchFeedbackItem from '../components/TouchFeedbackItem';
import { Actions } from 'react-native-router-flux';
export default class Setting extends Component {
  onRefresh() {
    //这里写刷新的代码
  }
  render() {
    return (
      <ScrollView style={styles.setting} refreshControl={<RefreshControl onRefresh={this.onRefresh} />}
      >
        <StatusBar {...STATUS_BAR_STYLE} />
        <View style={styles.header}>
          <TouchFeedbackItem name="github" title="GeekWindKe" iconStyle={{
            fontSize: 80,
          }} onPress={() => {
            Actions.push('ProfilePage', {});
          }} />
        </View>
        <View style={styles.body}>
          <TouchFeedbackItem name="user" title="profile" onPress={() => {
            Actions.push('ProfilePage', {});
          }} />
          <TouchFeedbackItem name="bell" title="Notifictions" onPress={() => {
            Actions.push('NotifictionsPage', {});
          }} />
          <TouchFeedbackItem name="hacker-news" title="News" onPress={() => {
            Actions.push('NewsPage', {
              url: 'https://api.github.com/users/laike/received_events'
            });
          }} />
          <TouchFeedbackItem name="question-circle" title="Issues" onPress={() => {
            Actions.push('IssuesPage', {});
          }} />
          <View style={styles.event}>
            <Text style={styles.eventtitle}>Event</Text>
          </View>
          <TouchFeedbackItem name="rss" title="Laike" onPress={() => {
            Actions.push('RssPage', {
              url: 'https://api.github.com/users/laike/events'
            });
          }} />
          <View style={styles.event}>
            <Text style={styles.eventtitle}>Respositories</Text>
          </View>
          <TouchFeedbackItem name="book" title="Owned" onPress={() => {
            Actions.push('ReposityPage', { title: '我的仓库' });
          }} />
          <TouchFeedbackItem name="star" title="Stared" onPress={() => {
            Actions.push('StaredPage', { title: '我的关注' });
          }} />
          <TouchFeedbackItem name="bar-chart-o" title="trending" onPress={() => {
            Actions.push('TrendingPage', { title: '热门趋势' });
          }} />
          <TouchFeedbackItem name="search" title="Search" onPress={() => {
            Actions.SearchPage({})
          }} />
          <View style={styles.event}>
            <Text style={styles.eventtitle}>Favorite Respositories</Text>
          </View>

          <TouchFeedbackItem name="book" title="GSYGithubAPP" onPress={() => {
            Actions.push('ShowCodePage', { title: '仓库信息页' });
          }} />
          <View style={styles.event}>
            <Text style={styles.eventtitle}>Info and Preference</Text>
          </View>
          <TouchFeedbackItem name="gear" title="Settings" onPress={() => {
            Actions.push('MyPage', {

            });
          }} />
          <TouchFeedbackItem name="wechat" title="Feedback and Suggest" />
          <TouchFeedbackItem name="user" title="Accounts" />
        </View>
      </ScrollView >
    );
  }
}

const styles = StyleSheet.create({
  setting: {

  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  body: {
    flex: 1,
  },
  event: {
    backgroundColor: Color(BG_COLOR).darken(0.6).hex(),
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
  },
  eventtitle: {
    color: TEXT_COLOR,
    fontSize: 14,
  },
});
