/* eslint-disable react-native/no-inline-styles */
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TEXT_COLOR} from '../constants/styles';
import {Actions} from 'react-native-router-flux';
import moment from 'moment';
import momentLocaleZhCn from 'moment/locale/zh-cn';
import {addReadHistory} from '../untils/userUntils';
moment.updateLocale('zh-cn', momentLocaleZhCn);
const propTypes = {
  data: PropTypes.object,
};
const defaultProps = {
  data: [],
};
class Trending_List_Item extends PureComponent {
  constructor(props) {
    super(props);
  }
  onPress() {
    // eslint-disable-next-line prettier/prettier
    this.props.data.full_name = `${this.props.data.author}/${this.props.data.name}`;
    //添加到阅读历史
    addReadHistory(this.props.data.full_name, this.props.data);
    Actions.push('ShowCodePage', {
      url: `repos/${this.props.data.full_name}`,
      title: this.props.data.full_name,
    });
  }
  render() {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={this.onPress.bind(this)}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{this.props.data.name}</Text>
          <Text style={{fontSize: 12, color: '#999', paddingTop: 3}}>
            创建于 {moment(this.props.data.created_at).format('YYYY年M月/D日')}
          </Text>
        </View>
        <View style={styles.p}>
          <Text>{this.props.data.description}</Text>
        </View>
        <View style={styles.bottom}>
          <View style={styles.owner}>
            <Text>{this.props.data.author}</Text>
            {this.props.data.builtBy.map((user, index) => (
              <Image
                key={index}
                source={require('../data/images/github.png')}
                style={styles.avatar}
              />
            ))}
          </View>
          <View style={styles.stars}>
            <Icon name="star" onPress={() => {}} style={styles.icon} />
            <Text style={styles.text}>{this.props.data.stars}</Text>
          </View>
          <View style={styles.forks}>
            <Icon name="code-fork" onPress={() => {}} style={styles.icon} />
            <Text style={styles.text}>{this.props.data.forks}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

Trending_List_Item.propTypes = propTypes;
Trending_List_Item.defaultProps = defaultProps;
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
  titleContainer: {
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    flex: 1,
    overflow: 'hidden',
  },
  login: {},
  avatar: {
    width: 20,
    height: 20,
    marginLeft: 2,
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
export default Trending_List_Item;
