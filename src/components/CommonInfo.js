import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import TouchFeedbackItem from '../components/TouchFeedbackItem'
import { TEXT_COLOR } from '../constants/styles';
import { SCREEN_WIDTH } from '../constants/constants';
import http from '../untils/http';
import filesize from 'filesize'
import moment from 'moment'
import momentLocaleZhCn from 'moment/locale/zh-cn'
import { Actions } from 'react-native-router-flux';
moment.updateLocale('zh-cn', momentLocaleZhCn);
const CommonInfo = ({
    data,
}) => {
    const [repo, setRepo] = useState(data);
    const [brances, setBrances] = useState('0');

    useEffect(() => {
        setRepo(data)
        console.log(repo);
        //这里进行更新
        // http.get(repo.branches_url.replace(/\{\/branches\}/, '')).then(res => {
        //     setBrances(res.data.length);
        // }).catch(err => {
        //     if (__DEV__) {
        //         console.log(err);
        //     }
        // });
    }, [data])


    return (<View style={styles.container} >
        <View style={styles.item}>
            <TouchFeedbackItem
                name='lock'
                title={repo.private ? "Private" : " Public "}
                hideArrow
            />
        </View>
        <View style={styles.item}>
            <TouchFeedbackItem
                name='code'
                title={repo.language ? repo.language : " null "}
                hideArrow
            />
        </View>
        <View style={styles.item}>
            <TouchFeedbackItem
                name='info-circle'
                title={repo.has_issues ? `${repo.open_issues_count}` : "0"}
                hideArrow
            />
        </View>
        <View style={styles.item}>
            <TouchFeedbackItem
                name='share-alt'
                title={brances}
                hideArrow
            />
        </View>
        <View style={styles.item}>
            <TouchFeedbackItem
                name='calendar'
                title={repo.created_at ? moment(repo.created_at).format('YYYY年 MMM Do ') : 'null '}
                hideArrow

            />
        </View>
        <View style={styles.item}>
            <TouchFeedbackItem
                name='archive'
                title={repo.size ? filesize(repo.size) : '0 Kb'}
                hideArrow
            />
        </View>

        <View style={styles.info}>
            <TouchFeedbackItem
                name='male'
                title="Owner"
                rightTitle={repo.owner ? repo.owner.login : 'null'}
                onPress={() => {
                    Actions.push('ProfilePage', {
                        url: `users/${repo.owner ? repo.owner.login : ''}`
                    });
                }}
            />
        </View>


    </View >)
}

export default CommonInfo;

const styles = StyleSheet.create({
    container: {
        backgroundColor: TEXT_COLOR,
        marginTop: 30,
        flexDirection: "row",
        flexWrap: "wrap"
    },
    item: {
        width: SCREEN_WIDTH / 2,
        borderRightColor: '#ddd',
        borderRightWidth: 0.3
    },
    info: {
        width: SCREEN_WIDTH,
        borderColor: '#ddd',
        borderWidth: 0.3
    }
});
