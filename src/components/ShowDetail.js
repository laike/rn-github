import React, { Component, useState, useEffect } from 'react'
import { Text, ScrollView, StyleSheet, Image, RefreshControl } from 'react-native'
import { BG_COLOR } from '../constants/styles'
import http from '../untils/http';
import { toast } from '../untils/untils';
import EventListItem from './EventListItem';
import EmptyComponent from './EmptyComponent';

const ShowDetail = ({ url }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    function load() {
        setLoading(true);
        http.get(url)
            .then(res => {
                console.log(res);
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
    }, [url]) //这一步优化很重要

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
                ? data.map((nt, index) => <EventListItem key={index} data={nt} />) : <EmptyComponent />
            }
        </ScrollView>
    )

}
export default ShowDetail

const styles = StyleSheet.create({
    container: {

    },
    content: {

    },
    text: {
        color: BG_COLOR
    }
})