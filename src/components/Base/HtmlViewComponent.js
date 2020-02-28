import React, {Component} from 'react';
import {StyleSheet, Image, Dimensions} from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import HtmlRender from 'react-native-render-html';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import CustomImage from './CustomImage';
import {parseImgUrl, link} from '../../untils/untils';
import Spinner from './Spinner';
import {SCREEN_WIDTH} from '../../constants/constants';
import {BG_COLOR} from '../../constants/styles';
import Color from 'color';

const {width} = Dimensions.get('window');
const defaultMaxImageWidth = width - 30 - 20;

const regs = {
  http: {
    topic: /^https?:\/\/cnodejs\.org\/topic\/\w*/,
    user: /^https?:\/\/cnodejs\.org\/user\/\w*/,
  },
  gif: /.*\.gif$/,
};

const styles = StyleSheet.create({
  defaultImg: {
    height: defaultMaxImageWidth,
    width: defaultMaxImageWidth,
    resizeMode: 'cover',
    borderRadius: 5,
    margin: 10,
  },
});

class HtmlViewComponent extends Component {
  static propTypes = {
    imgStyle: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(
      this,
    );
  }

  _onLinkPress(url) {
    if (/^\/user\/\w*/.test(url)) {
      let authorName = url.replace(/^\/user\//, '');
      //code
    }

    if (/^https?:\/\/.*/.test(url)) {
      if (regs.http.topic.test(url)) {
        let topicId = url.replace(/^https?:\/\/cnodejs\.org\/topic\//, '');
        //code
      }

      if (regs.http.user.test(url)) {
        let userName = url.replace(/^https?:\/\/cnodejs\.org\/user\//, '');
        //code
      }

      link(url);
    }

    if (/^mailto:\w*/.test(url)) {
      link(url);
    }
  }

  _renderNode(node, index, parent, type) {
    const name = node.name;
    const {imgStyle = styles.defaultImg, maxImageWidth} = this.props;

    if (node.type === 'block' && type === 'block') {
      if (name === 'img') {
        const uri = parseImgUrl(node.attribs.src);
        if (regs.gif.test(uri)) {
          return null;
        }
        const imageId = _.uniqueId('image_');
        return (
          <CustomImage
            key={imageId}
            uri={uri}
            style={imgStyle}
            defaultSize={{
              height: 300,
              width: defaultMaxImageWidth,
            }}
            maxImageWidth={maxImageWidth}
          />
        );
      }
    }
  }

  render() {
    return (
      <HtmlRender
        html={this.props.content}
        imagesMaxWidth={SCREEN_WIDTH}
        staticContextMaxWidth={SCREEN_WIDTH}
        onLinkPress={this._onLinkPress.bind(this)}
        tagsStyles={tagsStyles}
        classesStyles={classesStyles}
        containerStyle={containerStyle}
        remoteLoadingView={Spinner}
        renderers={renderers}
        alterNode={node => {
          const {name, parent} = node;
          if (name === 'svg') {
          }
        }}
      />
    );
  }
}

export default HtmlViewComponent;

const renderers = {
  img: attr => {
    const imageId = _.uniqueId('image_');
    return (
      <CustomImage key={imageId} uri={attr.src} maxImageWidth={SCREEN_WIDTH} />
    );
  },
};
const tagsStyles = {
  h1: {
    fontSize: 20,
    padding: 5,
  },
  p: {
    padding: 5,
  },
};
const classesStyles = {};
const containerStyle = {};
