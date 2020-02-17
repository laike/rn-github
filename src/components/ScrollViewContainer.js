/* eslint-disable react-native/no-inline-styles */
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  FlatList,
  InteractionManager,
  TouchableHighlight,
  Text,
  Linking,
  AppState,
} from 'react-native';
import Home_List_Item from './Home_List_Item';
import Trending_List_Item from './Trending_List_Item';
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
      this.LoadData(true);
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
            //表示本地数据库没有数据需要重新获取
            return save();
          } else if (result) {
            this.setState({
              loading: false,
            });
            //表示正常获取到了数据，是本地数据库获取的
            if (data !== this.state.data) {
              this.setState({
                data,
              });
            }
          }
          //用户强制要求获取远程数据并且储存在本地realm数据库
          if (saved) {
            save();
          }
        })
        .then(resp => {
          if (resp && resp.data) {
            this.setState({
              loading: false,
            });
            if (resp.data !== this.state.data) {
              this.setState({
                data: resp.data,
              });
            }
          }
        })
        .catch(err => {
          //请求失败也设置为false
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
  }
  Link(url) {
    Linking.open(url);
  }
  EmptyComponent() {
    return (
      <View
        style={{
          justifyContent: 'center',
        }}>
        <TouchableHighlight
          onPress={() => {
            //重新加载顺序
            this.LoadData(true);
          }}>
          <Text style={styles.emptyLink}>点击刷新</Text>
        </TouchableHighlight>
      </View>
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          ref={ref => {
            this.list = ref;
          }}
          ListEmptyComponent={this.EmptyComponent()}
          style={styles.flatList}
          data={this.state.data}
          refreshing={this.state.loading}
          onRefresh={() => {
            this.LoadData(true);
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
