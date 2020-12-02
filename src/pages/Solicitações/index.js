import React from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import Header from '../../components/Header';
import OldBookTransaction from '../../components/OldBookTransaction';

export default function Solicitações({navigation}){

    return(
        <View style={ styles.container }>
            <Header navigation={navigation}></Header>
            <Text style={styles.titulo}>Solicitações de Usuários</Text>
            <ScrollView>
                <OldBookTransaction navigation={navigation}/>
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