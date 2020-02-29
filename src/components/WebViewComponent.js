import React, {PureComponent} from 'react';
import {View, StyleSheet} from 'react-native';
//引入第三方webview控件
import WebWiew from 'react-native-webview';
import {Actions} from 'react-native-router-flux';
import {ECHARTS_INSERT_JS} from '../constants/js';
class WebViewComponent extends PureComponent {
  constructor(props) {
    super(props);
  }
  onLoadEnd() {}
  onLoadProgress() {}
  onLoadStart() {}
  render() {
    return (
      <View style={styles.container}>
        <WebWiew
          startInLoadingState={true}
          onLoadStart={this.onLoadStart}
          onLoadProgress={this.onLoadProgress}
          onLoadEnd={this.onLoadEnd}
          //启用JavaScript
          javaScriptEnabled={true}
          dataDetectorTypes={'none'}
          domStorageEnabled={true}
          scalesPageToFit={true}
          scrollEnabled={false}
          automaticallyAdjustContentInsets={true}
          allowsInlineMediaPlayback={true}
          mixedContentMode={'always'}
          // injectedJavaScript={ECHARTS_INSERT_JS}
          {...this.props}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default WebViewComponent;
