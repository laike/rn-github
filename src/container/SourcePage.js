//这个是源代码显示页面，这部分我使用react-native-router-flux这个第三方库的wrap属性
//来实现代码层层嵌套问题，不用准备树形显示，这样简单方便
import React, { useEffect, useContext, useState, useRef } from 'react';
import { Text, View, StyleSheet, RefreshControl, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import http from '../untils/http';
import TouchFeedbackItem from '../components/TouchFeedbackItem';
//引入计算问价大小的npm包
import filesize from 'filesize'
import { toast } from '../untils/untils';
const SourcePage = ({ url, }) => {
    const [loading, setLoading] = useState(false);
    const [sources, setSources] = useState([]);
    function load() {
        setLoading(true)
        http.get(url)
            .then(res => {
                setSources(res.data);
                setLoading(false);
            })
            .catch(err => {
                toast('获取仓库信息失败！请稍后重试');
            });
    }
    function onRefresh() {
        load();
    }

    useEffect(() => {
        load()

    }, [url])

    return (
        <ScrollView style={styles.container}
            refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh} />}>
            {
                sources.length ? sources.map((source, index) => <TouchFeedbackItem
                    key={index}
                    name={source.type === 'dir' ? 'folder' : source.type}
                    title={source.name}
                    size={` 文件大小 ${filesize(source.size, { bits: true })}`}
                    onPress={() => {
                        //这里要判断下，如果是文件类型那么可以直接打开查看code
                        if (source.type === 'file') {
                            //这里还要进一步判断是否是图片格式或者其他格式如果是图片格式
                            //我们可以使用一个插件或者页面打开这个图片来进行查看
                            let reg = new RegExp(/\.png|\.jpg|\.gif|\.jpeg/ig);
                            let jsonreg = new RegExp(/\.json/ig);
                            if (reg.test(source.name)) {

                                Actions.push('PicturesPage', {
                                    url: source.download_url,
                                    title: source.path
                                });
                            } else {
                                Actions.push('CodeFilePage', {
                                    url: source.url,
                                    title: source.path
                                });
                            }

                        } else if (source.type === 'dir') {
                            Actions.push('SourcePage', {
                                title: source.path,
                                url: source.url
                            });
                        }

                    }} />) : <View />
            }

        </ScrollView>
    )
}

export default SourcePage;

const styles = StyleSheet.create({

    container: {}
});