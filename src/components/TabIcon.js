/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TEXT_COLOR, BG_COLOR } from '../constants/styles';
import Color from 'color';
const propTypes = {
  focused: PropTypes.bool,
  title: PropTypes.string,
};
const defaultProps = {
  focused: false,
  title: '',
};

const TabIcon = props => {
  let name = '';
  switch (props.title) {
    case '首页':
      name = 'home';
      break;
    case '个人中心':
      name = 'user';
      break;
    case '动态':
      name = 'google-plus-circle';
      break;
    case '趋势':
      name = 'bar-chart-o';
      break;
    default:
      name = 'home';
  }

  return (
    <View style={styles.container}>
      <Icon
        name={name}
        style={[
          styles.icon,
          {
            color: props.focused
              ? TEXT_COLOR
              : `${Color(BG_COLOR)
                .darken(0.1)
                .hex()}`,
          },
        ]}
      />
      <Text
        style={[
          styles.title,
          {
            color: props.focused
              ? TEXT_COLOR
              : `${Color(BG_COLOR)
                .darken(0.1)
                .hex()}`,
          },
        ]}>
        {props.title}
      </Text>
    </View>
  );
};

TabIcon.propTypes = propTypes;
TabIcon.defaultProps = defaultProps;
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  icon: {
    fontSize: 18,
    paddingTop: 5,
    paddingBottom: 5,
  },
  title: {
    fontFamily: 'arial',
  },
});
export default TabIcon;
