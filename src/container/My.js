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
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import {ScrollView} from 'react-native-gesture-handler';
import {STATUS_BAR_STYLE} from '../constants/styles';
export default class My extends Component {
  constructor(props) {
    super(props);
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
          data={[
            'Simplicity Matters',
            'Hammock Driven Development',
            'Value of Values',
            'Are We There Yet?',
            'The Language of the System',
            'Design, Composition, and Performance',
            'Clojure core.async',
            'The Functional Database',
            'Deconstructing the Database',
            'Hammock Driven Development',
            'Value of Values',
          ]}
          keyExtractor={(item, index) => index.toString()}
          renderItem={rowData => {
            console.log(rowData);
            return (
              <View
                style={styles.row}
                keyExtractor={(item, index) => index.toString()}>
                <Text style={styles.rowText}>{rowData.item}</Text>
              </View>
            );
          }}
          renderScrollComponent={props => (
            <ParallaxScrollView
              onScroll={onScroll}
              headerBackgroundColor="#333"
              stickyHeaderHeight={STICKY_HEADER_HEIGHT}
              parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
              backgroundSpeed={10}
              renderBackground={() => (
                <View key="background">
                  <Image
                    source={{
                      uri: 'https://windke.cn/Public/images/sina_cover_bg.jpg',
                      width: window.width,
                      height: PARALLAX_HEADER_HEIGHT,
                    }}
                  />
                  <View
                    style={{
                      position: 'absolute',
                      top: 0,
                      width: window.width,
                      backgroundColor: 'rgba(0,0,0,.4)',
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
                      uri:
                        'https://tvax3.sinaimg.cn/crop.0.0.1080.1080.180/7b915431ly8gabxso0h1tj20u00u0q8d.jpg?KID=imgbed,tva&Expires=1582195086&ssig=k33pNooXsC',
                      width: AVATAR_SIZE,
                      height: AVATAR_SIZE,
                    }}
                  />
                  <Text style={styles.sectionSpeakerText}>
                    Talks by Rich Hickey
                  </Text>
                  <Text style={styles.sectionTitleText}>
                    CTO of Cognitec, Creator of Clojure
                  </Text>
                </View>
              )}
              renderStickyHeader={() => (
                <View key="sticky-header" style={styles.stickySection}>
                  <Text style={styles.stickySectionText}>
                    Rich Hickey Talks
                  </Text>
                </View>
              )}
              renderFixedHeader={() => (
                <View key="fixed-header" style={styles.fixedSection}>
                  <Text
                    style={styles.fixedSectionText}
                    onPress={() => this.ListView.scrollToEnd(true)}>
                    Scroll to top
                  </Text>
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

const AVATAR_SIZE = 120;
const ROW_HEIGHT = 60;
const PARALLAX_HEADER_HEIGHT = 350;
const STICKY_HEADER_HEIGHT = 70;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
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
    width: 300,
    justifyContent: 'flex-end',
  },
  stickySectionText: {
    color: 'white',
    fontSize: 20,
    margin: 10,
  },
  fixedSection: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  fixedSectionText: {
    color: '#999',
    fontSize: 20,
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
    fontSize: 24,
    paddingVertical: 5,
  },
  sectionTitleText: {
    color: 'white',
    fontSize: 18,
    paddingVertical: 5,
  },
  row: {
    overflow: 'hidden',
    paddingHorizontal: 10,
    height: ROW_HEIGHT,
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderBottomWidth: 1,
    justifyContent: 'center',
  },
  rowText: {
    fontSize: 20,
  },
});
