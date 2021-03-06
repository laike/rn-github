/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {SCREEN_WIDTH} from '../constants/constants';
import Color from 'color';
import {TEXT_COLOR, BG_COLOR} from '../constants/styles';
import store from '../stores';
export default class SearchTabBar extends Component {
  constructor(props) {
    super(props);
  }
  onPress() {
    this.props.goToPage(index);
  }
  render() {
    return (
      <View style={[this.props.style, styles.searchOptions]}>
        {this.props.tabs.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={[styles.option, index === 0 ? styles.borderRight : {}]}
              onPress={this.onPress.bind(this)}>
              <Text
                style={[
                  styles.text,
                  {
                    color:
                      this.props.activeTab === index
                        ? TEXT_COLOR
                        : Color(TEXT_COLOR)
                            .darken(0.3)
                            .hex(),
                  },
                ]}>
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchOptions: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  option: {
    width: (SCREEN_WIDTH - 10) / 2,
    backgroundColor: BG_COLOR,
    padding: 15,
    fontSize: 14,
  },
  text: {
    color: Color(TEXT_COLOR)
      .darken(0.5)
      .hex(),
    textAlign: 'center',
  },
  borderRight: {
    borderRightColor: Color(TEXT_COLOR)
      .darken(0.7)
      .hex(),
    borderRightWidth: 0.3,
  },
});
