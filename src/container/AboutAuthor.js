/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  Dimensions,
  FlatList,
  StyleSheet,
  Image,
  SectionList,
  findNodeHandle,
  StatusBar,
} from 'react-native';
import WebView from '../components/WebViewComponent';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
//引入mannager
import HttpManager from '../untils/http';
import {STATUS_BAR_STYLE, BG_COLOR} from '../constants/styles';
import store from '../stores';
import Icon from 'react-native-vector-icons/FontAwesome';

import Color from 'color';
import {ECHARTS_INSERT_JS} from '../constants/js';
import {toast} from '../untils/untils';
import {Actions} from 'react-native-router-flux';
class AboutAuthor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userinfo: {},
      loading: false,
      data: [],
      viewRef: null,
    };
  }
  componentDidMount() {
    this.load();
  }
  load() {
    this.setState({
      loading: true,
    });
    HttpManager.get('user')
      .then(res => {
        //再来请求仓库
        this.setState({
          userinfo: res.data,
        });
        HttpManager.get(res.data.repos_url).then(res1 => {
          this.setState({
            data: res1.data,
            loading: false,
          });
        });
      })
      .catch(err => {
        toast('获取用户信息失败！');
        console.log('错误 ', err);
      });
  }
  imageLoaded() {
    this.setState({
      viewRef: findNodeHandle(this.backgroundImage),
    });
  }
  onRefresh() {
    this.load();
  }
  render() {
    const {onScroll = () => {}} = this.props;
    return (
      <View style={styles.container}>
        <StatusBar {...STATUS_BAR_STYLE} />
        <FlatList
          ref={ref => {
            this.ListView = ref;
          }}
          style={styles.container}
          data={this.state.data}
          refreshing={this.state.loading}
          onRefresh={this.onRefresh}
          keyExtractor={(item, index) => index.toString()}
          renderItem={rowData => {
            return (
              <View
                style={styles.row}
                keyExtractor={(item, index) => index.toString()}>
                <Text style={styles.rowText}>{rowData.item.full_name}</Text>
              </View>
            );
          }}
          renderScrollComponent={props => (
            <ParallaxScrollView
              onScroll={onScroll}
              headerBackgroundColor={BG_COLOR}
              stickyHeaderHeight={STICKY_HEADER_HEIGHT}
              parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
              backgroundSpeed={10}
              renderBackground={() => (
                <View key="background">
                  <View
                    style={{
                      position: 'absolute',
                      top: 0,
                      width: window.width,
                      height: PARALLAX_HEADER_HEIGHT,
                    }}
                  />
                  {/* <BlurView
                    style={styles.absolute}
                    viewRef={this.state.viewRef}
                    blurType="light"
                    blurAmount={10}
                  /> */}
                  <Image
                    ref={img => {
                      this.backgroundImage = img;
                    }}
                    onLoadEnd={this.imageLoaded.bind(this)}
                    source={{
                      uri: 'https://windke.cn/Public/images/sina_cover_bg.jpg',
                      width: window.width,
                      height: PARALLAX_HEADER_HEIGHT,
                    }}
                  />
                </View>
              )}
              renderForeground={() => (
                <View key="parallax-header" style={styles.parallaxHeader}>
                  <Image
                    style={styles.avatar}
                    source={{
                      uri: 'https://windke.cn/Public/images/sina_cover_bg.jpg',
                      width: AVATAR_SIZE,
                      height: AVATAR_SIZE,
                    }}
                  />
                  <Text style={styles.sectionSpeakerText}>
                    {this.state.userinfo.name}
                  </Text>
                  <Text style={styles.sectionTitleText}>
                    {this.state.userinfo.bio}
                  </Text>
                </View>
              )}
              renderStickyHeader={() => (
                <View key="sticky-header" style={styles.stickySection}>
                  <Icon
                    name={'arrow-left'}
                    style={[
                      styles.stickySectionText,
                      {position: 'absolute', left: 10, top: 10},
                    ]}
                    onPress={() => Actions.pop()}
                  />
                  <Text style={styles.stickySectionText}>个人详情</Text>
                </View>
              )}
              renderFixedHeader={() => (
                <View key="fixed-header" style={styles.fixedSection}>
                  <Icon
                    name={'share'}
                    style={styles.fixedSectionText}
                    onPress={() => this.ListView.scrollToEnd(true)}
                  />
                </View>
              )}
            />
          )}
        />
      </View>
    );
  }
}

const window = Dimensions.get('window');

const AVATAR_SIZE = 50;
const ROW_HEIGHT = 50;
const PARALLAX_HEADER_HEIGHT = 320;
const STICKY_HEADER_HEIGHT = 70;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 1,
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: window.width,
    height: PARALLAX_HEADER_HEIGHT,
  },
  stickySection: {
    height: STICKY_HEADER_HEIGHT,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BG_COLOR,
  },
  stickySectionText: {
    color: 'white',
    fontSize: 14,
    margin: 10,
  },
  fixedSection: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  fixedSectionText: {
    color: '#999',
    fontSize: 14,
    margin: 20,
  },
  parallaxHeader: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    paddingTop: 100,
  },
  avatar: {
    marginBottom: 10,
    borderRadius: AVATAR_SIZE / 2,
  },
  sectionSpeakerText: {
    color: 'white',
    fontSize: 20,
    paddingVertical: 5,
  },
  sectionTitleText: {
    color: 'white',
    fontSize: 14,
    paddingVertical: 5,
  },
  row: {
    overflow: 'hidden',
    paddingHorizontal: 10,
    height: ROW_HEIGHT,
    borderColor: '#ccc',
    borderBottomWidth: 1,
    justifyContent: 'center',
  },
  rowText: {
    fontSize: 14,
  },
  //my
  header: {
    flex: 1,
  },
  webwiew: {
    height: 300,
  },
});

export const LayoutComponent = AboutAuthor;
