/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {StyleSheet, StatusBar, View} from 'react-native';
import {bindActionCreators} from 'redux';
import userActions from '../actions/user';
import {connect} from 'react-redux';
import {STATUS_BAR_STYLE} from '../constants/styles';
import {Text} from 'react-native';
import ScrollViewContainer from '../components/ScrollViewContainer';
import themeActions from '../actions/theme';
import {DeviceEventEmitter} from 'react-native';
import {RESTART_TO_CHANGE_THEM} from '../constants/constants';

const keys = require('../data/keys.json');

const Item = props => <Text>{props}</Text>;

@connect(
  state => ({
    state,
  }),
  dispatch => ({
    user: bindActionCreators(userActions, dispatch),
    theme: bindActionCreators(themeActions, dispatch),
  }),
)
class DynamicPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    };
  }
  componentDidMount() {
    DeviceEventEmitter.addListener(RESTART_TO_CHANGE_THEM, () => {
      //这里进行处理
    });
  }
  componentWillUnmount() {
    DeviceEventEmitter.removeListener(RESTART_TO_CHANGE_THEM);
  }
  addPage(page) {
    console.log(page);
    this.setState({
      page: page,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar {...STATUS_BAR_STYLE} />
        <ScrollViewContainer
          type="events"
          addPage={this.addPage.bind(this)}
          page={this.state.page}
          action={this.props.user.getUserDynamic('events', {
            page: this.state.page,
            per_page: 20,
          })}
        />
        {/* <CommonDetail
          url={this.props.url ? this.props.url : 'events'}
          component="dynamic"
        /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default DynamicPage;
