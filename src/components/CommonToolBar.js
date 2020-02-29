import React, {useState, useEffect, useRef} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import Color from 'color';
import {TEXT_COLOR} from '../constants/styles';
import store from '../stores';
import {SCREEN_WIDTH} from '../constants/constants';
import {
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native-gesture-handler';

const CommonToolBar = ({data = {}, ...rest}) => {
  const [items, setItems] = useState(data);
  useEffect(() => {
    setItems(data);
  }, [data]);
  function renderItem(info, index) {
    return Platform.OS === 'android' ? (
      <View key={index} style={styles.subitem}>
        <TouchableNativeFeedback>
          <Text
            style={styles.num}
            onPress={() => {
              info.callback && info.callback();
            }}>
            {info.data}
          </Text>
          <Text
            style={styles.info}
            onPress={() => {
              info.callback && info.callback();
            }}>
            {info.label}
          </Text>
        </TouchableNativeFeedback>
      </View>
    ) : (
      <View style={styles.subitem} key={index}>
        <TouchableOpacity
          onPress={() => {
            info.callback && info.callback();
          }}>
          <View>
            <Text style={styles.num}>{info.data}</Text>
            <Text style={styles.info}>{info.label}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={styles.toolbar}>
      {items.map((info, index) => renderItem(info, index))}
    </View>
  );
};

export default CommonToolBar;
const styles = StyleSheet.create({
  subitem: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
  },
  num: {fontSize: 14, textAlign: 'center'},
  info: {
    fontSize: 18,
    textAlign: 'center',
  },
  toolbar: {
    flexDirection: 'row',
    backgroundColor: TEXT_COLOR,
  },
});
