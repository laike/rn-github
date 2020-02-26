import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import CommonDetail from '../components/CommonDetail';
//这个是通用页面主要是用于加载各种forkers watchers 等
const CommonPage = ({url, title, component}) => {
  return (
    <View style={styles.container}>
      <CommonDetail url={url} title={title} component={component} />
    </View>
  );
};

export default CommonPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
