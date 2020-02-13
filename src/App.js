import React from 'react';
import Router from './router';
//测试
import {View, Text} from 'react-native';
//这里我们需要引入redux中间件等等一下东西
import {Provider, connect} from 'react-redux';
import store from './stores';
const Route = connect()(Router);
const App = () => {
  return (
    <Provider store={store}>
      <View>
        <Text>this is a demo!</Text>
      </View>
    </Provider>
  );
};
export default App;
