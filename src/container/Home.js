/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {StyleSheet, StatusBar, Dimensions, View} from 'react-native';

import {STATUS_BAR_STYLE, BG_COLOR, TEXT_COLOR} from '../constants/styles';
import ScrollableTabView, {
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view';
import ScrollViewContainer from '../components/ScrollViewContainer';
import Color from 'color';
const keys = require('../data/keys.json');
const {width, height} = Dimensions.get('window');

class Home extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar {...STATUS_BAR_STYLE} />
        {/*这里暂时不封装scrollview，后面真个项目功能基本完善以后再来做代码重构。 */}
        <ScrollableTabView
          ref={ref => {
            this.scrollTabs = ref;
          }}
          renderTabBar={() => <ScrollableTabBar />}
          tabBarUnderlineStyle={{
            borderWidth: 0.3,
            borderColor: TEXT_COLOR,
          }}
          tabBarBackgroundColor={Color(BG_COLOR)
            .darken(0.6)
            .hex()}
          tabBarActiveTextColor={TEXT_COLOR}
          tabBarInactiveTextColor={Color(BG_COLOR)
            .darken(0.1)
            .hex()}>
          {keys.map((item, key) => (
            <ScrollViewContainer key={key} tabLabel={item.name} />
          ))}
        </ScrollableTabView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Home;
