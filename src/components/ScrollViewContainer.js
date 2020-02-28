/* eslint-disable react-native/no-inline-styles */
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  FlatList,
  InteractionManager,
  Linking,
} from 'react-native';
import Home_List_Item from './Home_List_Item';
import Trending_List_Item from './Trending_List_Item';
import User_List_item from './User_List_Item';
import EmptyComponent from './EmptyComponent';
import _ from 'lodash';
import {MAIN_COLOR} from '../constants/styles';
import {doActionsRequest} from '../untils/untils';
import User_Event_List_Item from './User_Event_List_Item';
import {
  TRENDING_PAGE_MENUS_DATA,
  TRENDING_PAGE_MENUS_DATA_QUERY,
} from '../constants/constants';
const propTypes = {
  action: PropTypes.any,
};
const defaultProps = {
  action: new Promise((resolve, reject) => {}),
};

class ScrollViewContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.page = 1;
    this.pagesize = 10; //最大就请求到10就行了这个github考虑的
    this.state = {
      data: [],
      loading: false,
    };
    this.request = null;
  }
  componentDidMount() {
    this.LoadData();
  }
  LoadData(saved = false) {
    if (this.props.selectIndex) {
      console.log(TRENDING_PAGE_MENUS_DATA_QUERY[0][this.props.selectIndex[0]]);
      console.log(TRENDING_PAGE_MENUS_DATA_QUERY[1][this.props.selectIndex[1]]);
    }
    InteractionManager.runAfterInteractions(() => {
      let action = new Promise((resolve, reject) => {});
      if (this.props.type === 'trending') {
        action = this.props.actions.getTrending(
          TRENDING_PAGE_MENUS_DATA_QUERY[0][this.props.selectIndex[0]],
          TRENDING_PAGE_MENUS_DATA_QUERY[1][this.props.selectIndex[1]],
        );
      } else if (this.props.type === 'dynamic') {
        action = this.props.actions.getUserDynamic('events', {
          page: this.page,
          per_page: 20,
        });
      }
      doActionsRequest(
        action,
        data => {
          let preData = this.state.data;
          if (this.props.type !== 'trending') {
            this.setState({
              loading: false,
              data: [...preData, ...data],
            });
          } else {
            this.setState({
              loading: false,
              data,
            });
          }

          //添加page
        },
        () => {
          this.setState({
            loading: true,
          });
        },
      )();
    });
  }
  componentWillUnmount() {
    if (this.request) {
      this.request = null;
    }
  }
  componentDidUpdate(prevProps, preveState) {
    if (prevProps.selectIndex !== this.props.selectIndex) {
      this.LoadData();
    }
    if (prevProps.search !== this.props.search) {
      this.LoadData();
    }
  }
  Link(url) {
    Linking.open(url);
  }
  //新增下拉自动加载功能
  onEndReached() {
    //注意这里的trending流行趋势是没有page分页一说的，每天都是最新
    if (this.page <= this.pagesize && this.props.type !== 'trending') {
      this.page++;
      this.LoadData();
    }
  }
  render() {
    return (
      <View style={styles.container}>
        {this.state.data.length === 0 ? <EmptyComponent /> : <View />}
        <FlatList
          ref={ref => {
            this.list = ref;
          }}
          style={styles.flatList}
          data={this.state.data}
          refreshing={this.state.loading}
          onRefresh={() => {
            this.LoadData();
          }}
          onEndReachedThreshold={0.3}
          onEndReached={this.onEndReached.bind(this)}
          keyExtractor={(item, index) => index.toString()}
          renderItem={data => {
            if (this.props.type === 'home') {
              return (
                <Home_List_Item
                  keyExtractor={(item, index) => index.toString()}
                  data={data.item}
                />
              );
            } else if (this.props.type === 'trending') {
              return (
                <Trending_List_Item
                  keyExtractor={(item, index) => index.toString()}
                  data={data.item}
                />
              );
            } else if (this.props.type === 'search/reponsitories') {
              return (
                <Home_List_Item
                  keyExtractor={(item, index) => index.toString()}
                  data={data.item}
                />
              );
            } else if (this.props.type === 'search/users') {
              return (
                <User_List_item
                  keyExtractor={(item, index) => index.toString()}
                  data={data.item}
                />
              );
            } else if (this.props.type === 'dynamic') {
              return (
                <User_Event_List_Item
                  keyExtractor={(item, index) => index.toString()}
                  data={data.item}
                />
              );
            }
          }}
        />
      </View>
    );
  }
}

ScrollViewContainer.propTypes = propTypes;
ScrollViewContainer.defaultProps = defaultProps;
const styles = StyleSheet.create({
  container: {
    backgroundColor: MAIN_COLOR,
    padding: 5,
    flex: 1,
  },
  flatList: {},
});
export default ScrollViewContainer;
