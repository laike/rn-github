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
import Home from '../container/Home';
import My from '../container/My';
import Setting from '../container/Setting';
import Trending from '../container/Trending';
import TabIcon from '../components/TabIcon';
import SpanlashPage from '../container/SpanlashPage';
import Login from '../container/Login';
import {BG_COLOR, TEXT_COLOR} from '../constants/styles';
import Color from 'color';
const router = () => (
  <Router>
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
      <Scene key="root" hideNavBar={true}>
        <Scene
          key="tabbar"
          initial
          tabs={true}
          tabBarPosition="bottom"
          tabBarStyle={{
            backgroundColor: `${Color(BG_COLOR)
              .darken(0.6)
              .hex()}`,
          }}
          showLabel={false}>
          <Scene
            key="home"
            component={Home}
            title="首页"
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
            key="trending"
            component={Trending}
            title="趋势"
            icon={TabIcon}
            titleStyle={{
              color: TEXT_COLOR,
              fontSize: 20,
            }}
            navigationBarStyle={{
              backgroundColor: BG_COLOR,
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
              backgroundColor: BG_COLOR,
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
              backgroundColor: BG_COLOR,
            }}
          />
        </Scene>
      </Scene>
    </Lightbox>
  </Router>
);

export default router;
