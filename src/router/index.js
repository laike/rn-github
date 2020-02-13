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
import {Platform, Text} from 'react-native';
import {StackViewStyleInterpolator} from 'react-navigation-stack';
import Home from '../container/Home';
import My from '../container/My';
import Setting from '../container/Setting';
import Trending from '../container/Trending';
import TabIcon from '../components/TabIcon';
const prefix = Platform.OS === 'android' ? 'mychat://mychat/' : 'mychat://';

const transitionConfig = () => ({
  screenInterpolator: StackViewStyleInterpolator.forFadeFromBottomAndroid,
});
const router = () => (
  <Router>
    <Overlay key="overlay">
      <Modal key="modal" hideNavBar transitionConfig={transitionConfig}>
        <Lightbox key="lightbox">
          <Scene key="root" hideNavBar={true}>
            <Scene
              key="tabbar"
              initial
              tabs={true}
              tabBarPosition="bottom"
              showLabel={true}>
              <Scene key="home" component={Home} title="首页" />
              <Scene key="my" component={My} title="个人中心" />
              <Scene key="setting" component={Setting} title="设置" />
              <Scene key="trending" component={Trending} title="趋势" />
            </Scene>
          </Scene>
        </Lightbox>
      </Modal>
    </Overlay>
  </Router>
);

export default router;
