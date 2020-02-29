import React, {Component, useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';
import Spinner from './Spinner';
import {SCREEN_WIDTH, SCREEN_HEIGHT} from '../../constants/constants';

const loadingWidth = SCREEN_WIDTH * 0.6;

const Loading = ({show = false, style, ...rest}) => {
  const [fadeIn, setFadeIn] = useState(new Animated.Value(0.4));
  if (!show) {
    return <View />;
  } else {
    return (
      <Animated.View style={[styles.container, style, {opacity: fadeIn}]}>
        <Spinner />
      </Animated.View>
    );
  }
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    width: loadingWidth,
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.8)',
    left: (SCREEN_WIDTH - loadingWidth) / 2,
    height: (SCREEN_HEIGHT - 60) / 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 20,
  },
});
