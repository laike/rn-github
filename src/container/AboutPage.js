import React, {Component} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {
  GITHUB_THIRDPARTY_AUTHORIZATION_URL,
  CLIENT_ID,
} from '../constants/constants';
//这里我们调用HttpManager来设置access_token
import HttpManager from '../untils/http';
export default class My extends Component {
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
              Actions.WebPage({
                source: {
                  uri: `${GITHUB_THIRDPARTY_AUTHORIZATION_URL}?client_id=${CLIENT_ID}`,
                },
                onMessage: event => {
                  let params = JSON.parse(event.nativeEvent.data);
                  console.log(params); //这里每次获取的accesstoken都不不一样，每次都更新所以不会重复。

                  //HttpManager.setToken();
                  Actions.MyPage({data: params});
                },
              });
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
