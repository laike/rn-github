import React, {Component, useState, useEffect} from 'react';
import {
  Text,
  ScrollView,
  StyleSheet,
  Image,
  RefreshControl,
  View,
  Dimensions,
} from 'react-native';
import store from '../stores';
import http from '../untils/http';
import {toast} from '../untils/untils';
import EventListItem from './EventListItem';
import EmptyComponent from './EmptyComponent';
import {markdownToNative} from '../untils/MdHtmlUntils';
import _ from 'lodash';
import AutoHeightWebView from 'react-native-autoheight-webview';
import Home_List_Item from './Home_List_Item';
import User_List_Item from './User_List_Item';
import WebViewComponent from './WebViewComponent';
import SyntaxHighlighter from 'react-native-syntax-highlighter';
/*by default component uses hljs so access hljs styles, import from /prism for prism styles */
import codeThemes from 'react-syntax-highlighter/styles/hljs';
console.log(codeThemes);
import {
  SYSTEM_VERSION,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
} from '../constants/constants';
import User_Event_List_Item from './User_Event_List_Item';
import Branches_LIst_Item from './Branches_LIst_Item';
import Repos_Commit_List_Item from './Repos_Commit_List_Item';
import Source_Branch_List_Item from './Source_Branch_List_Item';
import Trending_List_Item from './Trending_List_Item';
import {BG_COLOR} from '../constants/styles';
import HtmlViewComponent from './Base/HtmlViewComponent';
import theme from '../reducers/theme';

const CommonDetail = ({
  url,
  component,
  full_name,
  readhistory,
  initial = [],
}) => {
  const [data, setData] = useState(initial);
  const [loading, setLoading] = useState(false);
  console.log(component, url);
  function getHttp() {
    if (component === 'readme' || component === 'code') {
      return http.get(url, {
        headers: {Accept: 'application/vnd.github.3.html'},
        params: {branch: 'master'},
      });
    } else {
      return http.get(url);
    }
  }

  function setResponse(res) {
    if (component === 'search/reponsitories' || component === 'search/users') {
      console.log('items is setings ...');
      setData(res.data.items);
    } else if (component === 'readhistories') {
      setData(res);
    } else {
      console.log(res.data);
      setData(res.data);
    }
  }
  //处理获取数据
  function renderData() {
    if (typeof data === 'object') {
      return JSON.stringify(data);
    }
    //否者直接返回
    return data;
  }

  function renderView(type = 'highlightjs') {
    if (type === 'webview') {
      return (
        <WebViewComponent
          source={{
            uri: `file:///android_asset/template.html?=${SYSTEM_VERSION}`,
          }}
          style={styles.code}
          scrollEnabled={true}
          injectedJavaScript={`
                (function(){
                     document.body.style.backgroundColor = '#2b2b2b';
                     var str = \`${renderData()}\`;
                     var code = document.getElementById('code');
                     code.innerText= str;
                     var codes = document.querySelectorAll('pre code');
                     codes.forEach(function(block, i) {
                        hljs.highlightBlock(block);
                     });
               
                })()
                `}
        />
      );
    } else if (type === 'highlightjs') {
      return (
        <View style={{flex: 1}}>
          <SyntaxHighlighter
            language="javascript"
            fontSize={20}
            style={codeThemes[theme.codetheme]}
            highlighter={'prism' || 'hljs'}>
            {renderData()}
          </SyntaxHighlighter>
        </View>
      );
    } else {
      return (
        <AutoHeightWebView
          style={{
            width: Dimensions.get('window').width,
          }}
          customScript={`
                (function(){
                     InitHightlightjs('${url}');
                })()
                `}
          source={{
            uri: `file:///android_asset/template.html?=${SYSTEM_VERSION}`,
          }}
          scalesPageToFit={true}
          viewportContent={'width=device-width, user-scalable=no'}
        />
      );
    }
  }

  function load() {
    setLoading(true);
    //这里判断一下是否传入了readhistory这个属性如果传入
    if (!readhistory) {
      getHttp()
        .then(res => {
          setLoading(false);
          setResponse(res);
          console.log('data 类型是：', typeof res.data);
        })
        .catch(err => {
          console.log(err);
          toast('数据获取失败！');
        });
    } else {
      setResponse(readhistory);
      setLoading(false);
    }
  }
  useEffect(() => {
    load();
  }, [url]); //这一步优化很重要

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={() => {
            load();
          }}
        />
      }>
      {!component ? (
        data.length > 0 ? (
          data.map((nt, index) => <EventListItem key={index} data={nt} />)
        ) : (
          <EmptyComponent />
        )
      ) : (
        <View />
      )}
      {component === 'dynamic' ? (
        data.length > 0 ? (
          data.map((nt, index) => (
            <User_Event_List_Item key={index} data={nt} />
          ))
        ) : (
          <EmptyComponent />
        )
      ) : (
        <View />
      )}
      {/* 如果是branches */}
      {component === 'branches' ? (
        data.length > 0 ? (
          data.map((nt, index) => <Branches_LIst_Item key={index} data={nt} />)
        ) : (
          <EmptyComponent />
        )
      ) : (
        <View />
      )}
      {/* sources code page branch */}
      {component === 'sourcesbranches' ? (
        data.length > 0 ? (
          data.map((nt, index) => (
            <Source_Branch_List_Item
              key={index}
              data={nt}
              full_name={full_name}
            />
          ))
        ) : (
          <EmptyComponent />
        )
      ) : (
        <View />
      )}
      {component === 'reposcommits' ? (
        data.length > 0 ? (
          data.map((nt, index) => (
            <Repos_Commit_List_Item key={index} data={nt} />
          ))
        ) : (
          <EmptyComponent />
        )
      ) : (
        <View />
      )}

      {component === 'subscribers' ? (
        data.length > 0 ? (
          data.map((nt, index) => <User_List_Item key={index} data={nt} />)
        ) : (
          <EmptyComponent />
        )
      ) : (
        <View />
      )}
      {component === 'stargazers' ? (
        data.length > 0 ? (
          data.map((nt, index) => <User_List_Item key={index} data={nt} />)
        ) : (
          <EmptyComponent />
        )
      ) : (
        <View />
      )}
      {component === 'readme' ? (
        data ? (
          <HtmlViewComponent content={data} style={{color: 'red'}} />
        ) : (
          // <View>{markdownToNative(data)}</View>
          <EmptyComponent />
        )
      ) : (
        <View />
      )}
      {component === 'search/reponsitories' ||
      component === 'myrespositories' ? (
        data.length > 0 ? (
          data.map((item, index) => <Home_List_Item key={index} data={item} />)
        ) : (
          <EmptyComponent />
        )
      ) : (
        <View />
      )}
      {/* 如果是阅读列表要做特殊处理 */}
      {component === 'readhistories' ? (
        data.length > 0 ? (
          data.map((item, index) =>
            item.builtBy ? (
              <Trending_List_Item key={index} data={item} />
            ) : (
              <Home_List_Item key={index} data={item} />
            ),
          )
        ) : (
          <EmptyComponent />
        )
      ) : (
        <View />
      )}
      {component === 'search/users' ? (
        data.length > 0 ? (
          data.map((item, index) => <User_List_Item key={index} data={item} />)
        ) : (
          <EmptyComponent />
        )
      ) : (
        <View />
      )}
      {/* 如果是代码显示那么 */}
      {component === 'code' ? (
        data ? (
          renderView('autoview')
        ) : (
          // <HtmlViewComponent content={data} />
          <EmptyComponent />
        )
      ) : (
        <View />
      )}
    </ScrollView>
  );
};
export default CommonDetail;

const styles = StyleSheet.create({
  container: {},
  content: {},
  text: {
    color: BG_COLOR,
  },
  code: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  des: {
    paddingLeft: 10,
  },
});
