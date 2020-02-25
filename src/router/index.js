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
import RssPage from '../container/RssPage'
import { BG_COLOR, TEXT_COLOR } from '../constants/styles';
import Color from 'color';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicon from 'react-native-vector-icons/Ionicons';
import CustomIconComponent from '../components/CustomIconComponent';
import CustomNavigation from '../components/CustomNavigation';
import Profile from '../container/Profile';
import Notifictions from '../container/Notifictions';
import News from '../container/News';
import Issues from '../container/Issues';
import Rss from '../container/Rss';
import OwnedRepository from '../container/OwnedRepositoryPage';
import ShowCode from '../container/ShowCode';
import ReposityPage from '../container/ReposityPage';
import StaredPage from '../container/StaredPage';
import AboutAuthor from '../container/AboutAuthor';
import FeedBack from '../container/FeedBack'
import SourcePage from '../container/SourcePage';
import Pictures from '../container/Pictures'
import CodeFile from '../container/CodeFile'
const { width } = Dimensions.get('window');

const router = () => (
  <Router
    uriPrefix={Platform.OS == 'android' ? 'windke://windke/' : 'windke://'}
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
            key="DynamicPage"
            component={DynamicPage}
            title="动态"
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
            key="SettingPage"
            component={Setting}
            title="个人中心"
            icon={TabIcon}
            navBar={() => <CustomNavigation renderLeft={() => <View />} title={'个人中心'} onPress={() => {
              Actions.SearchPage({})
            }} />}
          />

        </Scene>
        <Scene
          key="ReposityPage"
          renderLeftButton={() => (
            <CustomIconComponent
              name="arrow-left"
              onPress={() => {
                Actions.pop();
              }}
            />
          )}>
          <Scene
            component={ReposityPage}
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
          key="StaredPage"
          renderLeftButton={() => (
            <CustomIconComponent
              name="arrow-left"
              onPress={() => {
                Actions.pop();
              }}
            />
          )}>
          <Scene
            component={StaredPage}
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
          key="SourcePage"
          wrap
          renderLeftButton={() => (
            <CustomIconComponent
              name="arrow-left"
              onPress={() => {
                Actions.pop();
              }}
            />
          )}>
          <Scene
            component={SourcePage}
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
          key="TrendingPage"
          renderLeftButton={() => (
            <CustomIconComponent
              name="arrow-left"
              onPress={() => {
                Actions.pop();
              }}
            />
          )}>
          <Scene
            component={TrendingPage}
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
        </Scene>
        <Scene
          key="ShowCodePage"
          renderLeftButton={() => (
            <CustomIconComponent
              name="arrow-left"
              onPress={() => {
                Actions.pop();
              }}
            />
          )}>
          <Scene
            title=""
            component={ShowCode}
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
          key="CodeFilePage"
          renderLeftButton={() => (
            <CustomIconComponent
              name="arrow-left"
              onPress={() => {
                Actions.pop();
              }}
            />
          )}>
          <Scene
            title=""
            component={CodeFile}
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
          key="PicturesPage"
          renderLeftButton={() => (
            <CustomIconComponent
              name="arrow-left"
              onPress={() => {
                Actions.pop();
              }}
            />
          )}>
          <Scene
            component={Pictures}
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
          key="ProfilePage"
          renderLeftButton={() => (
            <CustomIconComponent
              name="arrow-left"
              onPress={() => {
                Actions.pop();
              }}
            />
          )}>
          <Scene
            title=""
            component={Profile}
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
          key="NewsPage"
          renderLeftButton={() => (
            <CustomIconComponent
              name="arrow-left"
              onPress={() => {
                Actions.pop();
              }}
            />
          )}>
          <Scene
            title="新闻中心"
            component={News}
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
            title="我的动态"
            component={RssPage}
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
          key="IssuesPage"
          renderLeftButton={() => (
            <CustomIconComponent
              name="arrow-left"
              onPress={() => {
                Actions.pop();
              }}
            />
          )}>
          <Scene
            title="问题中心"
            component={Issues}
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
          key="RssPage"
          renderLeftButton={() => (
            <CustomIconComponent
              name="arrow-left"
              onPress={() => {
                Actions.pop();
              }}
            />
          )}>
          <Scene
            title="个人动态"
            component={RssPage}
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
          key="OwnedRepositoryPage"
          renderLeftButton={() => (
            <CustomIconComponent
              name="arrow-left"
              onPress={() => {
                Actions.pop();
              }}
            />
          )}>
          <Scene
            title="我的仓库"
            component={OwnedRepository}
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
          key="NotifictionsPage"
          renderLeftButton={() => (
            <CustomIconComponent
              name="arrow-left"
              onPress={() => {
                Actions.pop();
              }}
            />
          )}>
          <Scene
            title="消息中心"
            component={Notifictions}
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

        <Scene
          key="MyPage"
          renderLeftButton={() => (
            <CustomIconComponent
              name="arrow-left"
              onPress={() => {
                Actions.pop();
              }}
            />
          )}>
          <Scene
            titleStyle={{
              color: TEXT_COLOR,
              fontSize: 20,
            }}
            navigationBarStyle={{
              backgroundColor: `${Color(BG_COLOR)
                .darken(0.6)
                .hex()}`,
            }}
            component={My}

          />
        </Scene>
        <Scene
          key="AboutAuthorPage"
          hideNavBar
        >
          <Scene

            component={AboutAuthor}
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
          key="FeedBackPage"
          renderLeftButton={() => (
            <CustomIconComponent
              name="arrow-left"
              onPress={() => {
                Actions.pop();
              }}
            />
          )}>
          <Scene
            titleStyle={{
              color: TEXT_COLOR,
              fontSize: 20,
            }}
            navigationBarStyle={{
              backgroundColor: `${Color(BG_COLOR)
                .darken(0.6)
                .hex()}`,
            }}
            component={FeedBack}

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
                fontSize: 20,
              }}
            />
          }
          navigationBarStyle={{
            backgroundColor: Color(BG_COLOR)
              .darken(0.6)
              .hex(),
          }}>
          <Scene
            key="SearchPage"
            component={SearchPage}
            renderLeftButton={() => (
              <CustomIconComponent
                name="arrow-left"
                onPress={() => {
                  Actions.pop();
                }}
              />
            )}
            title="搜索"
            titleStyle={{
              color: TEXT_COLOR,
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
