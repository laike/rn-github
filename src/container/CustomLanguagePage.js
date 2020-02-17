/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, StyleSheet, FlatList, InteractionManager} from 'react-native';
import languageActions from '../actions/language';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
//引入checkbox
import CheckBox from 'react-native-check-box';
//引入本地key.json
const keys = require('../data/keys.json');
const propTypes = {};
const defaultProps = {};
@connect(
  state => ({
    state,
  }),
  dispatch => ({
    language: bindActionCreators(languageActions, dispatch),
  }),
)
class CustomLanguagePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  getLang(saved = false) {
    InteractionManager.runAfterInteractions(() => {
      this.props.language
        .getLanguages('languages', keys)
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
  componentDidMount() {
    //组件加载
    this.getLang();
  }
  componentWillUnmount() {
    //组件卸载
  }
  onClick() {
    //code
  }
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          ref={ref => {
            this.list = ref;
          }}
          data={this.state.data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={data => {
            return (
              <View style={styles.listItem}>
                <CheckBox
                  key
                  isChecked={data.item.checked}
                  leftText={data.item.name}
                  style={styles.checkbox}
                  onClick={() => {
                    this.onClick();
                  }}
                />
              </View>
            );
          }}
        />
      </View>
    );
  }
}

CustomLanguagePage.propTypes = propTypes;
CustomLanguagePage.defaultProps = defaultProps;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  checkbox: {
    padding: 10,
    alignItems: 'center',
    borderBottomWidth: 0.3,
    borderBottomColor: '#333',
  },
  listItem: {},
});
export default CustomLanguagePage;
