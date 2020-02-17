/* eslint-disable react-native/no-inline-styles */
import React from 'react';
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
const Trending_List_Item = props => {
  return (
    <TouchableOpacity style={styles.container}>
      <View>
        <Text style={styles.title}>{props.data.name}</Text>
      </View>
      <View style={styles.p}>
        <Text>{props.data.description}</Text>
      </View>
      <View style={styles.bottom}>
        <View style={styles.owner}>
          <Text>{props.data.author}</Text>
          {props.data.builtBy.map((user, index) => (
            <Image
              key={index}
              source={{uri: user.avatar}}
              style={styles.avatar}
            />
          ))}
        </View>
        <View style={styles.stars}>
          <Icon name="star" onPress={() => {}} style={styles.icon} />
          <Text style={styles.text}>{props.data.stars}</Text>
        </View>
        <View style={styles.forks}>
          <Icon name="git" onPress={() => {}} style={styles.icon} />
          <Text style={styles.text}>{props.data.forks}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

Trending_List_Item.propTypes = propTypes;
Trending_List_Item.defaultProps = defaultProps;
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
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
  },
  p: {
    padding: 10,
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  owner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    flex: 1,
    overflow: 'hidden',
  },
  login: {},
  avatar: {
    width: 20,
    height: 20,
    marginLeft: 2,
  },
  stars: {
    width: 80,
    flexDirection: 'row',
    alignItems: 'center',
  },
  forks: {
    width: 80,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 18,
  },
  text: {
    paddingLeft: 5,
  },
});
export default Trending_List_Item;
