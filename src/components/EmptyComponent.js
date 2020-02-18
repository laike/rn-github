/* eslint-disable react-native/no-inline-styles */
import React, {PureComponent} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
const propTypes = {};
const defaultProps = {};
class EmptyComponent extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require('../data/images/empty-result.png')}
        />
        <Text style={styles.notFound}>没有找到相关内容，请刷新试试！</Text>
      </View>
    );
  }
}

EmptyComponent.propTypes = propTypes;
EmptyComponent.defaultProps = defaultProps;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 200,
  },
  notFound: {
    fontSize: 14,
    lineHeight: 30,
    margin: 10,
    textAlign: 'center',
  },
});
export default EmptyComponent;
