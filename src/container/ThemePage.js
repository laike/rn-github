import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {getTheme, changeTheme} from '../untils/theme';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../constants/constants';
import {
  TouchableNativeFeedback,
  ScrollView,
} from 'react-native-gesture-handler';

const ThemePage = ({params}) => {
  const [colors, setColors] = useState(getTheme());
  const [current, setCurrent] = useState(colors[0]);

  return (
    <ScrollView>
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
export default ThemePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  color: {
    width: SCREEN_WIDTH / 5,
    height: SCREEN_WIDTH / 5,
    margin: 10,
  },
  colorText: {
    fontSize: 12,
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
