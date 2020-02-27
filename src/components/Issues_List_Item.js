import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {BLACK_COLOR, BG_COLOR} from '../constants/styles';
import store from '../stores';
import Color from 'color';
import moment from 'moment';
import momentLocaleZhCn from 'moment/locale/zh-cn';
import HtmlViewComponent from '../components/HtmlViewComponent';
moment.updateLocale('zh-cn', momentLocaleZhCn);
const Issues_List_Item = ({data}) => {
  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <View style={styles.issueSort}>
          <Text style={styles.isueTitle}>#{data.number}</Text>
          <Text style={styles.issueText}>Issue</Text>
        </View>
        <View style={styles.issueInfo}>
          <Text style={styles.title}>{data.title}</Text>
          <View style={styles.info}>
            <View style={styles.item}>
              <Icon name="gear" style={styles.issueText} />
              <Text style={styles.issueText}>{data.state}</Text>
            </View>
            <View style={styles.item}>
              <Icon name="gear" style={styles.issueText} />
              <Text style={styles.issueText}>
                {`${data.comments} comments`}{' '}
              </Text>
            </View>
            <View style={styles.item}>
              <Icon name="gear" style={styles.issueText} />
              <Text style={styles.issueText}>
                {data.assignees.length === 0 ? 'unassighned' : data.assignee}
              </Text>
            </View>
            <View style={styles.item}>
              <Icon name="gear" style={styles.issueText} />
              <Text style={styles.issueText}>
                {moment(data.created_at, 'YYYYMMDD').fromNow()}
              </Text>
            </View>
          </View>
        </View>
      </View>
      {/* <View style={styles.body}>
        <HtmlViewComponent html={data.body} />
      </View> */}
    </View>
  );
};

export default Issues_List_Item;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderBottomColor: '#ddd',
    borderBottomWidth: 0.4,
    padding: 5,
  },
  body: {
    padding: 5,
    fontSize: 14,
  },
  inner: {
    flexDirection: 'row',
    padding: 5,
  },
  issueSort: {
    flexDirection: 'column',
    paddingTop: 20,
    paddingRight: 10,
    paddingLeft: 10,
    borderRightColor: '#333',
    borderRightWidth: 0.3,
  },
  isueTitle: {
    fontSize: 18,
    color: BLACK_COLOR,
    fontWeight: '400',
    lineHeight: 30,
    textAlign: 'center',
  },
  issueText: {
    fontSize: 16,
    color: BG_COLOR,
    textAlign: 'center',
    paddingLeft: 5,
  },
  issueInfo: {
    flexDirection: 'column',
    flex: 1,
  },
  info: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 240,
  },
  title: {
    fontSize: 18,
    lineHeight: 30,
    paddingLeft: 5,
  },
  item: {
    width: 120,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
