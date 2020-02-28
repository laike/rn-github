import React, {PureComponent} from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
//引入第三方webview控件
import HtmlView from 'react-native-htmlview';
import {openUrl} from '../../untils/untils';

class HtmlViewComponent extends PureComponent {
  constructor(props) {
    super(props);
  }
  renderNode(node, index, siblings, parent, defaultRender) {
    //先判断是否是标签，如不是可能是text文本类型
    if (node.type === 'tag') {
      if (node.name === 'img') {
        return (
          <Image
            key={index}
            resizeMethod={'scale'}
            source={{uri: node.attribs.src}}
            style={styles.img}
          />
        );
      }
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <HtmlView
          value={this.props.html}
          renderNode={this.renderNode}
          onLinkPress={url => {
            openUrl(url);
          }}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    width: 50,
    height: 50,
  },
  a: {},
  text: {
    color: '#000',
  },
});
export default HtmlViewComponent;
