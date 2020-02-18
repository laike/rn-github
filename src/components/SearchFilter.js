/* eslint-disable react-native/no-inline-styles */
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  SectionList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TEXT_COLOR} from '../constants/styles';
const propTypes = {};
const defaultProps = {};
const keys = require('../data/keys.json');
class SearchFilter extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <SectionList data={keys} />
        <Text style={{color: 'red', paddingTop: 130}}>this is filter </Text>
      </View>
    );
  }
}

SearchFilter.propTypes = propTypes;
SearchFilter.defaultProps = defaultProps;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 10,
    shadowOffset: {x: 4, y: 4},
    shadowColor: '#dddddd',
    shadowRadius: 2,
    shadowOpacity: 0.2,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    elevation: 4,
    backgroundColor: TEXT_COLOR,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
  },

  avatar: {
    width: 30,
    height: 30,
    marginLeft: 5,
  },
});
export default SearchFilter;
