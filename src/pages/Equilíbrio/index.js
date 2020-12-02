import React from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import Header from '../../components/Header';
import InsideCategory from '../../components/InsideCategory';

export default function Equilíbrio({navigation}){
    return(
        <View style={ styles.container }>
            <Header navigation={navigation}></Header>
            <ScrollView>               
                <InsideCategory navigation={navigation} name = 'Artesanato'></InsideCategory>
                <InsideCategory navigation={navigation} name = 'Auto Ajuda'></InsideCategory>
                <InsideCategory navigation={navigation} name = 'Culinária'></InsideCategory>
                <InsideCategory navigation={navigation} name = 'Esoterismo'></InsideCategory>
                <InsideCategory navigation={navigation} name = 'Esportes'></InsideCategory>
                <InsideCategory navigation={navigation} name = 'Hobbies'></InsideCategory>
                <InsideCategory navigation={navigation} name = 'Religião'></InsideCategory>               
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
      flex: 1,
      paddingHorizontal: 24,
      backgroundColor: '#3AA1E0'
    }
});