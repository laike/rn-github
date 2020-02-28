import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, StatusBar} from 'react-native';
import {getTheme, changeTheme} from '../untils/theme';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../constants/constants';
import {
  TouchableNativeFeedback,
  ScrollView,
} from 'react-native-gesture-handler';
import {STATUS_BAR_STYLE} from '../constants/styles';

const ThemePage = ({params}) => {
  const [colors, setColors] = useState(getTheme());
  const [current, setCurrent] = useState(colors[0]);

  return (
    <ScrollView>
      <StatusBar {...STATUS_BAR_STYLE} />
      <View style={styles.container}>
        {colors.map((color, index) => (
          <TouchableNativeFeedback
            key={index}
            style={[styles.color, {backgroundColor: color}]}>
            <Text
              style={styles.colorText}
              onPress={() => {
                changeTheme(color);
              }}>
              Theme {index}
            </Text>
          </TouchableNativeFeedback>
        ))}
      </View>
    </ScrollView>
  );
};
export const LayoutComponent = ThemePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  color: {
    width: SCREEN_WIDTH / 4 - 10,
    height: SCREEN_WIDTH / 4 - 10,
    margin: 5,
  },
  colorText: {
    fontSize: 12,
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
