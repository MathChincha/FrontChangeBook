import React from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import Header from '../../components/Header';
import InsideCategory from '../../components/InsideCategory';

export default function Técnicos({navigation}){
    return(
        <View style={ styles.container }>
            <Header navigation={navigation}></Header>
            <ScrollView>
                <InsideCategory navigation={navigation} name = 'Administração'></InsideCategory>
                <InsideCategory navigation={navigation} name = 'Agricultura'></InsideCategory>
                <InsideCategory navigation={navigation} name = 'Antropologia'></InsideCategory>
                <InsideCategory navigation={navigation} name = 'Arqueologia'></InsideCategory>
                <InsideCategory navigation={navigation} name = 'Arquitetura'></InsideCategory>
                <InsideCategory navigation={navigation} name = 'Artes'></InsideCategory>
                <InsideCategory navigation={navigation} name = 'Astronomia'></InsideCategory>
                <InsideCategory navigation={navigation} name = 'Biologia'></InsideCategory>
                <InsideCategory navigation={navigation} name = 'Botânica'></InsideCategory>
                <InsideCategory navigation={navigation} name = 'Brasil'></InsideCategory>
                <InsideCategory navigation={navigation} name = 'Ciência Política'></InsideCategory>
                <InsideCategory navigation={navigation} name = 'Ciências Exatas'></InsideCategory>
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