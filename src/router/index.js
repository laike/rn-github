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
import RssPage from '../container/RssPage';
import {TEXT_COLOR, BLACK_COLOR} from '../constants/styles';
import store from '../stores';
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
import FeedBack from '../container/FeedBack';
import SourcePage from '../container/SourcePage';
import Pictures from '../container/Pictures';
import CodeFile from '../container/CodeFile';
import CommonPage from '../container/CommonPage';
import ThemePage from '../container/ThemePage';
const {width} = Dimensions.get('window');

const router = () => (
  <Router
    //加入scheme 重磅功能
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
      <Scene key="Login" component={Login} hideNavBar hideTabBar />
      <Scene key="root">
        <Scene
          key="tabbar"
          wrap={false}
          tabs
          lazy
          showLabel={false}
          title={'Rn-GitHub'}
          renderRightButton={
            <CustomIconComponent
              name={'search'}
              onPress={() => {
                Actions.SearchPage();
              }}
            />
          }
          tabBarPosition="bottom">
          <Scene
            key="DynamicPage"
            component={DynamicPage}
            title="动态"
            icon={TabIcon}
          />
          <Scene
            key="trending"
            component={TrendingPage}
            title="趋势"
            icon={TabIcon}
          />

          <Scene
            key="SettingPage"
            component={Setting}
            title="个人中心"
            icon={TabIcon}
          />
        </Scene>
        <Scene key="ThemePage" component={ThemePage} back />
        <Scene key="IssuesPage" title="问题中心" component={Issues} back />

        <Scene key="RssPage" title="个人动态" component={RssPage} back />

        <Scene key="ReposityPage" component={ReposityPage} back />

        <Scene key="StaredPage" component={StaredPage} back />

        <Scene key="SourcePage" component={SourcePage} back />

        <Scene key="TrendingPage" component={TrendingPage} icon={TabIcon} />

        <Scene key="ShowCodePage" title="" component={ShowCode} back />

        <Scene key="CodeFilePage" title="" component={CodeFile} back />

        <Scene
          key="CustomLanguagePage"
          title="自定义语言"
          component={CustomLanguagePage}
          back
        />
        <Scene key="RepositoryDetailPage" component={RepositoryDetail} back />

        <Scene key="PicturesPage" component={Pictures} back />

        <Scene key="ProfilePage" title="" component={Profile} back />

        <Scene key="NewsPage" title="新闻中心" component={News} back />
        <Scene
          key="OwnedRepositoryPage"
          title="我的仓库"
          component={OwnedRepository}
          back
        />

        <Scene
          key="NotifictionsPage"
          title="消息中心"
          component={Notifictions}
          back
        />

        <Scene key="WebPage" component={WebPage} back />

        <Scene key="MyPage" component={My} back />

        <Scene key="AboutAuthorPage" component={AboutAuthor} back />

        <Scene key="FeedBackPage" component={FeedBack} back />
        {/* 通用页  */}
        <Scene key="CommonPage" component={CommonPage} />

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
                color: BLACK_COLOR,
                fontSize: 20,
              }}
            />
          }>
          <Scene key="SearchPage" component={SearchPage} title="搜索" back />
        </Drawer>
      </Scene>

      <Scene
        key="GitHubLoginPage"
        title="正在前往GitHub授权页面....."
        component={WebPage}
        back
      />
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
