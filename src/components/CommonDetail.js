import React, { Component, useState, useEffect } from 'react'
import { Text, ScrollView, StyleSheet, Image, RefreshControl, View } from 'react-native'
import { BG_COLOR } from '../constants/styles'
import http from '../untils/http';
import { toast } from '../untils/untils';
import EventListItem from './EventListItem';
import EmptyComponent from './EmptyComponent';
import { markdownToNative } from '../untils/MdHtmlUntils';
import { getActiveChildNavigationOptions } from 'react-navigation';
import Home_List_Item from './Home_List_Item';

function HOC() { }

const CommonDetail = ({ url, component, initial = [] }) => {
    const [data, setData] = useState(initial);
    const [loading, setLoading] = useState(false);
    console.log(component, url);

    function getHttp() {
        if (component === 'readme') {
            return http.get(url, {
                headers: { Accept: 'application/vnd.github.3.raw+json' },
                params: { branch: 'master' },
            })
        } else {
            return http.get(url)
        }
    }

    function load() {
        setLoading(true);
        getHttp()
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
            {
                !component ? data ? data.map((nt, index) => <EventListItem key={index} data={nt} />) : <EmptyComponent /> : <View />
            }
            {
                component === 'readme' ? data ? <View>{markdownToNative(data)}</View> : <EmptyComponent /> : <View />
            }
            {
                component === 'myrespositories' ? data.length > 0 ? data.map((item, index) => <Home_List_Item
                    key={index}
                    data={item}

                />) : <EmptyComponent /> : <View />
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