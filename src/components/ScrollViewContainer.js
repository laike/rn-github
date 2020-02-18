/* eslint-disable react-native/no-inline-styles */
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  FlatList,
  InteractionManager,
  Linking,
  AppState,
} from 'react-native';
import Home_List_Item from './Home_List_Item';
import Trending_List_Item from './Trending_List_Item';
import User_List_item from './User_List_Item';
import EmptyComponent from './EmptyComponent';
import _ from 'lodash';
import {MAIN_COLOR} from '../constants/styles';

const propTypes = {
  action: PropTypes.any,
};
const defaultProps = {
  action: new Promise((resolve, reject) => {}),
};

class ScrollViewContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      appState: AppState.currentState,
      loading: false,
    };
    this.request = null;
  }
  AppStateChange(nextAppState) {
    if (
      this.appState.match(/incative|background/) &&
      nextAppState === 'active'
    ) {
      //表示APP已经从后台后者不活动状态唤醒了
      this.LoadData();
    }
    this.setState({
      appState: nextAppState,
    });
  }
  componentDidMount() {
    this.LoadData();
    //在这里我们新增当前活动窗口事件监听
    AppState.addEventListener('change', this.AppStateChange);
  }
  LoadData(saved = false) {
    InteractionManager.runAfterInteractions(() => {
      //开始请求
      this.setState({loading: true});
      this.request = this.props.action
        .then(({value}) => {
          const {data, save, result} = value;
          if (!result) {
            return typeof save === 'function' ? save() : null;
          } else if (result) {
            this.setState({
              loading: false,
              data,
            });
          }
          //用户强制要求获取远程数据并且储存在本地realm数据库
          if (saved) {
            save && save();
          }
        })
        .then(resp => {
          if (__DEV__) {
            if (resp) {
              console.log(
                '正在从服务器重新获取数据，并且保存到realm本地数据库！',
              );
            }
          }
          if (resp && resp.data) {
            this.setState({
              loading: false,
              data: resp.data,
            });
          }
        })
        .catch(err => {
          //这里加载错误了的话我们再重新加载
          //this.LoadData();
          if (__DEV__) {
            console.log(err);
          }
        });
    });
  }
  componentWillUnmount() {
    if (this.request) {
      this.request = null;
    }
    AppState.removeEventListener('change', this.AppStateChange);
  }
  componentDidUpdate(prevProps, preveState) {
    //console.log('insiderComponents', this.props.selectIndex);
    if (prevProps.selectIndex !== this.props.selectIndex) {
      this.LoadData();
    }
    if (prevProps.search !== this.props.search) {
      console.log(this.props.search);
      this.LoadData();
    }
  }
  Link(url) {
    Linking.open(url);
  }
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          ref={ref => {
            this.list = ref;
          }}
          ListEmptyComponent={() => <EmptyComponent />}
          style={styles.flatList}
          data={this.state.data}
          refreshing={this.state.loading}
          onRefresh={() => {
            this.LoadData();
          }}
          onEndReachedThreshold={0.1}
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
