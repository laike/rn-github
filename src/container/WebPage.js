import React, {PureComponent} from 'react';
import {View, StyleSheet} from 'react-native';
import WebViewComponent from '../components/WebViewComponent';
import {Actions} from 'react-native-router-flux';
class WebPage extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <WebViewComponent {...this.props} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
  },
});
export default WebPage;
