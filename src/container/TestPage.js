import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  DeviceEventEmitter,
  AsyncStorage,
} from 'react-native';
import {Actions} from 'react-native-router-flux';

//这里我们调用HttpManager来设置access_token
import HttpManager from '../untils/http';
import {USER_HAS_LOGIN_IN} from '../constants/constants';
import {TOKEN_KEY} from '../config/config';
export default class TestPage extends Component {
  componentDidMount() {
    DeviceEventEmitter.addListener(USER_HAS_LOGIN_IN, event => {
      //code
    });
    if (HttpManager.getToken()) {
      HttpManager.get('https://api.github.com/user')
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log('请求报错。', err);
        });
    }
  }
  componentWillUnmount() {
    DeviceEventEmitter.removeListener(USER_HAS_LOGIN_IN);
  }
  render() {
    return (
      <View style={styles}>
        <Text>
          这里我们要测试schema 这样的话，以后方便我们进行第三方登录！{' '}
        </Text>
        <View>
          <Button
            title={'打开github授权地址'}
            onPress={() => {
              HttpManager.openAuthorizationPage();
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: 'red',
  },
});
