import React, {PureComponent} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {SCREEN_WIDTH} from '../constants/constants';
import HtmlViewComponent from '../components/Base/HtmlViewComponent';
import CommonDetail from '../components/CommonDetail';
class RepositoryDetail extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}
  render() {
    return (
      <View style={styles.container}>
        <CommonDetail
          url={
            this.props.url
              ? this.props.url
              : `repos/${this.props.full_name}/readme`
          }
          component={'readme'}
          initial={''}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: SCREEN_WIDTH,
  },
});
export const LayoutComponent = RepositoryDetail;
