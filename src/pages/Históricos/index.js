import React from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import Header from '../../components/Header';
import CNewBookTransaction from '../../components/CNewBookTransaction';
import COldBookTransaction from '../../components/COldBookTransaction';

export default function History({ navigation }){
    return(
        <View style={styles.container}>
            <Header navigation={navigation}/>
            <Text style={styles.titulo}>Finalizados</Text>
            <ScrollView>
            <CNewBookTransaction/>
            <COldBookTransaction/>
            </ScrollView>
        </View>
    )
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