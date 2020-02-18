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
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Home from '../container/Home';
import My from '../container/My';
import Setting from '../container/Setting';
import TabIcon from '../components/TabIcon';
import SpanlashPage from '../container/SpanlashPage';
import SearchPage from '../container/SearchPage';
import CustomLanguagePage from '../container/CustomLanguagePage';
import TrendingPage from '../container/TrendingPage';
import Login from '../container/Login';
import SearchFilter from '../components/SearchFilter';
import {BG_COLOR, TEXT_COLOR} from '../constants/styles';
import Color from 'color';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicon from 'react-native-vector-icons/Ionicons';
import CustomIconComponent from '../components/CustomIconComponent';
const {width, height} = Dimensions.get('window');
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
            renderRightButton={() => (
              <CustomIconComponent
                name="search"
                onPress={() => {
                  Actions.SearchPage();
                }}
              />
            )}
            navigationBarStyle={{
              backgroundColor: `${Color(BG_COLOR)
                .darken(0.6)
                .hex()}`,
            }}
          />
          <Scene
            key="trending"
            component={TrendingPage}
            title="趋势"
            icon={TabIcon}
            titleStyle={{
              color: TEXT_COLOR,
              fontSize: 20,
            }}
            renderRightButton={() => (
              <CustomIconComponent
                name="bar-chart-o"
                onPress={() => {
                  Actions.CustomLanguagePage();
                }}
              />
            )}
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
        <Stack>
          <Scene
            hide={true}
            modal={true}
            renderLeftButton={() => (
              <CustomIconComponent
                name="arrow-left"
                onPress={() => {
                  Actions.pop();
                }}
              />
            )}
            title="自定义语言"
            key="CustomLanguagePage"
            component={CustomLanguagePage}
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
        </Stack>
        <Drawer
          key="SearchPageDrawer"
          drawerPosition="right"
          contentComponent={SearchFilter}
          hideNavBar
          drawer={false}
          drawerWidth={width / 2}
          drawerIcon={
            <Ionicon
              name={'ios-list'}
              style={{
                color: TEXT_COLOR,
                fontSize: 18,
              }}
            />
          } //先不添加这个功能后面再来添加
          renderLeftButton={() => (
            <CustomIconComponent
              name="arrow-left"
              onPress={() => {
                Actions.pop();
              }}
            />
          )}
          navigationBarStyle={{
            backgroundColor: Color(BG_COLOR)
              .darken(0.6)
              .hex(),
            height: 30,
          }}>
          <Scene
            key="SearchPage"
            component={SearchPage}
            title="搜索"
            titleStyle={{
              color: TEXT_COLOR,
              fontSize: 18,
            }}
          />
        </Drawer>
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
