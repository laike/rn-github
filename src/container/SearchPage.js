/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  DeviceEventEmitter,
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Button from 'react-native-button';
import Color from 'color';
import {SEARCH_TABS, SCREEN_WIDTH, SEACH_FILTERS} from '../constants/constants';
// import Display from 'react-native-display';
import {TEXT_COLOR, BG_COLOR} from '../constants/styles';
import store from '../stores';
import CommonDetailForTab from '../components/CommonDetailForTab';
import {toast, insert, queryOne, queryAll} from '../untils/untils';
import Qs from 'qs';
import {
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';

const propTypes = {};
const defaultProps = {};
const renderScene = SceneMap({
  repository: CommonDetailForTab,
  users: CommonDetailForTab,
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
class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      input: 'rn-github',
      search: 'rn-github',
      language: '',
      sort: '',
      order: '',
      enable: false,
      index: 0,
      histories: [],
      routes: [
        {
          key: 'repository',
          component: 'search/reponsitories',
          title: '仓库',
          url: `search/repositories?q=rn-github`,
        },
        {
          key: 'users',
          component: 'search/users',
          title: '用户',
          url: `search/users?q=laike`,
        },
      ],
    };
  }
  componentDidMount() {
    //添加监听
    DeviceEventEmitter.addListener(SEACH_FILTERS, data => {
      //进行操作
      let searchUrl = `search/repositories?q=${
        data.language ? data.language : this.state.input
      }&${Qs.stringify(data)}&${Qs.stringify(data)}`;

      this.setState({
        routes: [
          {
            key: 'repository',
            component: 'search/reponsitories',
            title: '仓库',
            url: searchUrl,
          },
          {
            key: 'users',
            component: 'search/users',
            title: '用户',
            url: `search/users?q=${this.state.input}`,
          },
        ],
      });
    });
  }
  onIndexChange(index) {
    this.setState({
      index,
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.search}>
          <TextInput
            ref={ref => {
              this.input = ref;
            }}
            style={styles.searchInput}
            placeholder={this.state.search}
            onChangeText={input => {
              this.setState({
                input: input.trim(), //取药去除空格
              });
            }}
            onFocus={() => {
              //设置显示
              //同时从数据库中查找是否有历史记录没有就显示没有记录
              this.setState({
                enable: true, //先把这个搜索记录功能过滤掉，在ios上面开启
                histories: queryAll('SearchHistory', 10),
              });
            }}
            onBlur={() => {
              let current = this.state.enable;
              // this.setState({
              //   enable: !current,
              // });
            }}
          />
          <Button
            style={styles.searchBtn}
            onPress={() => {
              if (this.state.input === '') {
                toast('请输入搜索关键字！');
                return;
              }
              //保存到历史搜索记录表
              insert('SearchHistory', `name="${this.state.input}"`, {
                name: this.state.input,
                data: this.state.input,
                time: Date.now().toString(),
              });

              this.setState({
                histories: queryAll('SearchHistory', 10),
                routes: [
                  {
                    key: 'repository',
                    component: 'search/reponsitories',
                    title: '仓库',
                    url: `search/repositories?q=${this.state.input}`,
                  },
                  {
                    key: 'users',
                    component: 'search/users',
                    title: '用户',
                    url: `search/users?q=${this.state.input}`,
                  },
                ],
              });
            }}>
            搜索
          </Button>
          {/* 新增历史记录功能包括用户搜索过的所有关键字，我们需要一个历史记录表来操作， */}
        </View>
        {this.state.enable ? (
          <ScrollView
            ref={ref => {
              this.list = ref;
            }}
            style={styles.historyList}>
            {this.state.histories ? (
              this.state.histories.map((history, index) => (
                <TouchableWithoutFeedback
                  key={index}
                  style={styles.historyItem}>
                  <Text
                    style={styles.historyItemText}
                    onPress={() => {
                      this.setState({
                        enable: false,
                        input: history.name,
                        search: history.name,
                        routes: [
                          {
                            key: 'repository',
                            component: 'search/reponsitories',
                            title: '仓库',
                            url: `search/repositories?q=${history.name}`,
                          },
                          {
                            key: 'users',
                            component: 'search/users',
                            title: '用户',
                            url: `search/users?q=${history.name}`,
                          },
                        ],
                      });
                    }}>
                    {history.name}
                  </Text>
                </TouchableWithoutFeedback>
              ))
            ) : (
              <Text style={{padding: 10}}>暂时没有搜索记录</Text>
            )}
          </ScrollView>
        ) : (
          <View />
        )}

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
SearchPage.propTypes = propTypes;
SearchPage.defaultProps = defaultProps;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 1,
  },
  list: {
    flex: 1,
  },
  search: {
    flexDirection: 'row',
    padding: 10,
    position: 'relative',
    overflow: 'scroll',
  },
  historyList: {
    position: 'absolute',
    top: 45,
    left: 10,
    width: SCREEN_WIDTH - 20,
    backgroundColor: TEXT_COLOR,
    zIndex: 9,
    borderColor: Color(TEXT_COLOR)
      .darken(0.6)
      .hex(),
    borderWidth: 0.3,
    shadowOffset: {x: 4, y: 4},
    shadowColor: '#dddddd',
    shadowRadius: 2,
    shadowOpacity: 0.2,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    elevation: 4,
  },

  historyItem: {
    borderBottomWidth: '#ddd',
    borderBottomWidth: 0.3,
    paddingBottom: 5,
  },
  historyItemText: {
    flex: 1,
    padding: 10,
  },
  searchBtn: {
    backgroundColor: Color(BG_COLOR)
      .darken(0.6)
      .hex(),
    color: TEXT_COLOR,
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 14,
  },
  searchInput: {
    flex: 1,
    position: 'relative',
    top: 0.5,
    height: 38,
    borderColor: Color(TEXT_COLOR)
      .darken(0.6)
      .hex(),
    borderWidth: 0.5,
    fontSize: 14,
    paddingLeft: 10,
  },

  tabbar: {
    backgroundColor: Color(BG_COLOR)
      .darken(0.6)
      .hex(),
  },
  tabStyle: {
    borderBottomColor: TEXT_COLOR,
    borderBottomWidth: 0.3,
    width: SCREEN_WIDTH / 2,
  },
  labelStyle: {},
});

export default SearchPage;
