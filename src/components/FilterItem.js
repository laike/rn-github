import React from 'react';
import {Text, Platform, StyleSheet, DeviceEventEmitter} from 'react-native';
import {
  TouchableHighlight,
  TouchableNativeFeedback,
} from 'react-native-gesture-handler';
import Color from 'color';
import {TEXT_COLOR, BG_COLOR} from '../constants/styles';
import store from '../stores';
import {SEACH_FILTERS} from '../constants/constants';

const FilterItem = ({data}) => {
  return Platform.OS === 'android' ? (
    <TouchableNativeFeedback style={[styles.item, styles.current]}>
      <Text
        style={[styles.center]}
        onPress={() => {
          DeviceEventEmitter.emit(SEACH_FILTERS, {
            language: data.name,
          });
        }}>
        {data.name}
      </Text>
    </TouchableNativeFeedback>
  ) : (
    <TouchableHighlight rest style={styles.item}>
      <Text style={[styles.center]}>{data.name}</Text>
    </TouchableHighlight>
  );
};

export default FilterItem;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
  list: {},
  current: {
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  item: {},
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
  },
  center: {
    textAlign: 'center',
    color: TEXT_COLOR,
    padding: 15,
  },
});
