import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import TouchFeedbackItem from './TouchFeedbackItem';
import {Actions} from 'react-native-router-flux';
const Repos_Commit_List_Item = ({data}) => {
  return (
    <View style={styles.container}>
      <TouchFeedbackItem
        title={data.commit.author.name}
        updated_at={data.commit.committer.date}
        des={data.commit.message}
        name={'github-alt'}
        onPress={() => {}}
      />
    </View>
  );
};

export default Repos_Commit_List_Item;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
