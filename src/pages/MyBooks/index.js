import React from 'react';
import { TouchableOpacity, View, StyleSheet, Text, ScrollView, SafeAreaView } from 'react-native';
import Header from '../../components/Header';
import ListBook from '../../components/ListBook';

export default function MyBooks({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <Header navigation={navigation}></Header>
            <ScrollView>
            <ListBook navigation={navigation}/>
            </ScrollView>
            <View style={styles.bottom}>
                <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('NewBook') }}>
                    <Text style={styles.text}>+</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        backgroundColor: '#3AA1E0'
    },
    button: {
        paddingBottom: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#2AF0A1",
        width: 50,
        height: 50,
        borderRadius: 40,
        marginTop: 10,
    },
    bottom: {
        paddingLeft: 250,
        paddingBottom: 20,
        alignItems: 'center',
        flex: 1,
        justifyContent: 'flex-end'
    },
    text: {
        fontSize: 40,
        color: "#fff"
    }
});