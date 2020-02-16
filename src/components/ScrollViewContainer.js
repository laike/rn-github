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
} from 'react-native';
import Home_List_Item from './Home_List_Item';
import {connect} from 'react-redux';
import _ from 'lodash';
//暂时不用这个等理清了再来用这个
import {bindActionCreators} from 'redux';
import responsitoryActions from '../actions/reponsitories';
const propTypes = {
  tabLabel: PropTypes.string,
};
const defaultProps = {
  tabLabel: '',
};
@connect(
  state => ({
    state,
  }),
  dispatch => ({
    responsitories: bindActionCreators(responsitoryActions, dispatch),
  }),
)
class ScrollViewContainer extends PureComponent {
  constructor(props) {
    super(props);
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
    InteractionManager.runAfterInteractions(() => {
      //开始请求
      this.setState({loading: true});
      this.request = this.props.responsitories
        .searchReponsitories(this.props.tabLabel, {})
        .then(({value}) => {
          const {data, save, result} = value;
          if (!result) {
            //表示本地数据库没有数据需要重新获取
            return save();
          } else if (result) {
            //表示正常获取到了数据，是本地数据库获取的
            if (data !== this.state.data) {
              this.setState({
                data,
                loading: false,
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
            if (resp.data !== this.state.data) {
              this.setState({
                data: resp.data,
                loading: false,
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
  }
  Link(url) {
    Linking.open(url);
  }
  EmptyComponent() {
    return (
      <View>
        <TouchableHighlight
          onPress={() => {
            //重新加载顺序
            InteractionManager.runAfterInteractions(() => {
              this.LoadData(true);
            });
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
          data={this.state.data.items}
          refreshing={this.state.loading}
          onRefresh={() => {
            this.LoadData(true);
          }}
          onEndReachedThreshold={0.1}
          keyExtractor={(item, index) => index.toString()}
          renderItem={data => {
            return <Home_List_Item data={data.item} />;
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
    flex: 1,
  },
  flatList: {},
});
export default ScrollViewContainer;
