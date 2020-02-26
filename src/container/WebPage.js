import React, { PureComponent } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import WebViewComponent from '../components/WebViewComponent';
import { Actions } from 'react-native-router-flux';
import { STATUS_BAR_STYLE } from '../constants/styles';
class WebPage extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar {...STATUS_BAR_STYLE} />
        <WebViewComponent {...this.props} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default WebPage;
