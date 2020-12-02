import React from 'react';
import {View, StyleSheet} from 'react-native';
import Header from '../../components/Header';
import CListBook from '../../components/CListBook';

export default function CategoryBook({ route, navigation }){
    const name = route.params.name;
    return(
        <View style={styles.container}>
            <Header navigation={navigation}/>
            <CListBook category={name} navigation={navigation}/>
        </View>
    )
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingHorizontal: 24,
        backgroundColor: '#3AA1E0'
      }
});