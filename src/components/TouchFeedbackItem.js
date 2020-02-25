import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableNativeFeedback, Platform, TouchableHighlight } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'
import momentLocaleZhCn from 'moment/locale/zh-cn'
moment.updateLocale('zh-cn', momentLocaleZhCn);
export default class TouchFeedbackItem extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            Platform.OS === 'android' ? <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple()} {...this.props}>
                <View style={styles.item}>
                    <View style={styles.left}>
                        {
                            this.props.name ? <Icon name={this.props.name} style={[styles.icon, this.props.iconStyle]} />
                                : <View />
                        }
                        <View style={styles.subinfo}>
                            {this.props.title ? <Text style={[styles.text, this.props.textStyle]}>{this.props.title}</Text> : <View />}
                            {this.props.size ? <Text style={[styles.size, this.props.sizeStyle]}>{this.props.size}</Text> : <View />}
                            {this.props.updated_at ? <Text style={[styles.text, this.props.small]}>{moment(this.props.updated_at, "YYYYMMDD").fromNow()}</Text> : <View />}
                        </View>
                    </View>
                    {
                        this.props.hideArrow ? <View /> : <View style={styles.right}>
                            {this.props.rightTitle ? <Text style={styles.rightTitle}>{this.props.rightTitle}</Text> : <View />}
                            <Icon name={'arrow-right'} style={styles.rightarrow} />
                        </View>
                    }
                </View>
            </TouchableNativeFeedback> :
                <TouchableHighlight  >
                    <View style={styles.item}>
                        <View style={styles.left}>
                            {
                                this.props.name ? <Icon name={this.props.name} style={[styles.icon, this.props.iconStyle]} />
                                    : <View />
                            }
                            <View style={styles.subinfo}>
                                {this.props.title ? <Text style={[styles.text, this.props.textStyle]}>{this.props.title}</Text> : <View />}

                                {this.props.updated_at ? <Text style={[styles.text, this.props.small]}>{moment(this.props.updated_at, "YYYYMMDD").fromNow()}</Text> : <View />}
                            </View>
                        </View>
                        {
                            this.props.hideArrow ? <View /> : <View style={styles.right}>
                                {this.props.rightTitle ? <Text style={styles.rightTitle}>{this.props.rightTitle}</Text> : <View />}
                                <Icon name={'arrow-right'} style={styles.rightarrow} />
                            </View>
                        }
                    </View>
                </TouchableHighlight>
        )
    }
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        padding: 10,
        flex: 1,
        alignItems: 'center',
        borderBottomColor: '#ddd',
        borderBottomWidth: 0.3,
        marginBottom: 3,
    },
    left: { flex: 1, flexDirection: 'row', alignItems: 'center', paddingRight: 20 },
    icon: { fontSize: 18 },
    right: {
        paddingRight: 10,
        flexDirection: 'row',
        alignItems: "center",
    },
    text: {
        fontSize: 16,
        paddingLeft: 15,
    },
    small: {
        fontSize: 12,
        color: '#999',
    }, rightTitle: {
        paddingLeft: 5,
        paddingRight: 5,
        fontSize: 18,
        color: "#999"
    },
    title: {

    },
    size: {
        fontSize: 12,
        paddingLeft: 15,
        paddingTop: 5,
    }
})
