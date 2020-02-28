import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, StatusBar} from 'react-native';
import {getTheme, changeTheme, changeCodeTheme} from '../untils/theme';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../constants/constants';
import {
  TouchableNativeFeedback,
  ScrollView,
} from 'react-native-gesture-handler';
import {STATUS_BAR_STYLE, CODE_VIEW_STYLES} from '../constants/styles';

const CodeTheme = ({params}) => {
  const [colors, setColors] = useState(getTheme());

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
                changeCodeTheme(CODE_VIEW_STYLES[index]);
              }}>
              {CODE_VIEW_STYLES[index]}
            </Text>
          </TouchableNativeFeedback>
        ))}
      </View>
    </ScrollView>
  );
};
export const LayoutComponent = CodeTheme;

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
