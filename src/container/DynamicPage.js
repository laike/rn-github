/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {StyleSheet, StatusBar, View} from 'react-native';
import {bindActionCreators} from 'redux';
import userActions from '../actions/user';
import {connect} from 'react-redux';
import {STATUS_BAR_STYLE, BG_COLOR, TEXT_COLOR} from '../constants/styles';
import ScrollableTabView, {
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view';
import {Text} from 'react-native';
import ScrollViewContainer from '../components/ScrollViewContainer';
import Color from 'color';
const keys = require('../data/keys.json');
const Item = props => <Text>{props}</Text>;
@connect(
  state => ({
    state,
  }),
  dispatch => ({
    user: bindActionCreators(userActions, dispatch),
  }),
)
class DynamicPage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar {...STATUS_BAR_STYLE} />
        <ScrollViewContainer
          type="events"
          action={this.props.user.getUserDynamic('events')}
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
