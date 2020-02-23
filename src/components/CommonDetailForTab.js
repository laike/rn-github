import React, { Component, useState, useRef, useEffect } from 'react'
import { Text, ScrollView, StyleSheet, Image, RefreshControl } from 'react-native'
import { BG_COLOR } from '../constants/styles'
import http from '../untils/http';
import { toast } from '../untils/untils';
import TouchFeedbackItem from './TouchFeedbackItem';
import EmptyComponent from './EmptyComponent';

const CommonDetail = ({ route, }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    function load() {
        setLoading(true);
        http.get(route.url)
            .then(res => {
                setLoading(false);
                setData(res.data);
            })
            .catch(err => {
                console.log(err);
                toast('数据获取失败！');
            });
    }


    useEffect(() => {

        load();

    }, [route.url])

    return (
        <ScrollView style={styles.container}
            contentContainerStyle={styles.content}
            refreshControl={<RefreshControl refreshing={loading}
                onRefresh={() => {
                    load();
                }}
            />}
        >
            {data.length > 0
                ? data.map((nt, index) =>
                    <TouchFeedbackItem
                        key={index}
                        name="exclamation-circle"
                        title={`${nt.subject.title.substr(0, 20)}.....`}
                        updated_at={nt.updated_at}
                        iconStyle={{ fontSize: 33, }} textStyle={{ fontSize: 14, }} />)
                : <EmptyComponent />
            }
        </ScrollView>
    )
}
export default CommonDetail

const styles = StyleSheet.create({
    container: {


    },
    content: {

    },
    text: {
        color: BG_COLOR
    }
})