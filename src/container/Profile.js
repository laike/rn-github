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
                <View style={styles.header}>
                    <Image ref={(ref) => {
                        this.avatar = ref;
                    }} source={require('../data/images/github2.png')} style={styles.avatar} onPartialLoad={() => {
                        this.avatar.source = require('../data/images/github.png');
                    }} />
                    <Text style={styles.nickname}>{this.state.user.login ? this.state.user.login : "还没有昵称"}</Text>
                    <Text style={styles.bio}>{this.state.user.bio ? this.state.user.bio.replace('\n', '') : '这个人很懒还没有写描述'}</Text>
                    <Text style={styles.company}>{this.state.user.company ? this.state.user.company : '这个人还没有填写公司'}</Text>
                    <Text style={styles.blog}>{this.state.user.blog ? this.state.user.blog : '这个人还没有开通博客'}</Text>
                    <Text style={styles.location}>{this.state.user.location ? this.state.user.location : '没有定位'}</Text>

                </View>

                <WebViewComponent source={{ uri: `${GH_CHART_API}${this.state.user.login}` }}
                    style={styles.commits}
                    scrollEnabled={true}

                />

                <View style={styles.toolbar}>
                    {
                        Platform.OS === 'android' ? <View style={styles.subitem}>
                            <TouchableNativeFeedback>
                                <Text style={styles.num}>{this.state.user.followers}</Text>
                                <Text style={styles.info} >Followers</Text>
                            </TouchableNativeFeedback>
                        </View> : <View style={styles.subitem}>
                                <TouchableHighlight >
                                    <Text style={styles.num}>{this.state.user.followers}</Text>
                                    <Text style={styles.info} >Followers</Text>
                                </TouchableHighlight>
                            </View>
                    }
                    {
                        Platform.OS === 'android' ? <View style={styles.subitem}>
                            <TouchableNativeFeedback >
                                <Text style={styles.num}>{this.state.user.following}</Text>
                                <Text style={styles.info} >Following</Text>
                            </TouchableNativeFeedback>
                        </View> : <View style={styles.subitem}>
                                <TouchableHighlight >
                                    <Text style={styles.num}>{this.state.user.following}</Text>
                                    <Text style={styles.info} >Following</Text>
                                </TouchableHighlight>
                            </View>
                    }
                </View>
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