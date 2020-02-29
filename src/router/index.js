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
import {StyleSheet, Dimensions, Platform} from 'react-native';
import * as Home from '../container/Home';
import * as MyPage from '../container/MyPage';
import * as Setting from '../container/Setting';
import * as TabIcon from '../components/TabIcon';
import * as SpanlashPage from '../container/SpanlashPage';
import * as SearchPage from '../container/SearchPage';
import * as CustomLanguagePage from '../container/CustomLanguagePage';
import * as TrendingPage from '../container/TrendingPage';
import * as Login from '../container/Login';
import * as RepositoryDetail from '../container/RepositoryDetail';
import * as WebPage from '../container/WebPage';
//测试页面以后很有用，所有新功能开发之前现在测试页面，测试
import TestPage from '../container/TestPage';
//以后想要给哪个页面添加dispatch方法就很容易了
import * as DynamicPage from '../container/DynamicPage';
import * as SearchFilter from '../components/SearchFilter';
import * as RssPage from '../container/RssPage';
import {TEXT_COLOR, BLACK_COLOR} from '../constants/styles';
import store from '../stores';
import Color from 'color';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicon from 'react-native-vector-icons/Ionicons';
import CustomIconComponent from '../components/CustomIconComponent';
import CustomNavigation from '../components/CustomNavigation';
import * as Profile from '../container/Profile';
import * as Notifictions from '../container/Notifictions';
import * as News from '../container/News';
import * as Issues from '../container/Issues';
import * as CodeTheme from '../container/CodeTheme';
import * as OwnedRepository from '../container/OwnedRepositoryPage';
import * as ShowCode from '../container/ShowCode';
import * as ReposityPage from '../container/ReposityPage';
import * as StaredPage from '../container/StaredPage';
import * as AboutAuthor from '../container/AboutAuthor';
import * as FeedBack from '../container/FeedBack';
import * as SourcePage from '../container/SourcePage';
import * as Pictures from '../container/Pictures';
import * as CodeFile from '../container/CodeFile';
import * as CommonPage from '../container/CommonPage';
import * as ThemePage from '../container/ThemePage';
import ConnectCommponent from '../components/ConnectComponent';

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
          component={ConnectCommponent(SpanlashPage)}
          hideNavBar
          hideTabBar
          hide
        />
      </Scene>
      <Scene
        key="Login"
        component={ConnectCommponent(Login)}
        hideNavBar
        hideTabBar
      />
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
            component={ConnectCommponent(DynamicPage)}
            title="动态"
            icon={ConnectCommponent(TabIcon)}
          />
          <Scene
            key="trending"
            component={ConnectCommponent(TrendingPage)}
            title="趋势"
            icon={ConnectCommponent(TabIcon)}
          />

          <Scene
            key="SettingPage"
            component={ConnectCommponent(Setting)}
            title="个人中心"
            icon={ConnectCommponent(TabIcon)}
          />
        </Scene>

        <Scene
          key="CodeThemePage"
          component={ConnectCommponent(CodeTheme)}
          back
        />
        <Scene key="ThemePage" component={ConnectCommponent(ThemePage)} back />
        <Scene
          key="IssuesPage"
          title="问题中心"
          component={ConnectCommponent(Issues)}
          back
        />
        <Scene
          key="RssPage"
          title="个人动态"
          component={ConnectCommponent(RssPage)}
          back
        />
        <Scene
          key="ReposityPage"
          component={ConnectCommponent(ReposityPage)}
          back
        />
        <Scene
          key="StaredPage"
          component={ConnectCommponent(StaredPage)}
          back
        />
        <Scene
          key="SourcePage"
          component={ConnectCommponent(SourcePage)}
          back
        />
        <Scene
          key="ShowCodePage"
          component={ConnectCommponent(ShowCode)}
          back
        />
        <Scene
          key="CodeFilePage"
          component={ConnectCommponent(CodeFile)}
          back
        />
        <Scene
          key="CustomLanguagePage"
          title="自定义语言"
          component={ConnectCommponent(CustomLanguagePage)}
          back
        />
        <Scene
          key="RepositoryDetailPage"
          component={ConnectCommponent(RepositoryDetail)}
          back
        />
        <Scene
          key="PicturesPage"
          component={ConnectCommponent(Pictures)}
          back
        />
        <Scene
          key="ProfilePage"
          title=""
          component={ConnectCommponent(Profile)}
          back
        />
        <Scene
          key="NewsPage"
          title="新闻中心"
          component={ConnectCommponent(News)}
          back
        />
        <Scene
          key="OwnedRepositoryPage"
          title="我的仓库"
          component={ConnectCommponent(OwnedRepository)}
          back
        />
        <Scene
          key="NotifictionsPage"
          title="消息中心"
          component={ConnectCommponent(Notifictions)}
          back
        />
        <Scene key="WebPage" component={ConnectCommponent(WebPage)} back />
        <Scene key="MyPage" component={ConnectCommponent(MyPage)} back />
        <Scene
          key="AboutAuthorPage"
          component={ConnectCommponent(AboutAuthor)}
          back
        />
        <Scene
          key="FeedBackPage"
          component={ConnectCommponent(FeedBack)}
          back
        />
        {/* 通用页  */}
        <Scene key="CommonPage" component={ConnectCommponent(CommonPage)} />
        <Scene
          key="TrendingPage"
          component={ConnectCommponent(TrendingPage)}
          title="热门趋势"
        />
        <Drawer
          key="SearchPageDrawer"
          drawerPosition="right"
          contentComponent={ConnectCommponent(SearchFilter)}
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
          <Scene
            key="SearchPage"
            component={ConnectCommponent(SearchPage)}
            title="搜索"
            back
          />
        </Drawer>
      </Scene>

      <Scene
        key="GitHubLoginPage"
        title="正在前往GitHub授权页面....."
        component={ConnectCommponent(WebPage)}
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
