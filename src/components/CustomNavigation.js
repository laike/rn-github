/* eslint-disable react-native/no-inline-styles */
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {BG_COLOR, TEXT_COLOR} from '../constants/styles';
import Color from 'color';
const styles = StyleSheet.create({
  container: {
    height: Platform.OS === 'ios' ? 64 : 54,
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    flex: 1,
  },
  text: {
    textAlign: 'center',
    color: TEXT_COLOR,
    fontSize: 20,
  },
});

export default class CustomNavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  _renderLeft() {
    return (
      <View style={styles.left}>
        {this.props.renderLeft ? (
          this.props.renderLeft()
        ) : (
          <TouchableOpacity
            onPress={Actions.pop}
            style={[styles.navBarItem, {paddingLeft: 10}]}>
            <Icon
              name="arrow-left"
              style={[
                this.props.renderLeftStyle
                  ? this.props.renderLeftStyle
                  : styles.icon,
                {color: TEXT_COLOR, fontSize: 16},
              ]}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  }

  _renderMiddle() {
    return (
      <View style={styles.title}>
        <Text style={styles.text}>{this.props.title}</Text>
      </View>
    );
  }

  _renderRight() {
    return (
      <View
        style={[
          styles.navBarItem,
          {flexDirection: 'row', justifyContent: 'flex-end'},
        ]}>
        <TouchableOpacity
          onPress={() => console.log('Search')}
          style={{paddingRight: 10}}>
          <Icon name={'search'} style={{color: TEXT_COLOR, fontSize: 16}} />
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: Color(BG_COLOR)
              .darken(0.6)
              .hex(),
          },
        ]}>
        {this._renderLeft()}
        {this._renderMiddle()}
        {this._renderRight()}
      </View>
    );
  }
}
