import React, { Component, useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Keyboard,
    Dimensions,
    StatusBar,
    TouchableHighlight,
    Linking,
    SafeAreaView,
    KeyboardAvoidingView
} from 'react-native';
import TextArea from "@freakycoder/react-native-text-area";
import {
    BG_COLOR,
    TEXT_COLOR,
    STATUS_BAR_STYLE,
    SHADOW_COLOR,
} from '../constants/styles';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';
const { width, height } = Dimensions.get('screen');
import HttpManager from '../untils/http';
import Color from 'color'; import { toast } from '../untils/untils';
const FeedBack = ({
    params,
}) => {

    const [title, setTitle] = useState('');
    const [des, setDes] = useState('');

    const keybord = useRef()
    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', (KeyboardEventData) => {
            console.log('Keyboard Shown');
            console.log(KeyboardEventData.endCoordinates.screenY);
        });

        Keyboard.addListener('keyboardDidHide', (KeyboardEventData) => {
            console.log('Keyboard Hidden');
            console.log(KeyboardEventData.endCoordinates.screenY);
        });
        return () => {
            Keyboard.removeListener('keyboardDidHide')
            Keyboard.removeListener('keyboardDidShow')
        };
    })
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar {...STATUS_BAR_STYLE} />
            <KeyboardAvoidingView ref={keybord}
                behavior={'position'}
                keyboardVerticalOffset={10} style={styles.login}>

                <View style={styles.control_input}>

                    <View style={styles.control}>
                        <Text style={styles.tips}>标题</Text>
                        <TextInput
                            style={styles.input}
                            autoFocus
                            placeholder="标题"
                            value={title}
                            onChangeText={text => {
                                setTitle(text);
                            }}
                        />
                    </View>
                </View>
                <View style={{ height: 150, }}>
                    <View style={styles.control}>
                        <Text style={styles.tips}>描述</Text>
                        <TextArea
                            style={styles.textarea}
                            maxCharLimit={50}
                            placeholderTextColor="black"
                            exceedCharCountColor="#990606"
                            placeholder={"输入您的描述..."}
                        />
                        {/* <TextInput
                            style={styles.input}
                            placeholder="描述"
                            value={des}
                            onChangeText={text => {
                                setDes(text);
                            }}
                        /> */}
                    </View>
                </View>
                <View style={styles.control_submit}>
                    <Button
                        style={styles.submit_btn}
                        onPress={() => {
                            toast('您的反馈已提交，谢谢！我们将根据您的反馈，尽快处理！');
                            Actions.pop();
                        }}>
                        提交反馈
                    </Button>
                </View>


            </KeyboardAvoidingView>
        </SafeAreaView>

    )
}

export default FeedBack;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color(BG_COLOR)
            .darken(0.6)
            .hex(),
        justifyContent: 'center',
        alignItems: 'center',
    },
    login: {
        width: width - 80,
        height: 280,
        backgroundColor: 'rgb(255,255,255)',
        borderRadius: 10,
        shadowColor: SHADOW_COLOR,
        shadowOffset: { x: 18, y: 18 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 5, //android上的阴影效果
    },
    title_container: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
    },
    title: {
        fontSize: 80,
        color: '#000',
    },
    control_input: {
        height: 50,
        flexDirection: 'row',
        margin: 5,
        alignItems: 'center',
    },
    control: {
        flexDirection: 'column',
        flex: 1,
    },
    tips: {
        fontSize: 12,
        color: '#666',
        marginBottom: 3,
        display: 'none',
    },
    input: {
        flex: 1,
        paddingTop: 10,
        paddingBottom: 10,
        fontSize: 16,
    },
    textarea: {
        height: 200,
    },
    icon_container: {
        width: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        fontSize: 25,
    },
    control_submit: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 80,
    },
    submit_btn: {
        width: width - 100,
        backgroundColor: '#000',
        color: TEXT_COLOR,
        fontSize: 14,
        padding: 10,
    },
    reg: {
        fontSize: 12,
        color: '#333',
    },
    regContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

