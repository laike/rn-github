import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
export default class TrendList extends Component {
  render() {
    return (
      <View style={styles}>
        <Text>this is Home Page </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: 'red',
  },
});
