import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, Image, Platform } from 'react-native';
import { toast } from '../untils/untils';
import http from '../untils/http';
import TouchFeedbackItem from '../components/TouchFeedbackItem';
import { TouchableHighlight, TouchableNativeFeedback } from 'react-native-gesture-handler';
import Color from 'color';
import { BG_COLOR, MAIN_COLOR, TEXT_COLOR } from '../constants/styles';
import { Actions } from 'react-native-router-flux';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
import CommonDetailForTab from '../components/CommonDetailForTab';
const renderScene = SceneMap({
    notread: CommonDetailForTab,
    readed: CommonDetailForTab,
})
const renderTabBar = (props) =>
    (<TabBar {...props} scrollEnabled indicatorStyle={styles.indicatorStyle}
        style={styles.tabbar}
        labelStyle={styles.labelStyle}
        tabStyle={styles.tabStyle}
    />)
export default class Issues extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            routes: [
                { key: 'notread', title: '开启', url: '' },
                { key: 'readed', title: '关闭', url: '' },
            ]
        };
    }

    onIndexChange(index) {
        this.setState({
            index
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <TabView
                    lazy
                    navigationState={this.state}
                    renderScene={renderScene}
                    renderTabBar={renderTabBar}
                    onIndexChange={this.onIndexChange.bind(this)}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: TEXT_COLOR,
        flex: 1,
    },
    tabbar: {
        backgroundColor: Color(BG_COLOR).darken(0.6).hex(),
    },
    tabStyle: {
        borderBottomColor: TEXT_COLOR,
        borderBottomWidth: 0.3,
    },
    labelStyle: {}
})