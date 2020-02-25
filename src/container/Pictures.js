import React, { useEffect, useContext, useState, useRef } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import ImageViewer from 'react-native-image-zoom-viewer'
import { toast } from '../untils/untils';
import { TEXT_COLOR } from '../constants/styles';
const Pictures = ({ url = '' }) => {
    const images = [];
    let quit = false;
    console.log('download_url', url);
    //将图片添加到相册列表中
    images.push({ url: url });
    return (<View style={styles.container}>
        <ImageViewer
            imageUrls={images}
            onSaveToCamera={() => {
                toast('图片已经保存到相册了！')
            }}
            onClick={() => {
                if (quit) {
                    return;
                }
                quit = true;
                Actions.pop();
            }}
            loadingRender={() => {
                return (
                    <View style={styles.loading}>
                        <ActivityIndicator style={styles.indicator} />
                        <Text style={styles.loadingText}>正在加载图片请稍后....</Text>
                    </View>
                )
            }}
        />
    </View>)

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: TEXT_COLOR
    },
    loading: {
        justifyContent: "center",
        alignItems: "center"
    },
    indicator: {
        width: 50,
        height: 50,
    },
    loadingText: {
        textAlign: "center",
        fontSize: 18,
        color: TEXT_COLOR,
        padding: 10,
    }
});

export default Pictures