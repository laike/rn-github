import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Keyboard,
  Dimensions,
  StatusBar,
  TouchableHighlight,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  BG_COLOR,
  TEXT_COLOR,
  STATUS_BAR_STYLE,
  SHADOW_COLOR,
} from '../constants/styles';
import Button from 'react-native-button';
import {Actions} from 'react-native-router-flux';
const {width, height} = Dimensions.get('screen');
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import loginActions from '../actions/login';

@connect(
  state => ({
    state,
  }),
  dispatch => ({
    login: bindActionCreators(loginActions, dispatch),
    dispatch,
  }),
)
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }
  loginSubmit() {
    //获取到state 然后调用Api进行登录
    const {username, password} = this.state;
    //登录判断逻辑
    Actions.reset('root');
    Keyboard.dismiss();
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar {...STATUS_BAR_STYLE} />
        <View style={styles.login}>
          <View style={styles.title_container}>
            <Icon name="github" style={styles.title} />
          </View>
          <View style={styles.control_input}>
            <View style={styles.icon_container}>
              <Icon name="user" style={styles.icon} />
            </View>
            <View style={styles.control}>
              <Text style={styles.tips}>用户名</Text>
              <TextInput
                style={styles.input}
                autoFocus
                placeholder="用户名"
                value={this.state.username}
                onChangeText={text => {
                  this.setState({
                    username: text,
                  });
                }}
              />
            </View>
          </View>
          <View style={styles.control_input}>
            <View style={styles.icon_container}>
              <Icon name="github" style={styles.icon} />
            </View>
            <View style={styles.control}>
              <Text style={styles.tips}>密码</Text>
              <TextInput
                textContentType="address"
                autoCompleteType="password"
                style={styles.input}
                placeholder="密码"
                value={this.state.password}
                onChangeText={text => {
                  this.setState({
                    password: text,
                  });
                }}
              />
            </View>
          </View>
          <View style={styles.control_submit}>
            <Button
              style={styles.submit_btn}
              onPress={() => {
                this.loginSubmit();
              }}>
              登录
            </Button>
          </View>
          <View style={styles.regContainer}>
            <TouchableHighlight
              onPress={() => {
                //这里跳转到浏览器进行注册
                Linking.openURL('https://github.com/join');
              }}>
              <Text style={styles.reg}>GitHub注册</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height,
    width,
    backgroundColor: BG_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
  login: {
    width: width - 80,
    height: 400,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: SHADOW_COLOR,
    shadowOffset: {x: 10, y: 10},
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 5, //android上的阴影效果
  },
  title_container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
  title: {
    fontSize: 80,
    color: '#000',
  },
  control_input: {
    height: 50,
    flexDirection: 'row',
    margin: 5,
    alignItems: 'center',
  },
  control: {
    flexDirection: 'column',
    flex: 1,
  },
  tips: {
    fontSize: 12,
    color: '#666',
    marginBottom: 3,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 16,
  },
  icon_container: {
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 25,
  },
  control_submit: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
  },
  submit_btn: {
    width: width - 100,
    backgroundColor: '#000',
    color: TEXT_COLOR,
    fontSize: 14,
    padding: 10,
  },
  reg: {
    fontSize: 12,
    color: '#333',
  },
  regContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Login;
