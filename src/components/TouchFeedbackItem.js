import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableNativeFeedback, Platform, TouchableHighlight } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
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
                        <Text style={[styles.text, this.props.textStyle]}>{this.props.title ? this.props.title : 'tile'}</Text>
                    </View>
                    {
                        this.props.hideArrow ? <View /> : <View style={styles.right}>
                            <Icon name={'arrow-right'} style={styles.rightarrow} />
                        </View>
                    }
                </View>
            </TouchableNativeFeedback> :
                <TouchableHighlight  >
                    <View style={styles.item}>
                        <View style={styles.left}>
                            <Icon name={this.props.name ? this.props.name : 'wechat'} style={[styles.icon, this.props.iconStyle]} />
                            <Text style={[styles.text, this.props.textStyle]}>{this.props.title ? this.props.title : 'tile'}</Text>
                        </View>
                        <View style={styles.right}>
                            <Icon name={'arrow-right'} style={styles.rightarrow} />
                        </View>
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

    },
    text: {
        fontSize: 16,
        paddingLeft: 10,
    },
})
