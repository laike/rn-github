import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Actions} from 'react-native-router-flux';
//这个启动页我们后面再来处理
export default class SpanlashPage extends Component {
  componentDidMount() {
    setTimeout(() => {
      Actions.reset('root');
    }, 2100);
  }
  render() {
    return (
      <View style={styles}>
        <Text>this is SpanlashPage Page </Text>
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
