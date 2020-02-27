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

import Color from 'color';
import {MAIN_COLOR, TEXT_COLOR, BG_COLOR} from '../constants/styles';
import store from '../stores';
import {Actions} from 'react-native-router-flux';

import {GH_CHART_API, SCREEN_WIDTH} from '../constants/constants';
import CommonHeader from '../components/CommonHeader';
import CommonToolBar from '../components/CommonToolBar';
import CommonInfo from '../components/CommonInfo';

export default class ShowCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repo: {},
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
    const {url = 'repos/laike/GSYGithubAPP'} = this.props;
    http
      .get(url)
      .then(res => {
        this.setState({
          loading: false,
          repo: res.data,
        });
      })
      .catch(err => {
        toast('获取仓库信息失败！请稍后重试');
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
        <CommonHeader type={'repo'} data={this.state.repo} />

        <CommonToolBar
          data={[
            {
              label: 'Stagazers',
              data: this.state.repo.stargazers_count,
              callback: () => {
                Actions.push('CommonPage', {
                  title: 'Stagazers',
                  url: `repos/${this.state.repo.full_name}/stargazers`,
                  component: 'stargazers',
                });
              },
            },
            {
              label: 'Watchers',
              data: this.state.repo.watchers_count,
              callback: () => {
                Actions.push('CommonPage', {
                  title: 'Watchers',
                  url: `repos/${this.state.repo.full_name}/subscribers`,
                  component: 'subscribers',
                });
              },
            },
            {
              label: 'Forks',
              data: this.state.repo.forks_count,
              callback: () => {
                Actions.push('ReposityPage', {
                  title: 'Forks',
                  url: `repos/${this.state.repo.full_name}/forks`,
                });
              },
            },
          ]}
        />

        <CommonInfo data={this.state.repo} />

        <View style={styles.list}>
          <TouchFeedbackItem
            name="rss"
            title="Events"
            onPress={() => {
              Actions.push('NewsPage', {
                url: `networks/${this.state.repo.full_name}/events`,
                title: this.state.repo.full_name,
              });
            }}
          />
          <TouchFeedbackItem
            name="info-circle"
            title="Issues"
            onPress={() => {
              Actions.push('IssuesPage', {
                url: `repos/${this.state.repo.full_name}/issues`,
              });
            }}
          />
          <TouchFeedbackItem
            name="file-text"
            title="Readme"
            onPress={() => {
              Actions.push('RepositoryDetailPage', {
                full_name: this.state.repo.full_name,
                title: this.state.repo.full_name,
              });
            }}
          />
        </View>

        <View style={styles.list}>
          <TouchFeedbackItem
            name="crosshairs"
            title="Commits"
            onPress={() => {
              Actions.push('CommonPage', {
                title: 'Branches',
                url: `repos/${this.state.repo.full_name}/branches`,
                component: 'branches',
              });
            }}
          />
          <TouchFeedbackItem
            name="retweet"
            title="Pull Requests"
            onPress={() => {
              Actions.push('IssuesPage', {
                routes: [
                  {
                    key: 'open',
                    title: '开启',
                    url: `repos/${this.state.repo.full_name}/pulls?state=open`,
                    component: 'issues',
                  },
                  {
                    key: 'close',
                    title: '关闭',
                    url: `repos/${this.state.repo.full_name}/pulls?state=close`,
                    component: 'issues',
                  },
                  {
                    key: 'all',
                    title: '全部',
                    url: `repos/${this.state.repo.full_name}/pulls?state=all`,
                    component: 'issues',
                  },
                ],
              });
            }}
          />
          <TouchFeedbackItem
            name="code"
            title="Sources"
            onPress={() => {
              Actions.push('CommonPage', {
                title: 'Branches',
                full_name: this.state.repo.full_name,
                url: `repos/${this.state.repo.full_name}/branches`,
                component: 'sourcesbranches',
              });
              // Actions.push('SourcePage', {
              //   title: `${this.state.repo.full_name}`,
              //   url: `repos/${this.state.repo.full_name}/contents`,
              // });
            }}
          />
        </View>
        <View style={styles.list}>
          {/* 是否有主页根据homepage这个参数来判定 */}
          {this.state.repo.homepage ? (
            <TouchFeedbackItem
              name="chrome"
              title="Website"
              onPress={() => {
                Actions.push('WebPage', {
                  source: {
                    uri: this.state.repo.homepage,
                  },
                  title: this.state.repo.homepage,
                });
              }}
            />
          ) : (
            <View />
          )}
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
    height: 90,
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
