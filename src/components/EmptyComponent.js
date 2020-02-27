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
        <Text style={styles.notFound}>
          没有找到相关内容或者重新下拉刷新试试！
        </Text>
        {/* 这里新增一个功能，用于动态和趋势页面等新增一个连接给用户刷新*/}
        {this.props.button ? (
          <Text
            style={styles.retry}
            onPress={() => {
              this.props.load();
            }}>
            点击重新加载
          </Text>
        ) : (
          <View />
        )}
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
    marginTop: 15,
  },
  retry: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
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
