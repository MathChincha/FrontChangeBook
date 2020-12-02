import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../../components/Header';
import NewBooks from '../../components/NewBooks';

export default function NewBook({ navigation }) {

    return (
        <View style={styles.container}>
            <Header navigation={navigation} />
                <NewBooks navigation={navigation} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        backgroundColor: '#3AA1E0'
    },
});