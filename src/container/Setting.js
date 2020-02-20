import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import WebView from 'react-native-webview';
export default class Setting extends Component {
  render() {
    return (
      <WebView
        style={styles.container}
        source={{uri: 'https://baidu.com/'}}
        startInLoadingState={true}></WebView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
});
