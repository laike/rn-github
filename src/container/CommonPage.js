import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import CommonDetail from '../components/CommonDetail';
//这个是通用页面主要是用于加载各种forkers watchers 等
const CommonPage = ({url, title, component, full_name, readhistory}) => {
  return (
    <View style={styles.container}>
      <CommonDetail
        url={url}
        title={title}
        component={component}
        full_name={full_name}
        readhistory={readhistory}
      />
    </View>
  );
};

export const LayoutComponent = CommonPage;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
