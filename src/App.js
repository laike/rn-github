/* eslint-disable prettier/prettier */
import React from 'react';
import Router from './router';
//这里我们需要引入redux中间件等等一下东西
import {Provider} from 'react-redux';

import store from './stores';
import {View, Text} from 'react-native';

const App = () => {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};
export default App;
