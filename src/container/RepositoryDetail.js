import React, {PureComponent} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {bindActionCreators} from 'redux';
import responsitoryActions from '../actions/reponsitories';
import {connect} from 'react-redux';
import WebViewComponent from '../components/WebViewComponent';
import {SCREEN_WIDTH} from '../constants/constants';
import HtmlViewComponent from '../components/HtmlViewComponent';

import {doActionsRequest} from '../untils/untils';
@connect(
  state => ({
    state,
  }),
  dispatch => ({
    responsitories: bindActionCreators(responsitoryActions, dispatch),
  }),
)
class RepositoryDetail extends PureComponent {
  constructor(props) {
    super(props);
    //设置一个state 用来保存 readme数据，动态数据，源码数据，issues数据
    this.state = {
      readmeData: '',
      dynamicData: [],
      sourceData: [],
      issuesData: [],
    };
  }
  loadReadMeData() {
    doActionsRequest(
      this.props.responsitories.getReadme(this.props.data.full_name, 'master'),
      data => {
        this.setState({
          readmeData: data,
        });
      },
    )();
  }
  componentDidMount() {
    //加载ReadMeData
    this.loadReadMeData();
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <HtmlViewComponent html={this.state.readmeData} />
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: SCREEN_WIDTH,
  },
});
export default RepositoryDetail;
