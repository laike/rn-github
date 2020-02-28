import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {STATUS_BAR_STYLE, BG_COLOR, TEXT_COLOR} from '../constants/styles';
import store from '../stores';
import Color from 'color';
import TouchFeedbackItem from '../components/TouchFeedbackItem';
import {Actions} from 'react-native-router-flux';
import {clearAllRealmTabs, clearAllCache, toast} from '../untils/untils';
import {checkUpdate, getreadHistories} from '../untils/userUntils';
const MyPage = ({theme}) => {
  function onRefresh() {}
  return (
    <ScrollView
      style={styles.setting}
      refreshControl={<RefreshControl onRefresh={onRefresh} />}>
      <StatusBar {...STATUS_BAR_STYLE} />

      <View style={styles.body}>
        <View
          style={[
            styles.event,
            {
              backgroundColor: Color(theme.theme)
                .darken(0.6)
                .hex(),
            },
          ]}>
          <Text style={styles.eventtitle}>个人信息</Text>
        </View>
        <TouchFeedbackItem
          name="user"
          title="个人信息"
          onPress={() => {
            Actions.push('ProfilePage');
          }}
        />
        <TouchFeedbackItem
          name="history"
          title="阅读历史"
          onPress={() => {
            //这里马上新增这个功能！
            Actions.push('CommonPage', {
              title: '阅读历史',
              readhistory: getreadHistories(),
              component: 'readhistories',
            });
          }}
        />
        <View
          style={[
            styles.event,
            {
              backgroundColor: Color(theme.theme)
                .darken(0.6)
                .hex(),
            },
          ]}>
          <Text style={styles.eventtitle}>系统选项</Text>
        </View>
        <TouchFeedbackItem
          name="gear"
          title="清除缓存"
          onPress={() => {
            //这里主要是清除realm的缓存，使得页面能够重新更新数据
            //clearAllRealmTabs();
            clearAllCache();
            toast('缓存清除成功！');
          }}
        />
        <View
          style={[
            styles.event,
            {
              backgroundColor: Color(theme.theme)
                .darken(0.6)
                .hex(),
            },
          ]}>
          <Text style={styles.eventtitle}>代码查看器主题</Text>
        </View>
        <TouchFeedbackItem
          name="gear"
          title="默认主题"
          onPress={() => {
            Actions.push('CodeThemePage', {});
          }}
        />
        <View
          style={[
            styles.event,
            {
              backgroundColor: Color(theme.theme)
                .darken(0.6)
                .hex(),
            },
          ]}>
          <Text style={styles.eventtitle}>项目信息</Text>
        </View>
        <TouchFeedbackItem
          name="github"
          title="关于项目"
          onPress={() => {
            Actions.push('ShowCodePage', {
              url: 'repos/laike/rn-github',
              title: '关于此项目',
            });
          }}
        />
        <TouchFeedbackItem
          name="code"
          title="关于作者"
          onPress={() => {
            Actions.push('WebPage', {
              source: {
                uri: 'https://windke.cn/blog/index.html',
              },
              title: '随风的博客',
            });
          }}
        />

        <View
          style={[
            styles.event,
            {
              backgroundColor: Color(theme.theme)
                .darken(0.6)
                .hex(),
            },
          ]}>
          <Text style={styles.eventtitle}>其他</Text>
        </View>

        <TouchFeedbackItem
          name="info"
          title="版本(beta 1.0.0)"
          onPress={() => {
            checkUpdate();
          }}
        />
      </View>
    </ScrollView>
  );
};

export const LayoutComponent = MyPage;
export function mapStateToProps(state, props) {
  return {
    theme: state.theme,
  };
}
const styles = StyleSheet.create({
  setting: {},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  body: {
    flex: 1,
  },
  event: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
  },
  eventtitle: {
    color: TEXT_COLOR,
    fontSize: 14,
  },
});
