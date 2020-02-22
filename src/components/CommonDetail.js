import React, { Component } from 'react'
import { Text, ScrollView, StyleSheet, Image, RefreshControl } from 'react-native'
import { BG_COLOR } from '../constants/styles'
import http from '../untils/http';
import { toast } from '../untils/untils';
import TouchFeedbackItem from './TouchFeedbackItem';
import EmptyComponent from './EmptyComponent';

export default class CommonDetail extends Component {
    constructor(props) {
        super(props);
        const { route } = props;
        this.state = {
            data: [],
            loading: false,
        }
        this.url = 'notifications'
        //这里我们要判断是哪个页面根据
        if (route.key === 'notread') {
            this.url = `notifications?participating=true`
            this.load();

        } else if (route.key === 'readed') {
            this.url = `notifications?participating=false`
            this.load();

        } else if (route.key === 'all') {
            this.url = `notifications?all=true`
            this.load();
        }
    }
    load() {
        this.setState({
            loading: true,
        })
        console.log(this.url);
        console.log('token is', http.getToken());
        http.get(this.url)
            .then(res => {

                this.setState({
                    loading: false,
                    data: res.data
                })
            })
            .catch(err => {
                console.log(err);
                toast('数据获取失败！');
            });
    }
    onRefresh() {
        this.load()
    }
    render() {
        return (
            <ScrollView style={styles.container}
                contentContainerStyle={styles.content}
                refreshControl={<RefreshControl refreshing={this.state.loading}
                    onRefresh={this.onRefresh.bind(this)}
                />}
            >
                {this.state.data.length > 0
                    ? this.state.data.map((nt, index) => <TouchFeedbackItem key={index} name="" title={nt.subject.title}
                        hideArrow={true} textStyle={{ fontSize: 14, }} />) : <EmptyComponent />
                }
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {


    },
    content: {

    },
    text: {
        color: BG_COLOR
    }
})