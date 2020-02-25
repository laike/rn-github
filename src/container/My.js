import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  RefreshControl
} from 'react-native';
import { STATUS_BAR_STYLE, BLACK_COLOR, TEXT_COLOR, BG_COLOR } from '../constants/styles';
import Color from 'color';
import TouchFeedbackItem from '../components/TouchFeedbackItem';
import { Actions } from 'react-native-router-flux';
import { clearAllRealmTabs, clearAllCache, toast } from '../untils/untils';
const MyPage = ({
  params,
}) => {
  function onRefresh() {

  }
  return (
    <ScrollView style={styles.setting} refreshControl={<RefreshControl onRefresh={onRefresh} />}
    >
      <StatusBar {...STATUS_BAR_STYLE} />

      <View style={styles.body}>

        <TouchFeedbackItem name="user" title="个人信息" onPress={() => {
          Actions.push('ProfilePage', {});
        }} />
        <TouchFeedbackItem name="history" title="阅读历史" onPress={() => {
          Actions.push('NotifictionsPage', {});
        }} />

        <View style={styles.event}>
          <Text style={styles.eventtitle}>系统选项</Text>
        </View>
        <TouchFeedbackItem name="gear" title="清除缓存" onPress={() => {
          //这里主要是清除realm的缓存，使得页面能够重新更新数据
          clearAllRealmTabs();
          clearAllCache();
          toast('缓存清除成功！');
        }} />
        <View style={styles.event}>
          <Text style={styles.eventtitle}>项目信息</Text>
        </View>
        <TouchFeedbackItem name="github" title="关于项目" onPress={() => {
          Actions.push('ShowCodePage', {
            url: 'repos/laike/rn-github',
            title: "关于此项目"
          });
        }} />
        <TouchFeedbackItem name="code" title="关于作者" onPress={() => {
          Actions.push('AboutAuthorPage', {});
        }} />

        <View style={styles.event}>
          <Text style={styles.eventtitle}>其他</Text>
        </View>

        <TouchFeedbackItem name="info" title="版本(beta 1.0)" onPress={() => {
          //这里本来是要进行版本更新的操作的但是现在默认只给一个提示
          toast('版本已经最新！');
        }} />

      </View>
    </ScrollView >
  );
}

export default MyPage;
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
