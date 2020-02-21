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
  Platform,
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
import RepositoryDetail from '../container/RepositoryDetail';
import WebPage from '../container/WebPage';
//测试页面以后很有用，所有新功能开发之前现在测试页面，测试
import TestPage from '../container/TestPage';
import DynamicPage from '../container/DynamicPage';
import SearchFilter from '../components/SearchFilter';
import {BG_COLOR, TEXT_COLOR} from '../constants/styles';
import Color from 'color';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicon from 'react-native-vector-icons/Ionicons';
import CustomIconComponent from '../components/CustomIconComponent';
import CustomNavigation from '../components/CustomNavigation';
const {width} = Dimensions.get('window');

const router = () => (
  <Router
    uriPrefix={'windke.cn'}
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
      <Scene key="Login">
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
            key="MyPage"
            component={My}
            title="个人中心"
            icon={TabIcon}
            hideNavBar
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
            key="dynamicPage"
            component={Setting}
            title="设置"
            icon={TabIcon}
            navBar={() => <CustomNavigation title={'ceshi'} />}
          />
        </Scene>
        <Scene
          key="CustomLanguagePage"
          renderLeftButton={() => (
            <CustomIconComponent
              name="arrow-left"
              onPress={() => {
                Actions.pop();
              }}
            />
          )}>
          <Scene
            title="自定义语言"
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
        </Scene>
        <Scene
          key="RepositoryDetailPage"
          renderLeftButton={() => (
            <CustomIconComponent
              name="arrow-left"
              onPress={() => {
                Actions.pop();
              }}
            />
          )}>
          <Scene
            title="详情页面"
            component={RepositoryDetail}
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
        <Scene
          key="WebPage"
          renderLeftButton={() => (
            <CustomIconComponent
              name="arrow-left"
              onPress={() => {
                Actions.pop();
              }}
            />
          )}>
          <Scene
            title="网页"
            component={WebPage}
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
      <Scene
        key="GitHubLoginPage"
        renderLeftButton={() => (
          <CustomIconComponent
            name="arrow-left"
            onPress={() => {
              Actions.replace('Login');
            }}
          />
        )}>
        <Scene
          title="正在前往GitHub授权页面....."
          component={WebPage}
          titleStyle={{
            color: TEXT_COLOR,
            fontSize: 20,
            textAlign: 'center',
          }}
          navigationBarStyle={{
            backgroundColor: `${Color(BG_COLOR)
              .darken(0.6)
              .hex()}`,
          }}
        />
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
