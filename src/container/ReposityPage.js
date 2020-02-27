/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {StyleSheet, StatusBar, View} from 'react-native';

import {STATUS_BAR_STYLE, TEXT_COLOR} from '../constants/styles';
import CommonDetail from '../components/CommonDetail';
import store from '../stores';

const ReposityPage = ({url}) => {
  //这里我们需要获取用户的基本信息
  return (
    <View style={styles.container}>
      <StatusBar {...STATUS_BAR_STYLE} />
      <CommonDetail url={url} component={'myrespositories'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ReposityPage;
