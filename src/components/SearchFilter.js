/* eslint-disable react-native/no-inline-styles */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  SectionList,
  RecyclerViewBackedScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TEXT_COLOR, BG_COLOR } from '../constants/styles';
import { FlatList, TouchableHighlight, TouchableNativeFeedback } from 'react-native-gesture-handler';
import Color from 'color';
import { Platform } from 'react-native';
const propTypes = {};
const defaultProps = {};
const keys = require('../data/keys.json');
class SearchFilter extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.list}
          data={keys}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={() => {
            return (
              <View style={styles.title}>
                <Text style={[styles.center]}>语言</Text>
              </View>
            );
          }}
          renderItem={(data) => {

            return (
              Platform.OS === 'android' ? <TouchableNativeFeedback style={[styles.item, styles.current]}>
                <Text style={[styles.center]}>{data.item.name}</Text>
              </TouchableNativeFeedback> : <TouchableHighlight style={styles.item}>
                  <Text style={[styles.center]}>{data.item.name}</Text>
                </TouchableHighlight>
            )
          }} />
        <FlatList
          style={styles.list}
          data={[{
            name: 'star'
          }, { name: 'fork' },
          {
            name: 'update'
          }]}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={() => {
            return (
              <View style={styles.title}>
                <Text style={[styles.center]}>类型</Text>
              </View>
            );
          }}
          renderItem={(data) => {

            return (
              Platform.OS === 'android' ? <TouchableNativeFeedback style={[styles.item, styles.current]}>
                <Text style={[styles.center]}>{data.item.name}</Text>
              </TouchableNativeFeedback> : <TouchableHighlight style={styles.item}>
                  <Text style={[styles.center]}>{data.item.name}</Text>
                </TouchableHighlight>
            )
          }} />
        <FlatList
          style={styles.list}
          data={[{
            name: 'ASC'
          },
          { name: 'DSC' },
          ]}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={() => {
            return (
              <View style={styles.title}>
                <Text style={[styles.center]}>排序</Text>
              </View>
            );
          }}
          renderItem={(data) => {

            return (
              Platform.OS === 'android' ? <TouchableNativeFeedback style={[styles.item, styles.current]}>
                <Text style={[styles.center]}>{data.item.name}</Text>
              </TouchableNativeFeedback> : <TouchableHighlight style={styles.item}>
                  <Text style={[styles.center]}>{data.item.name}</Text>
                </TouchableHighlight>
            )
          }} />


      </View>
    );
  }
}

SearchFilter.propTypes = propTypes;
SearchFilter.defaultProps = defaultProps;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color(BG_COLOR).darken(0.6).hex(),
  },
  list: {

  },
  current: {
    backgroundColor: 'rgba(0,0,0,0.2)'
  },
  item: {
    padding: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,

  },
  center: {
    textAlign: "center",
    color: TEXT_COLOR
  }

});
export default SearchFilter;
