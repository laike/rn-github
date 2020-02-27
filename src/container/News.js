import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Image,
  Platform,
} from 'react-native';
import {MAIN_COLOR, TEXT_COLOR} from '../constants/styles';
import CommonDetail from '../components/CommonDetail';
import store from '../stores';
export default class News extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <CommonDetail
          url={
            this.props.url
              ? this.props.url
              : 'https://api.github.com/users/laike/received_events'
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: TEXT_COLOR,
    flex: 1,
  },
});
