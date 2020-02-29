/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {WHITE_COLOR, BLACK_COLOR} from '../constants/styles';
const propTypes = {};
const defaultProps = {};
class CustomIconComponent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <TouchableOpacity
        style={styles.left}
        onPress={() => {
          this.props.onPress();
        }}>
        <Icon style={styles.icon} name={this.props.name} />
      </TouchableOpacity>
    );
  }
}

CustomIconComponent.propTypes = propTypes;
CustomIconComponent.defaultProps = defaultProps;
const styles = StyleSheet.create({
  icon: {color: BLACK_COLOR, marginRight: 15, fontSize: 16},
  left: {
    paddingLeft: 10,
  },
});
export default CustomIconComponent;
