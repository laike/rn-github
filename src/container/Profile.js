import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, Image, Platform } from 'react-native';
import { toast } from '../untils/untils';
import http from '../untils/http';
import TouchFeedbackItem from '../components/TouchFeedbackItem';
import { TouchableHighlight, TouchableNativeFeedback } from 'react-native-gesture-handler';
import Color from 'color';
import { BG_COLOR, MAIN_COLOR, TEXT_COLOR } from '../constants/styles';
import { Actions } from 'react-native-router-flux';
import WebViewComponent from '../components/WebViewComponent';
import { GH_CHART_API, SCREEN_WIDTH } from '../constants/constants';
import CommonHeader from '../components/CommonHeader';
import CommonToolBar from '../components/CommonToolBar'
export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                followers: 0,
                following: 0,
            },
            loading: false,
        };
    }
    componentDidMount() {
        //进行请求获取用户信息
        this.load();
    }

    load() {
        this.setState({
            loading: true,
        })
        console.log(http.getToken());
        http.get('https://api.github.com/user')
            .then(res => {
                this.setState({
                    loading: false,
                    user: res.data
                })
            })
            .catch(err => {
                toast('用户信息获取失败！');
            });
    }
    onRefresh() {
        this.load();
    }

    render() {
        return (
            <ScrollView style={styles.container} refreshControl={<RefreshControl refreshing={this.state.loading} onRefresh={this.onRefresh.bind(this)} />}>
                <CommonHeader data={this.state.user} />
                <WebViewComponent source={{ uri: `${GH_CHART_API}${this.state.user.login}` }}
                    style={styles.commits}
                    scrollEnabled={true}
                />
                {/* <WebViewComponent source={{ uri: 'file:///android_asset/template.html' }}
                    style={styles.commits}
                    scrollEnabled={true}
                /> */}
                <CommonToolBar data={[{ label: 'Followers', data: this.state.user.followers },
                { label: 'Following', data: this.state.user.following }]} />
                <View style={styles.list}>
                    <TouchFeedbackItem name="rss" title="Events" onPress={() => {
                        Actions.push('ProfilePage', {});
                    }} />
                    <TouchFeedbackItem name="group" title="Organizations" onPress={() => {
                        Actions.push('ProfilePage', {});
                    }} />
                    <TouchFeedbackItem name="book" title="Respositories" onPress={() => {
                        Actions.push('ProfilePage', {});
                    }} />
                    <TouchFeedbackItem name="git" title="Gists" onPress={() => {
                        Actions.push('ProfilePage', {});
                    }} />
                </View>
            </ScrollView >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: MAIN_COLOR
    },
    header: {
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Color(BG_COLOR).darken(0.6).hex()
    },
    avatar: {
        width: 100,
        height: 100,
    },
    nickname: {
        fontSize: 20,
        color: TEXT_COLOR
    },
    subitem: {
        flexDirection: 'column', flex: 1,
        alignItems: "center",
        justifyContent: "center", height: 60,
    },
    num: { fontSize: 14, textAlign: "center" },
    info: {
        fontSize: 18,
        textAlign: "center"
    },
    toolbar: {
        flexDirection: 'row',
        backgroundColor: TEXT_COLOR
    },
    list: {
        marginTop: 10,
        backgroundColor: TEXT_COLOR
    },
    commits: {
        height: 90,
        width: SCREEN_WIDTH * 2,
    },
    bio: {
        color: TEXT_COLOR,
        padding: 4,
    },
    company: {
        color: TEXT_COLOR,
        padding: 4,
    },
    blog: {
        color: TEXT_COLOR,
        padding: 4,
    },
    location: {
        color: TEXT_COLOR,
        padding: 4,
        marginBottom: 10,
    }


})