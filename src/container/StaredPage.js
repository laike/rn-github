/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {StyleSheet, StatusBar, View} from 'react-native';
import store from '../stores';

import CommonDetail from '../components/CommonDetail';

const StaredPage = props => {
  return (
    <View style={styles.container}>
      <StatusBar {...STATUS_BAR_STYLE} />
      <CommonDetail url={`users/laike/starred`} component={'myrespositories'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export const LayoutComponent = StaredPage;
