//这里是处理markdown文本以及通过webview组件注入JS同时传递参数实现代码预览
//以及自适应相关
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import Markdown, {
    AstRenderer,
    getUniqueID,
    PluginContainer,
    renderRules,
    styles,
} from 'react-native-markdown-renderer';
import { customMarkdownStyle } from '../constants/styles'
import MarkdownIt from 'markdown-it';
const md = MarkdownIt({
    typographer: true,
    linkify: true,
});

export const markdownToNative = (mdText) => {
    if (!mdText) {
        return <View />
    }
    //否则进行处理
    return (
        <Markdown
            children={mdText}
            style={customMarkdownStyle}
        />

    )

}
