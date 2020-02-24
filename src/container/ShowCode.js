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
import CommonInfo from '../components/CommonInfo';
export default class ShowCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            repo: {},
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
        http.get('https://api.github.com/repos/laike/GSYGithubAPP')
            .then(res => {
                console.log('https://api.github.com/repos/laike/GSYGithubAPP');
                console.log(res);
                this.setState({
                    loading: false,
                    repo: res.data
                })
            })
            .catch(err => {
                toast('获取仓库信息失败！请稍后重试');
            });
    }
    onRefresh() {
        this.load();
    }

    render() {
        return (
            <ScrollView style={styles.container} refreshControl={<RefreshControl refreshing={this.state.loading} onRefresh={this.onRefresh.bind(this)} />}>

                <CommonHeader type={'repo'} data={this.state.repo} />

                <CommonToolBar
                    data={[
                        { label: 'Stagazers', data: this.state.repo.stargazers_count },
                        { label: 'Watchers', data: this.state.repo.watchers_count },
                        { label: 'Forks', data: this.state.repo.forks_count }
                    ]} />

                <CommonInfo data={this.state.repo} />


                <View style={styles.list}>
                    <TouchFeedbackItem name="rss" title="Events" onPress={() => {
                        Actions.push('NewsPage', {
                            url: `users/${this.state.repo.owner.login}/events`
                        });
                    }} />
                    <TouchFeedbackItem name="info-circle" title="Issues" onPress={() => {
                        Actions.push('IssuesPage', {});
                    }} />
                    <TouchFeedbackItem name="file-text" title="Readme" onPress={() => {
                        Actions.push('RepositoryDetailPage', { full_name: this.state.repo.full_name, title: this.state.repo.full_name });
                    }} />

                </View>

                <View style={styles.list}>
                    <TouchFeedbackItem name="crosshairs" title="Commits" onPress={() => {
                        Actions.push('ProfilePage', {});
                    }} />
                    <TouchFeedbackItem name="retweet" title="Pull Requests" onPress={() => {
                        Actions.push('ProfilePage', {});
                    }} />
                    <TouchFeedbackItem name="code" title="Sources" onPress={() => {
                        Actions.push('ProfilePage', {});
                    }} />
                </View>
                <View style={styles.list}>
                    {/* 是否有主页根据homepage这个参数来判定 */}
                    {
                        this.state.repo.homepage ? <TouchFeedbackItem name="chrome" title="Website" onPress={() => {
                            Actions.push('WebPage', {
                                source: {
                                    uri: this.state.repo.homepage,
                                },
                                title: this.state.repo.homepage,

                            });
                        }} /> : <View />
                    }
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