import React, { useState, useEffect, useRef } from 'react';
import { Text, StyleSheet, View, TouchableNativeFeedback, Platform, TouchableHighlight, Image } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'
moment.locale();
const componentName = ({
    data,
    ...rest
}) => {

    function renderInfo() {
        if (data.type === 'WatchEvent') {
            return (
                <View style={styles.info}>
                    <Text style={styles.a}>{data.actor.login}</Text>
                    <Text> stared </Text>
                    <Text style={styles.a}> {data.repo.name}</Text>
                </View>
            )
        } else if (data.type === 'IssuesEvent') {
            return (
                <View style={styles.info}>
                    <Text style={styles.a}>{data.actor.login}</Text>
                    <Text> {data.payload.action} Issues </Text>
                    <Text style={styles.a}> {data.repo.name}</Text>
                </View>
            )
        } if (data.type === 'IssueCommentEvent') {
            return (
                <View style={styles.info}>
                    <Text style={styles.a}>{data.actor.login}</Text>
                    <Text> {data.payload.action} comment on issue  </Text>
                    <Text style={styles.a}> {data.repo.name}</Text>
                </View>
            )
        } else if (data.type === 'CreateEvent') {
            return (
                <View style={styles.info}>
                    <Text style={styles.a}>{data.actor.login}</Text>
                    <Text> created repository</Text>
                    <Text style={styles.a}> {data.repo.name}</Text>
                </View>
            )
        } else if (data.type === 'PullRequestEvent') {
            return (
                <View style={styles.info}>
                    <Text style={styles.a}>{data.actor.login}</Text>
                    <Text>{data.payload.action} pull request </Text>
                    <Text style={styles.a}> {data.repo.name}</Text>
                </View>
            )
        } else if (data.type === 'PushEvent') {
            return (
                <View style={styles.info}>
                    <Text style={styles.a}>{data.actor.login}</Text>
                    <Text> push to {data.payload.action} </Text>
                    <Text style={styles.a}> {data.repo.name}</Text>
                </View>
            )
        } else if (data.type === 'ForkEvent') {
            return (
                <View style={styles.info}>
                    <Text style={styles.a}>{data.actor.login}</Text>
                    <Text> forked {data.payload.action} </Text>
                    <Text style={styles.a}> {data.repo.name}</Text>
                </View>
            )
        }
    }
    function renderTop() {
        if (data.type === 'WatchEvent') {
            return (
                <View style={styles.top}>
                    <Icon name="star" style={styles.topIcon} />
                    <Text style={styles.topIcon}>{moment(data.created_at, "YYYYMMDD").fromNow()}</Text>
                </View>
            )
        } else if (data.type === 'IssuesEvent') {
            return (
                <View style={styles.top}>
                    <Icon name="star" style={styles.topIcon} />
                    <Text style={styles.topIcon}>{moment(data.created_at, "YYYYMMDD").fromNow()}</Text>
                </View>
            )
        }
        else if (data.type === 'ForkEvent') {
            return (
                <View style={styles.top}>
                    <Icon name="star" style={styles.topIcon} />
                    <Text style={styles.topIcon}>{moment(data.created_at, "YYYYMMDD").fromNow()}</Text>
                </View>
            )
        }
        else if (data.type === 'PushEvent') {
            return (
                <View style={styles.top}>
                    <Icon name="star" style={styles.topIcon} />
                    <Text style={styles.topIcon}>{moment(data.created_at, "YYYYMMDD").fromNow()}</Text>
                </View>
            )
        }
        else if (data.type === 'PullRequestEvent') {
            return (
                <View style={styles.top}>
                    <Icon name="star" style={styles.topIcon} />
                    <Text style={styles.topIcon}>{moment(data.created_at, "YYYYMMDD").fromNow()}</Text>
                </View>
            )
        }
        else if (data.type === 'CreateEvent') {
            return (
                <View style={styles.top}>
                    <Icon name="star" style={styles.topIcon} />
                    <Text style={styles.topIcon}>{moment(data.created_at, "YYYYMMDD").fromNow()}</Text>
                </View>
            )
        }
        else if (data.type === 'IssueCommentEvent') {
            return (
                <View style={styles.top}>
                    <Icon name="star" style={styles.topIcon} />
                    <Text style={styles.topIcon}>{moment(data.created_at, "YYYYMMDD").fromNow()}</Text>
                </View>
            )
        }
    }

    return (
        Platform.OS === 'android' ? <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple()} >
            <View style={styles.item}>
                {
                    renderTop()
                }
                <View style={styles.left}>
                    <Image source={require("../data/images/github.png")} style={styles.icon} />
                    {renderInfo()}
                </View>
                <View style={styles.des}>
                    {
                        (data.type === 'IssuesEvent' || data.type === 'IssueCommentEvent') ? <Text>{data.payload.issue.title}</Text> : <View />
                    }
                    {
                        data.type === 'CreateEvent' ? <Text>{data.payload.description}</Text> : <View />
                    }
                </View>

            </View>
        </TouchableNativeFeedback> :
            <TouchableHighlight  >
                <View style={styles.item}>
                    <View style={styles.top}>
                        {
                            renderTop()
                        }
                    </View>
                    <View style={styles.left}>
                        <Image source={{ uri: data.actor.avatar_url }} style={styles.icon} />
                        {renderInfo()}
                    </View>
                </View>
            </TouchableHighlight>
    )
}

export default componentName;

const styles = StyleSheet.create({
    item: {
        flexDirection: 'column',
        margin: 5,
        borderBottomColor: '#999',
        borderBottomWidth: 0.3,

    },
    des: {
        padding: 5,
    },
    top: {
        flexDirection: "row",
        alignItems: "center",
        padding: 5,
    },
    info: { flexDirection: "row" },
    left: {
        flexDirection: 'row',
        alignItems: "center",
        padding: 5,
    },
    icon: { width: 30, height: 30, padding: 5, },
    topIcon: {
        fontSize: 12,
        paddingRight: 5,
    },
    a: {
        color: 'blue',
        paddingLeft: 5,
    },
    right: {
        paddingRight: 10,
    },
    text: {
        fontSize: 16,
        paddingLeft: 10,
    },
    small: {
        fontSize: 12,
        color: '#999',
    }
})
