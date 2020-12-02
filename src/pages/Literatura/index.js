import React from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import Header from '../../components/Header';
import InsideCategory from '../../components/InsideCategory';

export default function Literatura({navigation}){
    return(
        <View style={ styles.container }>
            <Header navigation={navigation}/>
            <ScrollView>
                <InsideCategory navigation={navigation} name = 'Biografia'></InsideCategory>
                <InsideCategory navigation={navigation} name = 'Coleções'></InsideCategory>
                <InsideCategory navigation={navigation} name = 'Comportamento'></InsideCategory>
                <InsideCategory navigation={navigation} name = 'Contos'></InsideCategory>
                <InsideCategory navigation={navigation} name = 'Crítica Literária'></InsideCategory>
                <InsideCategory navigation={navigation} name = 'Ficção Científica'></InsideCategory>
                <InsideCategory navigation={navigation} name = 'Folclore'></InsideCategory>
                <InsideCategory navigation={navigation} name = 'Genealogia'></InsideCategory>
                <InsideCategory navigation={navigation} name = 'Humor'></InsideCategory>
                <InsideCategory navigation={navigation} name = 'Infanto Juvenis'></InsideCategory>
                <InsideCategory navigation={navigation} name = 'Jornais'></InsideCategory>
                <InsideCategory navigation={navigation} name = 'Literatura Brasileira'></InsideCategory>
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