/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {STATUS_BAR_STYLE, TEXT_COLOR, BG_COLOR} from '../constants/styles';
import Color from 'color';
import TouchFeedbackItem from '../components/TouchFeedbackItem';
import {Actions} from 'react-native-router-flux';
import {getUserInfo} from '../untils/userUntils';
import http from '../untils/http';
import store from '../stores';
import Theme from '../untils/theme';
class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      loading: false,
    };
  }
  componentDidMount() {
    //这里获取一下用户基本信息
    getUserInfo().then(info => {
      console.log(info);
      this.setState({
        user: info,
      });
    });
  }
  onRefresh() {
    //这里写刷新的代码
    http.doUserLogin('settingpage');
    this.setState({
      loading: false,
    });
  }
  render() {
    return (
      <ScrollView
        style={styles.setting}
        refreshControl={
          <RefreshControl
            onRefresh={this.onRefresh.bind(this)}
            refreshing={this.state.loading}
          />
        }>
        <StatusBar {...STATUS_BAR_STYLE} />
        <View
          style={[
            styles.event,
            {
              backgroundColor: Color(this.props.theme.theme)
                .darken(0.6)
                .hex(),
            },
          ]}>
          <Text style={styles.eventtitle}>基础信息</Text>
        </View>
        <TouchFeedbackItem
          title={this.state.user.login}
          uri={this.state.user.avatar_url}
          imageStyle={{
            borderRadius: 30,
          }}
          onPress={() => {
            Actions.push('ProfilePage', {});
          }}
        />

        <View style={styles.body}>
          <TouchFeedbackItem
            name="user"
            title="个人信息"
            onPress={() => {
              Actions.push('ProfilePage', {});
            }}
          />
          <TouchFeedbackItem
            name="bell"
            title="消息通知"
            onPress={() => {
              Actions.push('NotifictionsPage', {});
            }}
          />
          <TouchFeedbackItem
            name="hacker-news"
            title="新闻中心"
            onPress={() => {
              Actions.push('NewsPage', {
                url: `users/${this.state.user.login}/received_events`,
              });
            }}
          />
          <TouchFeedbackItem
            name="question-circle"
            title="问题中心"
            onPress={() => {
              Actions.push('IssuesPage', {});
            }}
          />
          <View
            style={[
              styles.event,
              {
                backgroundColor: Color(this.props.theme.theme)
                  .darken(0.6)
                  .hex(),
              },
            ]}>
            <Text style={styles.eventtitle}>主题</Text>
          </View>
          <TouchFeedbackItem
            name="gear"
            title="主题切换"
            onPress={() => {
              //切换主题代码，主要是修改本地localstorage就进行了切换
              Actions.push('ThemePage', {title: '选择主题'});
            }}
          />

          <View
            style={[
              styles.event,
              {
                backgroundColor: Color(this.props.theme.theme)
                  .darken(0.6)
                  .hex(),
              },
            ]}>
            <Text style={styles.eventtitle}>动态</Text>
          </View>
          <TouchFeedbackItem
            name="rss"
            title={this.state.user.login}
            onPress={() => {
              Actions.push('RssPage', {
                url: `users/${this.state.user.login}/events`,
              });
            }}
          />
          <View
            style={[
              styles.event,
              {
                backgroundColor: Color(this.props.theme.theme)
                  .darken(0.6)
                  .hex(),
              },
            ]}>
            <Text style={styles.eventtitle}>仓库信息</Text>
          </View>
          <TouchFeedbackItem
            name="book"
            title="我的仓库"
            onPress={() => {
              Actions.push('ReposityPage', {
                title: '我的仓库',
                url: `users/${this.state.user.login}/repos`,
              });
            }}
          />
          <TouchFeedbackItem
            name="star"
            title="我的关注"
            onPress={() => {
              Actions.push('StaredPage', {title: '我的关注'});
            }}
          />
          <TouchFeedbackItem
            name="bar-chart-o"
            title="热门趋势"
            onPress={() => {
              Actions.push('TrendingPage', {title: '热门趋势'});
            }}
          />
          <TouchFeedbackItem
            name="search"
            title="搜索"
            onPress={() => {
              Actions.SearchPage({});
            }}
          />
          {/* <View style={[
              styles.event,
              {
                backgroundColor: Color(this.props.theme.theme)
                  .darken(0.6)
                  .hex(),
              },
            ]}>
            <Text style={styles.eventtitle}>搜藏的仓库</Text>
          </View>

          <TouchFeedbackItem
            name="book"
            title="GSYGithubAPP"
            onPress={() => {
              Actions.push('ShowCodePage', {title: '仓库信息页'});
            }}
          /> */}
          <View
            style={[
              styles.event,
              {
                backgroundColor: Color(this.props.theme.theme)
                  .darken(0.6)
                  .hex(),
              },
            ]}>
            <Text style={styles.eventtitle}>设置中心</Text>
          </View>
          <TouchFeedbackItem
            name="gear"
            title="设置中心"
            onPress={() => {
              Actions.push('MyPage', {
                title: '设置中心',
              });
            }}
          />
          <TouchFeedbackItem
            name="wechat"
            title="反馈和建议"
            onPress={() => {
              Actions.push('FeedBackPage', {
                title: '反馈和建议',
              });
            }}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  setting: {
    margin: 5,
  },
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

export const LayoutComponent = Setting;
export function mapStateToProps(state, props) {
  return {
    theme: state.theme,
  };
}
