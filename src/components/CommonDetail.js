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
import {BG_COLOR} from '../constants/styles';
import http from '../untils/http';
import {toast} from '../untils/untils';
import EventListItem from './EventListItem';
import EmptyComponent from './EmptyComponent';
import {markdownToNative} from '../untils/MdHtmlUntils';

import AutoHeightWebView from 'react-native-autoheight-webview';
import Home_List_Item from './Home_List_Item';
import User_List_Item from './User_List_Item';
import WebViewComponent from './WebViewComponent';
import {
  SYSTEM_VERSION,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
} from '../constants/constants';
import User_Event_List_Item from './User_Event_List_Item';
import Branches_LIst_Item from './Branches_LIst_Item';
import Repos_Commit_List_Item from './Repos_Commit_List_Item';

const CommonDetail = ({url, component, initial = []}) => {
  const [data, setData] = useState(initial);
  const [loading, setLoading] = useState(false);
  console.log(component, url);
  function getHttp() {
    if (component === 'readme' || component === 'code') {
      return http.get(url, {
        headers: {Accept: 'application/vnd.github.3.raw+json'},
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
    } else {
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

  function renderView(type = 'webwiew') {
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
        data ? (
          data.map((nt, index) => <EventListItem key={index} data={nt} />)
        ) : (
          <EmptyComponent />
        )
      ) : (
        <View />
      )}
      {component === 'dynamic' ? (
        data ? (
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
        data ? (
          data.map((nt, index) => <Branches_LIst_Item key={index} data={nt} />)
        ) : (
          <EmptyComponent />
        )
      ) : (
        <View />
      )}
      {component === 'reposcommits' ? (
        data ? (
          data.map((nt, index) => (
            <Repos_Commit_List_Item key={index} data={nt} />
          ))
        ) : (
          <EmptyComponent />
        )
      ) : (
        <View />
      )}

      {component === 'readme' ? (
        data ? (
          <View>{markdownToNative(data)}</View>
        ) : (
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
