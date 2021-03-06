import React, {Component, useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Animated,
  Text,
  StatusBar,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TEXT_COLOR, STATUS_BAR_STYLE, BG_COLOR} from '../constants/styles';

//引入Http类
import Http from '../untils/http';
import Color from 'color';
import LinearGradient from 'react-native-linear-gradient';
import {getUserInfo, doUserLogin} from '../untils/userUntils';
//这个启动页我们后面再来处理
const {width, height} = Dimensions.get('window');
//定义一个淡入淡出的高阶组件使用hooks 钩子
const FadeInOut = props => {
  const [fade] = useState(new Animated.Value(0));
  const {duration = 2000, style = {}, children} = props;
  useEffect(() => {
    Animated.timing(fade, {
      toValue: 1,
      duration: duration,
    }).start();
  }, [duration, fade]);
  return (
    <Animated.View
      style={{
        ...style,
        opacity: fade,
      }}>
      {children}
    </Animated.View>
  );
};
class SpanlashPage extends Component {
  componentDidMount() {
    setTimeout(() => {
      //如果没有登录跳转到第三方登录页面
      console.log(Http.options.token);
      if (!Http.getToken()) {
        Actions.reset('Login');
      } else {
        //这里还要进一步获取用户基本信息
        getUserInfo().then(info => {
          console.log(info);
          if (info) {
            Actions.reset('root');
          } else {
            Http.doUserLogin();
          }
        });
      }
    }, 2100);
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          {...STATUS_BAR_STYLE}
          backgroundColor={Color(this.props.theme.theme).darken(0.3)}
        />
        {/* <LinearGradient
          colors={[
            Color(this.props.theme.theme)
              .darken(0.3)
              .hex(),
            Color(this.props.theme.theme)
              .darken(0.6)
              .hex(),
            Color(this.props.theme.theme)
              .darken(0.8)
              .hex(),
          ]}
          style={styles.bg}></LinearGradient> */}
        <Icon name="github" style={styles.logo} />
        <View style={styles.animatedText}>
          <FadeInOut>
            <Text style={styles.text}>write code by github, not by search</Text>
          </FadeInOut>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: width,
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontSize: 60,
    color: TEXT_COLOR,
  },
  animatedText: {
    display: 'flex',
    justifyContent: 'center',
  },
  text: {
    color: TEXT_COLOR,
    fontSize: 12,
    padding: 10,
  },
  bg: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
export const LayoutComponent = SpanlashPage;
export function mapStateToProps(state, props) {
  return {
    theme: state.theme,
  };
}
