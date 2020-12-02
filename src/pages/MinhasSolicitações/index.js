import React from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import Header from '../../components/Header';
import NewBookTransaction from '../../components/NewBookTransaction';

export default function MinhasSolicitações({navigation}){

    return(
        <View style={ styles.container }>
            <Header navigation={navigation}></Header>
            <Text style={styles.titulo}>Minhas Solicitações</Text>
            <ScrollView>
                <NewBookTransaction navigation={navigation}/>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
      flex: 1,
      paddingHorizontal: 24,
      backgroundColor: '#3AA1E0'
    },
    titulo:{
        fontSize: 30,
        color:"#fff"
    }
});