import React, {Component} from 'react';
import {
  View,
  Text,
  Dimensions,
  FlatList,
  StyleSheet,
  Image,
  SectionList,
  StatusBar,
} from 'react-native';
import WebView from '../components/WebViewComponent';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
//引入mannager
import HttpManager from '../untils/http';
import {STATUS_BAR_STYLE, BG_COLOR} from '../constants/styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import Color from 'color';
export default class My extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userinfo: {},
      data: [],
    };
  }
  componentDidMount() {
    HttpManager.get('user').then(res => {
      //再来请求仓库
      this.setState({
        userinfo: res.data,
      });
      HttpManager.get(res.data.repos_url).then(res => {
        this.setState({
          data: res.data,
        });
      });
    });
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
          ListHeaderComponent={() => {
            return (
              <View style={styles.header}>
                <WebView
                  style={styles.webwiew}
                  source={{uri: this.state.userinfo.html_url}}
                />
              </View>
            );
          }}
          renderScrollComponent={props => (
            <ParallaxScrollView
              onScroll={onScroll}
              headerBackgroundColor={Color(BG_COLOR)
                .darken(0.6)
                .hex()}
              stickyHeaderHeight={STICKY_HEADER_HEIGHT}
              parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
              backgroundSpeed={10}
              renderBackground={() => (
                <View key="background">
                  <Image
                    source={{
                      uri: this.state.userinfo.avatar_url,
                      width: window.width,
                      height: PARALLAX_HEADER_HEIGHT,
                    }}
                  />
                  <View
                    style={{
                      position: 'absolute',
                      top: 0,
                      width: window.width,
                      backgroundColor: Color(BG_COLOR)
                        .darken(0.6)
                        .hex(),
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
                      uri: this.state.userinfo.avatar_url,
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
                    onPress={() => this.ListView.scrollToEnd(true)}
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

const AVATAR_SIZE = 100;
const ROW_HEIGHT = 50;
const PARALLAX_HEADER_HEIGHT = 320;
const STICKY_HEADER_HEIGHT = 70;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    backgroundColor: Color(BG_COLOR)
      .darken(0.6)
      .hex(),
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
    height: 80,
  },
});
