import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import TouchFeedbackItem from './TouchFeedbackItem';
import {Actions} from 'react-native-router-flux';

const Source_Branch_List_Item = ({data, full_name}) => {
  function onPress() {
    console.log('full_name : ', full_name);
    Actions.push('SourcePage', {
      title: `${data.name}`,
      full_name: full_name,
      url: `repos/${full_name}/contents?ref=${data.name}`,
    });
  }

  return (
    <View style={styles.container}>
      <TouchFeedbackItem
        title={data.name}
        name={'code-fork'}
        onPress={onPress}
      />
    </View>
  );
};

export default Source_Branch_List_Item;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
