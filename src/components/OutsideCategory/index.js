import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';

export default function OutsideCategory({name}){
    return(
            <View style={styles.container}>
                <Text style={styles.text}>{name}</Text>
            </View>
    );
};

const styles = StyleSheet.create({
        container:{
            alignSelf: "stretch",
            borderRadius:20,
            marginTop: 10,
            height: 230,
            alignItems:'center',
            justifyContent:'center',
            backgroundColor:"#20587A"
        },
        text:{
            fontSize: 20,
            color:'#fff'
        }
});