/**
 * 用于展示 source js rb python java c c++ eg
 */
import React, {useState, useContext, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {SCREEN_WIDTH, SCREEN_HEIGHT} from '../constants/constants';
import CommonDetail from '../components/CommonDetail';

const CodeFile = ({url, theme}) => {
  return (
    <View style={styles.container}>
      <CommonDetail
        url={url ? url : ``}
        theme={theme}
        component={'code'}
        initial={''}
      />
    </View>
  );
};

export const LayoutComponent = CodeFile;
export function mapStateToProps(state, props) {
  return {
    theme: state.theme,
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  code: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
});
