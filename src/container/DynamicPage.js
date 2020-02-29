/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {StyleSheet, StatusBar, View} from 'react-native';

import {STATUS_BAR_STYLE} from '../constants/styles';

import ScrollViewContainer from '../components/ScrollViewContainer';

import {DeviceEventEmitter} from 'react-native';
import {RESTART_TO_CHANGE_THEM} from '../constants/constants';

const keys = require('../data/keys.json');

class DynamicPage extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    DeviceEventEmitter.addListener(RESTART_TO_CHANGE_THEM, () => {
      //这里进行处理
    });
  }
  componentWillUnmount() {
    DeviceEventEmitter.removeListener(RESTART_TO_CHANGE_THEM);
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar {...STATUS_BAR_STYLE} />
        <ScrollViewContainer {...this.props} type="dynamic" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export const LayoutComponent = DynamicPage;
export function mapStateToProps(state, props) {
  return {
    dynamic: state.dynamic,
  };
}
