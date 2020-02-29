import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import TouchFeedbackItem from './TouchFeedbackItem';
import {Actions} from 'react-native-router-flux';
import parseUrl from 'url-parse';
import QS from 'qs';

const Branches_LIst_Item = ({data}) => {
  let path = parseUrl(data.commit.url).pathname;

  return (
    <View style={styles.container}>
      <TouchFeedbackItem
        title={data.name}
        name={'code-fork'}
        onPress={() => {
          Actions.push('CommonPage', {
            title: 'Commits',
            url: `${path
              .replace(/(commits\/.*)/gi, 'commits')
              .replace(/^\//, '')}`,
            component: 'reposcommits',
          });
        }}
      />
    </View>
  );
};

export default Branches_LIst_Item;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
