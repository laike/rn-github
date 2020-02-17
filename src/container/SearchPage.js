/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  InteractionManager,
  Text,
  TextInput,
} from 'react-native';
import Button from 'react-native-button';
import languageActions from '../actions/language';
import responsitoryActions from '../actions/reponsitories';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
//引入checkbox
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Color from 'color';
import ScrollViewContainer from '../components/ScrollViewContainer';
import {SEARCH_TABS, SCREEN_WIDTH} from '../constants/constants';
import SearchTabBar from '../components/SearchTabBar';
import {TEXT_COLOR, BG_COLOR} from '../constants/styles';
const propTypes = {};
const defaultProps = {};
@connect(
  state => ({
    state,
  }),
  dispatch => ({
    language: bindActionCreators(languageActions, dispatch),
    responsitories: bindActionCreators(responsitoryActions, dispatch),
  }),
)
class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      search: 'All',
    };
  }

  componentDidMount() {
    //组件加载
    //  this.getLang();
  }
  componentWillUnmount() {
    //组件卸载
  }
  SearchRepositories() {
    //搜索的代码
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.search}>
          <TextInput
            style={styles.searchInput}
            placeholder={'请输入搜索的关键字！'}
          />
          <Button
            style={styles.searchBtn}
            onPress={() => {
              this.SearchRepositories();
            }}>
            搜索
          </Button>
          {/* 新增历史记录功能包括用户搜索过的所有关键字，我们需要一个历史记录表来操作， */}
        </View>
        <FlatList style={styles.historyList} />
        {/* 搜索结果显示部分，使用一个scrollTabview */}
        <ScrollableTabView
          style={styles.list}
          ref={ref => {
            this.scrollTabs = ref;
          }}
          renderTabBar={() => <SearchTabBar />}>
          {SEARCH_TABS.map((item, key) => (
            <ScrollViewContainer
              key={key}
              type="home"
              tabLabel={item}
              action={this.props.responsitories.searchReponsitories(
                this.state.search,
              )}
            />
          ))}
        </ScrollableTabView>
      </View>
    );
  }
}

SearchPage.propTypes = propTypes;
SearchPage.defaultProps = defaultProps;
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    top: 46,
    left: 10,
    height: 100,
    width: SCREEN_WIDTH - 20,
    backgroundColor: TEXT_COLOR,
    zIndex: 2,
    borderColor: Color(TEXT_COLOR)
      .darken(0.6)
      .hex(),
    borderWidth: 0.3,
  },
  searchBtn: {
    backgroundColor: Color(BG_COLOR)
      .darken(0.8)
      .hex(),
    color: TEXT_COLOR,
    padding: 10,
    fontSize: 14,
  },
  searchInput: {
    flex: 1,
    borderColor: Color(TEXT_COLOR)
      .darken(0.6)
      .hex(),
    borderWidth: 0.3,
    paddingLeft: 5,
  },
});
export default SearchPage;
