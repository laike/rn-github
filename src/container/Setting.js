/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  ScrollViewPropertiesAndroid
} from 'react-native';
import WebView from 'react-native-webview';
import Icon from 'react-native-vector-icons/FontAwesome';
import { STATUS_BAR_STYLE, BLACK_COLOR, TEXT_COLOR } from '../constants/styles';
import Color from 'color';
import TouchFeedbackItem from '../components/TouchFeedbackItem';
export default class Setting extends Component {
  render() {
    return (
      <ScrollView style={styles.setting}>
        <StatusBar {...STATUS_BAR_STYLE} />
        <View style={styles.header}>
          <TouchFeedbackItem name="github" title="profile" iconStyle={{
            fontSize: 80,
          }} />
        </View>
        <View style={styles.body}>
          <TouchFeedbackItem name="user" title="profile" />
          <TouchFeedbackItem name="inbox" title="Notifictions" />
          <TouchFeedbackItem name="user" title="News" />
          <TouchFeedbackItem name="question" title="Issues" />
          <View style={styles.event}>
            <Text style={styles.eventtitle}>Event</Text>
          </View>
          <TouchFeedbackItem name="rss" title="Laike" />
          <View style={styles.event}>
            <Text style={styles.eventtitle}>Respositories</Text>
          </View>
          <TouchFeedbackItem name="book" title="Owned" />
          <TouchFeedbackItem name="star" title="Stared" />
          <TouchFeedbackItem name="bar-chart-o" title="trending" />
          <TouchFeedbackItem name="search" title="Search" />
          <View style={styles.event}>
            <Text style={styles.eventtitle}>Favorite Respositories</Text>
          </View>
          <TouchFeedbackItem name="book" title="GSYGithubAPP" />
          <View style={styles.event}>
            <Text style={styles.eventtitle}>Info and Preference</Text>
          </View>
          <TouchFeedbackItem name="gear" title="Settings" />
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
    backgroundColor: '#17233d',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
  },
  eventtitle: {
    color: TEXT_COLOR,
    fontSize: 14,
  },
});
