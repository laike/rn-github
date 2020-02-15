import React, {Component} from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import {connect} from 'react-redux';
//暂时不用这个等理清了再来用这个
import {bindActionCreators} from 'redux';
import responsitoryActions from '../actions/reponsitory';
import {STATUS_BAR_STYLE} from '../constants/styles';

@connect(
  state => ({
    state,
  }),
  dispatch => ({
    responsitories: bindActionCreators(responsitoryActions, dispatch),
    dispatch,
  }),
)
class Home extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.responsitories.searchReponsitories('demo');
  }
  render() {
    return (
      <View style={styles}>
        <StatusBar {...STATUS_BAR_STYLE} backgroundColor="red" />
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
