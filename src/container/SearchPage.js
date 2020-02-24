
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { View, StyleSheet, FlatList, TextInput, Text, } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
import Button from 'react-native-button';
import Color from 'color';
import { SEARCH_TABS, SCREEN_WIDTH } from '../constants/constants';
import Display from 'react-native-display';
import { TEXT_COLOR, BG_COLOR } from '../constants/styles';
import CommonDetailForTab from '../components/CommonDetailForTab';
import { toast, insert, queryOne, queryAll } from '../untils/untils';
import { TouchableOpacity, TouchableHighlight } from 'react-native-gesture-handler';
const propTypes = {};
const defaultProps = {};
const renderScene = SceneMap({
  repository: CommonDetailForTab,
  users: CommonDetailForTab,
})
const renderTabBar = (props) =>
  (<TabBar {...props} scrollEnabled indicatorStyle={styles.indicatorStyle}
    style={styles.tabbar}
    labelStyle={styles.labelStyle}
    tabStyle={styles.tabStyle}


  />)
class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      input: '',
      search: 'All',
      enable: false,
      index: 0,
      histories: [],
      routes: [
        {
          key: 'repository',
          component: 'search/reponsitories',
          title: '仓库',
          url: `search/repositories?q=All`
        },
        {
          key: 'users',
          component: 'search/users',
          title: '用户',
          url: `search/users?q=All`
        },
      ]
    };
  }
  onIndexChange(index) {
    this.setState({
      index
    })
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
            placeholder={'请输入搜索的关键字！'}
            onChangeText={input => {
              this.setState({
                input: input.trim(), //取药去除空格
              });
            }}
            onFocus={() => {
              //设置显示
              //同时从数据库中查找是否有历史记录没有就显示没有记录
              this.setState({
                enable: true,
                histories: queryAll('SearchHistory', 10)
              });


            }}
            onBlur={() => {
              this.setState({
                enable: false,
              });
            }}
          />
          <Button
            style={styles.searchBtn}
            onPress={() => {
              if (this.state.input === '') {
                toast('请输入搜索关键字！')
                return;
              }
              //保存到历史搜索记录表
              insert('SearchHistory', `name="${this.state.input}"`, {
                name: this.state.input,
                data: this.state.input,
                time: Date.now().toString()
              })

              this.setState({
                histories: queryAll('SearchHistory', 10),
                routes: [
                  {
                    key: 'repository',
                    component: 'search/reponsitories',
                    title: '仓库',
                    url: `search/repositories?q=${this.state.input}`
                  },
                  {
                    key: 'users',
                    component: 'search/users',
                    title: '用户',
                    url: `search/users?q=${this.state.input}`
                  },
                ]
              });
            }}>
            搜索
          </Button>
          {/* 新增历史记录功能包括用户搜索过的所有关键字，我们需要一个历史记录表来操作， */}
        </View>
        <Display enable={this.state.enable}>
          <FlatList
            ref={ref => {
              this.list = ref;
            }}
            style={styles.historyList}
            data={this.state.histories}
            ListEmptyComponent={() => <Text>暂时没有搜索记录</Text>}
            keyExtractor={(item, index) => index.toString()}
            renderItem={data => {
              return (
                <TouchableHighlight style={styles.historyItem} onPress={() => {
                  console.log(data.item.name);
                  this.setState({
                    enable: false,
                    input: data.item.name,
                    routes: [
                      {
                        key: 'repository',
                        component: 'search/reponsitories',
                        title: '仓库',
                        url: `search/repositories?q=${data.item.name}`
                      },
                      {
                        key: 'users',
                        component: 'search/users',
                        title: '用户',
                        url: `search/users?q=${data.item.name}`
                      },
                    ]
                  })
                }}>
                  <Text>{data.item.name}</Text>
                </TouchableHighlight>
              )
            }}
          />
        </Display>
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
  },
  historyList: {
    position: 'absolute',
    top: 0,
    left: 10,
    padding: 10,
    width: SCREEN_WIDTH - 20,
    backgroundColor: TEXT_COLOR,
    zIndex: 2,
    borderColor: Color(TEXT_COLOR)
      .darken(0.6)
      .hex(),
    borderWidth: 0.3,
    shadowOffset: { x: 4, y: 4 },
    shadowColor: '#dddddd',
    shadowRadius: 2,
    shadowOpacity: 0.2,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    elevation: 4,
  },
  historyItem: {
    padding: 5,
    borderBottomWidth: '#ddd',
    borderBottomWidth: 0.3,
  },
  historyItemText: {

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
    backgroundColor: Color(BG_COLOR).darken(0.6).hex(),

  },
  tabStyle: {
    borderBottomColor: TEXT_COLOR,
    borderBottomWidth: 0.3,
    width: SCREEN_WIDTH / 2,

  },
  labelStyle: {}
});

export default SearchPage