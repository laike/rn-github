/* eslint-disable react-native/no-inline-styles */
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TEXT_COLOR} from '../constants/styles';
import {Actions} from 'react-native-router-flux';
import moment from 'moment';
import momentLocaleZhCn from 'moment/locale/zh-cn';
import CustomImage from './Base/CustomImage';
moment.updateLocale('zh-cn', momentLocaleZhCn);
const propTypes = {
  data: PropTypes.object,
};
const defaultProps = {
  data: {},
};
class User_Event_List_Item extends PureComponent {
  constructor(props) {
    super(props);
  }
  onPress() {
    Actions.push('ShowCodePage', {
      title: `${this.props.data.repo.name}`,
      url: `repos/${this.props.data.repo.name}`,
    });
  }
  render() {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={this.onPress.bind(this)}>
        <View style={styles.top}>
          <CustomImage
            uri={this.props.data.actor.avatar_url}
            style={styles.avatar}
            iconSize={40}
            iconName="logo-github"
          />
          <Text style={styles.title}>{this.props.data.actor.login}</Text>
          <Text style={{fontSize: 12, color: '#999', paddingTop: 3}}>
            更新于 {moment(this.props.data.created_at).format('YYYY年M月/D日')}
          </Text>
        </View>
        <View style={styles.p}>
          <Text>{this.props.data.repo.name}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

User_Event_List_Item.propTypes = propTypes;
User_Event_List_Item.defaultProps = defaultProps;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 10,
    shadowOffset: {x: 4, y: 4},
    shadowColor: '#dddddd',
    shadowRadius: 2,
    shadowOpacity: 0.2,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    elevation: 4,
    backgroundColor: TEXT_COLOR,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
  },
  p: {
    padding: 10,
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  owner: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  login: {},
  avatar: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  stars: {
    width: 80,
    flexDirection: 'row',
    alignItems: 'center',
  },
  forks: {
    width: 80,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 18,
  },
  text: {
    paddingLeft: 5,
  },
});
export default User_Event_List_Item;
