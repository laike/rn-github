import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import Button from 'react-native-button';
import {SEARCH_TABS, SCREEN_WIDTH} from '../constants/constants';
import Color from 'color';
import {BG_COLOR, TEXT_COLOR} from '../constants/styles';
export default class SearchTabBar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.searchOptions}>
        {SEARCH_TABS.map((item, index) => {
          return (
            <Button key={index} style={styles.option}>
              {item}
            </Button>
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
    width: (SCREEN_WIDTH - 30) / 2,
    backgroundColor: Color(BG_COLOR)
      .darken(0.8)
      .hex(),
    padding: 10,
    fontSize: 14,
    color: Color(TEXT_COLOR)
      .darken(0.5)
      .hex(),
    textAlignVertical: 'center',
  },
});
