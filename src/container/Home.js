import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
//暂时不用这个等理清了再来用这个
import {bindActionCreators} from 'redux';
import actions from '../actions/test';
import {TEST_ACTION} from '../constants/types';

@connect(
  state => ({
    state,
  }),
  dispatch => ({
    test: () => dispatch(actions.testAction),
    dispatch,
  }),
)
class Home extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}
  render() {
    return (
      <View style={styles}>
        <Text
          onPress={() => {
            this.props.dispatch({type: TEST_ACTION, payload: {msg: 'ok'}});
          }}>
          this is Home Page{' '}
        </Text>
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
