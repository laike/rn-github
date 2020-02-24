import React, { Component, useState, useEffect } from 'react'
import { Text, ScrollView, StyleSheet, Image, RefreshControl, View } from 'react-native'
import { BG_COLOR } from '../constants/styles'
import http from '../untils/http';
import { toast } from '../untils/untils';
import EventListItem from './EventListItem';
import EmptyComponent from './EmptyComponent';
import { markdownToNative } from '../untils/MdHtmlUntils';
import Home_List_Item from './Home_List_Item';
import User_List_Item from './User_List_Item';


const CommonDetailForTab = ({ route }) => {
    const { url, component, initial = [] } = route;
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

    function setResponse(res) {
        if (component === 'search/reponsitories' || component === 'search/users') {
            //提示用户搜索到了多少条数据
            toast(`一共找到了${res.data.items.length}条数据!`);
            setData(res.data.items);

        } else {
            setData(res.data);
        }
    }

    function load() {
        setLoading(true);
        getHttp()
            .then(res => {

                setLoading(false);
                setResponse(res);

            })
            .catch(err => {
                console.log(err);
                toast('数据获取失败！请下拉刷新重新获取数据！', 3000);
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
            {component === 'normal' ? data.length > 0
                ? data.map((nt, index) =>
                    <TouchFeedbackItem
                        key={index}
                        name="exclamation-circle"
                        title={`${nt.subject.title.substr(0, 20)}.....`}
                        updated_at={nt.updated_at}
                        iconStyle={{ fontSize: 33, }} textStyle={{ fontSize: 14, }} />)
                : <EmptyComponent /> : <View />
            }
            {
                !component ? data ? data.map((nt, index) => <EventListItem key={index} data={nt} />) : <EmptyComponent /> : <View />
            }
            {
                component === 'readme' ? data ? <View>{markdownToNative(data)}</View> : <EmptyComponent /> : <View />
            }
            {
                (component === 'search/reponsitories' || component === 'myrespositories') ? data.length > 0 ? data.map((item, index) => <Home_List_Item
                    key={index}
                    data={item}

                />) : <EmptyComponent /> : <View />
            }
            {
                (component === 'search/users') ? data.length > 0 ? data.map((item, index) => <User_List_Item
                    key={index}
                    data={item}

                />) : <EmptyComponent /> : <View />
            }

        </ScrollView>
    )

}
export default CommonDetailForTab

const styles = StyleSheet.create({
    container: {

    },
    content: {

    },
    text: {
        color: BG_COLOR
    }
})