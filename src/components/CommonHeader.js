import React, {useState, useEffect, useRef} from 'react';
import {View, Text, Image, StyleSheet, findNodeHandle} from 'react-native';
import Color from 'color';
import {TEXT_COLOR, BG_COLOR} from '../constants/styles';
import store from '../stores';
import {SCREEN_WIDTH} from '../constants/constants';
import {BlurView, VibrancyView} from '@react-native-community/blur';
import moment from 'moment';
import momentLocaleZhCn from 'moment/locale/zh-cn';
import LinearGradient from 'react-native-linear-gradient';
moment.updateLocale('zh-cn', momentLocaleZhCn);
//使用react hooks 实例
const CommonHeader = ({data = {}, type = 'user', theme, ...rest}) => {
  //定义state
  const [user, setUser] = useState(data);
  const [viewRef, setViewRef] = useState(null);
  const avatar = useRef(null);
  //相当于componentDidMount 和componentDidUpdate
  useEffect(() => {
    setUser(data);
  }, [data]);
  let backgroundImage = null;

  function renderDes() {
    if (type === 'repo') {
      return (
        <View style={styles.info}>
          <Text style={styles.nickname}>
            {user.owner ? user.owner.login : '还没有昵称'}
          </Text>
          <Text style={styles.bio}>
            {user.description ? user.description : '此项目还没有添加任何描述！'}
          </Text>
          <Text style={styles.created}>
            {user.owner
              ? moment(user.owner.created_at).format('创建于: YYYY年M月/D日')
              : '---'}
          </Text>
        </View>
      );
    } else {
      return (
        <View style={styles.info}>
          <Text style={styles.nickname}>
            {user.login ? user.login : '还没有昵称'}
          </Text>
          <Text style={styles.bio}>
            {user.bio ? user.bio.replace('\n', '') : '这个人很懒还没有写描述'}
          </Text>
          <Text style={styles.company}>
            {user.company ? user.company : '这个人还没有填写公司'}
          </Text>
          <Text style={styles.blog}>
            {user.blog ? user.blog : '这个人还没有开通博客'}
          </Text>
          <Text style={styles.location}>
            {user.location ? user.location : '没有定位'}
          </Text>
          <Text style={styles.created}>
            {user.created_at
              ? moment(user.created_at).format('创建于: YYYY年M月/D日')
              : '---'}
          </Text>
        </View>
      );
    }
  }
  return (
    <View style={styles.header}>
      {/* <BlurView
        style={styles.absolute}
        viewRef={viewRef}
        blurType="light"
        blurAmount={(0, 5)}
      /> */}
      <LinearGradient
        colors={[
          Color(theme.theme)
            .darken(0.1)
            .hex(),
          Color(theme.theme)
            .darken(0.4)
            .hex(),
          Color(theme.theme)
            .darken(0.9)
            .hex(),
        ]}
        style={styles.bg}></LinearGradient>
      <Image
        ref={img => {
          backgroundImage = img;
        }}
        // onLoadEnd={() => {
        //   setViewRef(findNodeHandle(backgroundImage));
        // }}
        source={require('../data/images/github2.png')}
        style={styles.avatar}
      />
      {renderDes()}
    </View>
  );
};

export default CommonHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BG_COLOR,
    paddingBottom: 10,
    position: 'relative',
  },
  avatar: {
    width: 100,
    height: 100,
  },
  nickname: {
    fontSize: 20,
    color: TEXT_COLOR,
    textAlign: 'center',
  },
  bio: {
    color: TEXT_COLOR,
    padding: 4,
    textAlign: 'center',
  },
  company: {
    color: TEXT_COLOR,
    padding: 4,
    textAlign: 'center',
  },
  blog: {
    color: BG_COLOR,
    padding: 4,
    textAlign: 'center',
  },
  location: {
    color: TEXT_COLOR,
    padding: 4,
    marginBottom: 10,
    textAlign: 'center',
  },
  info: {},
  created: {
    fontSize: 12,
    color: '#ddd',
    textAlign: 'center',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  bg: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
