import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Color from 'color';
import { TEXT_COLOR, BG_COLOR } from '../constants/styles';
import { SCREEN_WIDTH } from '../constants/constants';

//使用react hooks 实例
const CommonHeader = ({ data = {}, ...rest }) => {
    //定义state
    const [user, setUser] = useState(data);
    const avatar = useRef(null);
    //相当于componentDidMount 和componentDidUpdate
    useEffect(() => {
        setUser(data);
    }, [data])
    return (<View style={styles.header}>
        <Image ref={avatar} source={require('../data/images/github2.png')} style={styles.avatar} onPartialLoad={() => {
            this.avatar.source = require('../data/images/github.png');
        }} />
        <Text style={styles.nickname}>{user.login ? user.login : "还没有昵称"}</Text>
        <Text style={styles.bio}>{user.bio ? user.bio.replace('\n', '') : '这个人很懒还没有写描述'}</Text>
        <Text style={styles.company}>{user.company ? user.company : '这个人还没有填写公司'}</Text>
        <Text style={styles.blog}>{user.blog ? user.blog : '这个人还没有开通博客'}</Text>
        <Text style={styles.location}>{user.location ? user.location : '没有定位'}</Text>
    </View>)
};

export default CommonHeader;
const styles = StyleSheet.create({
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
    bio: {
        color: TEXT_COLOR,
        padding: 4,
    },
    company: {
        color: TEXT_COLOR,
        padding: 4,
    },
    blog: {
        color: BG_COLOR,
        padding: 4,

    },
    location: {
        color: TEXT_COLOR,
        padding: 4,
        marginBottom: 10,
    }


})