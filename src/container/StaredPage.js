/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { StyleSheet, StatusBar, View } from 'react-native';

import { STATUS_BAR_STYLE, BG_COLOR, TEXT_COLOR } from '../constants/styles';
import CommonDetail from '../components/CommonDetail'

const StaredPage = (props) => {

    return (
        <View style={styles.container}>
            <StatusBar {...STATUS_BAR_STYLE} />
            <CommonDetail url={`users/laike/starred`} component={'myrespositories'} />
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default StaredPage;
