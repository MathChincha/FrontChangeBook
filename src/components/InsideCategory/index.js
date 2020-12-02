import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';

export default function InsideCategory({name, navigation}){
   function handleSubmit(){
        navigation.navigate('CategoryBook',{
            name: name
        })
    };
    return(
        <TouchableOpacity onPress={handleSubmit}>
            <View style={styles.container}>
                <Text style={styles.text}>{name}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
        container:{
            borderRadius:20,
            marginTop: 10,
            height: 30,
            alignItems:'center',
            justifyContent:'center',
            backgroundColor:"#20587A"
        },
        text:{
            fontSize: 20,
            color:'#fff'
        }
});