import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import actions from '../actions/test';
import {TEST_ACTION} from '../constants/types';

@connect(
  state => ({
    state,
  }),
  dispatch => ({
    actions: bindActionCreators(actions, dispatch),
  }),
)
class Home extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    actions.testAction({msg: 'ok'});
  }
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

export default Home;
