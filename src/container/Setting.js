import React, {Component} from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import WebView from 'react-native-webview';
import {STATUS_BAR_STYLE} from '../constants/styles';
export default class Setting extends Component {
  render() {
    return (
      <View style={styles.setting}>
        <StatusBar {...STATUS_BAR_STYLE} />
        <View style={styles.header}>
          <Text>头部</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
});
