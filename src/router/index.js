/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Scene,
  Router,
  Actions,
  ActionConst,
  Overlay,
  Tabs,
  Modal,
  Drawer,
  Stack,
  Lightbox,
} from 'react-native-router-flux';
import {Text, View, StyleSheet} from 'react-native';
import Home from '../container/Home';
import My from '../container/My';
import Setting from '../container/Setting';
import Trending from '../container/Trending';
import TabIcon from '../components/TabIcon';
import SpanlashPage from '../container/SpanlashPage';
import Login from '../container/Login';
import {BG_COLOR, TEXT_COLOR} from '../constants/styles';
import Color from 'color';
import Icon from 'react-native-vector-icons/FontAwesome';
const renderRightButton = props => {
  return (
    <View>
      <Icon
        style={{color: TEXT_COLOR, marginRight: 15, fontSize: 16}}
        name="search"
      />
    </View>
  );
};
const router = () => (
  <Router
    getSceneStyle={() => {
      return styles.navigationBarStyle;
    }}>
    <Lightbox key="lightbox">
      <Scene key="main">
        <Scene
          key="SpanlashPage"
          component={SpanlashPage}
          hideNavBar
          hideTabBar
          hide
        />
      </Scene>
      <Scene key="login">
        <Scene key="loginPage" component={Login} hideNavBar hideTabBar hide />
      </Scene>
      <Scene
        key="root"
        navigationBarStyle={{
          backgroundColor: Color(BG_COLOR)
            .darken(0.6)
            .hex(),
          height: 30,
        }}
        hideNavBar>
        <Scene
          key="tabbar"
          tabs
          lazy
          wrap={true}
          showLabel={false}
          tabBarPosition="bottom"
          tabBarStyle={{
            backgroundColor: `${Color(BG_COLOR)
              .darken(0.6)
              .hex()}`,
            height: 44,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Scene
            key="home"
            component={Home}
            title="首页"
            icon={TabIcon}
            titleStyle={{
              color: TEXT_COLOR,
              fontSize: 18,
            }}
            renderRightButton={renderRightButton}
            navigationBarStyle={{
              backgroundColor: `${Color(BG_COLOR)
                .darken(0.6)
                .hex()}`,
            }}
          />
          <Scene
            key="trending"
            component={Trending}
            title="趋势"
            icon={TabIcon}
            titleStyle={{
              color: TEXT_COLOR,
              fontSize: 20,
            }}
            navigationBarStyle={{
              backgroundColor: `${Color(BG_COLOR)
                .darken(0.6)
                .hex()}`,
            }}
          />
          <Scene
            key="my"
            component={My}
            title="个人中心"
            icon={TabIcon}
            titleStyle={{
              color: TEXT_COLOR,
              fontSize: 20,
            }}
            navigationBarStyle={{
              backgroundColor: `${Color(BG_COLOR)
                .darken(0.6)
                .hex()}`,
            }}
          />

          <Scene
            key="setting"
            component={Setting}
            title="设置"
            icon={TabIcon}
            titleStyle={{
              color: TEXT_COLOR,
              fontSize: 20,
            }}
            navigationBarStyle={{
              backgroundColor: `${Color(BG_COLOR)
                .darken(0.6)
                .hex()}`,
            }}
          />
        </Scene>
      </Scene>
    </Lightbox>
  </Router>
);

const styles = StyleSheet.create({
  navigationBarStyle: {
    flex: 1,
    backgroundColor: TEXT_COLOR,
    shadowColor: null,
    shadowOffset: null,
    shadowOpacity: null,
    shadowRadius: null,
  },
});
export default router;
