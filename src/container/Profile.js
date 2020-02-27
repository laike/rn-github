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
import {toast} from '../untils/untils';
import http from '../untils/http';
import TouchFeedbackItem from '../components/TouchFeedbackItem';
import {
  TouchableHighlight,
  TouchableNativeFeedback,
} from 'react-native-gesture-handler';
import Color from 'color';
import {MAIN_COLOR, TEXT_COLOR, BG_COLOR} from '../constants/styles';
import store from '../stores';
import {Actions} from 'react-native-router-flux';
import WebViewComponent from '../components/WebViewComponent';
import {GH_CHART_API, SCREEN_WIDTH} from '../constants/constants';
import CommonHeader from '../components/CommonHeader';
import CommonToolBar from '../components/CommonToolBar';
import moment from 'moment';
import {CLEAR_OTHER_ELEMENTS} from '../constants/js';
export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        followers: 0,
        following: 0,
      },
      loading: false,
    };
  }
  componentDidMount() {
    //进行请求获取用户信息
    this.load();
  }

  load() {
    this.setState({
      loading: true,
    });
    //这里我们提供一个外部接口如果外面传入了参数那么我们就接收这个参数
    const {url = 'https://api.github.com/user'} = this.props;
    http
      .get(url)
      .then(res => {
        this.setState({
          loading: false,
          user: res.data,
        });
      })
      .catch(err => {
        toast('用户信息获取失败！');
      });
  }
  onRefresh() {
    this.load();
  }

  render() {
    return (
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={this.state.loading}
            onRefresh={this.onRefresh.bind(this)}
          />
        }>
        <CommonHeader data={this.state.user} />
        <WebViewComponent
          source={{
            uri: `https://github.com/users/${
              this.state.user.login
            }/contributions?to=${moment().format()}`,
          }}
          style={styles.commits}
          scrollEnabled={true}
          injectedJavaScript={CLEAR_OTHER_ELEMENTS}
        />

        <CommonToolBar
          data={[
            {
              label: 'Followers',
              data: this.state.user.followers,
              callback: () => {
                Actions.push('CommonPage', {
                  title: 'Followers',
                  url: `users/${this.state.user.login}/followers`,
                  component: 'stargazers',
                });
              },
            },
            {
              label: 'Following',
              data: this.state.user.following,
              callback: () => {
                Actions.push('CommonPage', {
                  title: 'Following',
                  url: `users/${this.state.user.login}/following`,
                  component: 'subscribers',
                });
              },
            },
          ]}
        />
        <View style={styles.list}>
          <TouchFeedbackItem
            name="rss"
            title="Events"
            onPress={() => {
              Actions.push('NewsPage', {
                url: `users/${this.state.user.login}/events`,
                title: `${this.state.user.login}'s Events`,
              });
            }}
          />
          <TouchFeedbackItem
            name="group"
            title="Organizations"
            onPress={() => {
              Actions.push('NewsPage', {
                title: 'Oganizations',
                url: `users/${this.state.user.login}/orgs`,
              });
            }}
          />
          <TouchFeedbackItem
            name="book"
            title="Respositories"
            onPress={() => {
              Actions.push('ReposityPage', {
                title: '我的仓库',
                url: `users/${this.state.user.login}/repos`,
                title: `${this.state.user.login}的仓库`,
              });
            }}
          />
          <TouchFeedbackItem
            name="git"
            title="Gists"
            onPress={() => {
              Actions.push('CommonPage', {
                title: `${this.state.user.login}'s Gists`,
                url: `users/${this.state.user.login}/gists?since=${moment(
                  '20190101',
                  'YYYYMMDD',
                ).format()}`,
                component: 'reposcommits',
              });
            }}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: MAIN_COLOR,
  },
  header: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BG_COLOR,
  },
  avatar: {
    width: 100,
    height: 100,
  },
  nickname: {
    fontSize: 20,
    color: TEXT_COLOR,
  },
  subitem: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
  },
  num: {fontSize: 14, textAlign: 'center'},
  info: {
    fontSize: 18,
    textAlign: 'center',
  },
  toolbar: {
    flexDirection: 'row',
    backgroundColor: TEXT_COLOR,
  },
  list: {
    marginTop: 10,
    backgroundColor: TEXT_COLOR,
  },
  commits: {
    height: 150,
    width: SCREEN_WIDTH * 2,
  },
  bio: {
    color: TEXT_COLOR,
    padding: 4,
  },
  company: {
    color: TEXT_COLOR,
    padding: 4,
  },
  blog: {
    color: TEXT_COLOR,
    padding: 4,
  },
  location: {
    color: TEXT_COLOR,
    padding: 4,
    marginBottom: 10,
  },
});
