/* eslint-disable react-native/no-inline-styles */
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TEXT_COLOR} from '../constants/styles';
const propTypes = {
  data: PropTypes.object,
};
const defaultProps = {
  data: [],
};
class User_List_Item extends PureComponent {
  render() {
    return (
      <TouchableOpacity style={styles.container}>
        <Image
          source={{uri: this.props.data.avatar_url}}
          style={styles.avatar}
        />
        <Text style={styles.title}>{this.props.data.login}</Text>
      </TouchableOpacity>
    );
  }
}

User_List_Item.propTypes = propTypes;
User_List_Item.defaultProps = defaultProps;
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
export default User_List_Item;
