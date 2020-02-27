/* eslint-disable prettier/prettier */
// 这里使用新功能Hooks
import React, {useEffect, Component} from 'react';
import Router from './router';
//这里我们需要引入redux中间件等等一下东西
import {Provider} from 'react-redux';
import store from './stores';
import CodePush from 'react-native-code-push';
import {MenuProvider} from 'react-native-popup-menu';
//启动屏新增
import SplashScreen from 'react-native-splash-screen';
import {toast} from './untils/untils';
import {syncImmediate} from './untils/userUntils';
import {DeviceEventEmitter} from 'react-native';
import Theme, {initTheme} from './untils/theme';

//添加主题切换功能

const codePushOptions = {
  //设置检查更新的频率
  //ON_APP_RESUME APP恢复到前台的时候
  //ON_APP_START APP开启的时候
  //MANUAL 手动检查
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
};
class App extends Component {
  componentDidMount() {
    SplashScreen.hide();
    syncImmediate(); //开始检查更新
    initTheme();
    console.log(Theme.getInstance());
  }

  render() {
    return (
      <Provider store={store}>
        <MenuProvider>
          <Router />
        </MenuProvider>
      </Provider>
    );
  }
}

export default CodePush(codePushOptions)(App);
