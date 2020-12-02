import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Header from '../../components/Header';
import OutsideCategory from '../../components/OutsideCategory';

export default function HomePage({navigation}) {
  return (
    <View style={ styles.container }>
      <Header navigation={navigation}></Header>
      <TouchableOpacity onPress= {()=> {navigation.navigate('Literatura')}}>
      <OutsideCategory name= 'Literatura'></OutsideCategory>
      </TouchableOpacity>
      <TouchableOpacity onPress= {()=> {navigation.navigate('Técnicos')}}>
      <OutsideCategory name= 'Técnicos e Profissionais'></OutsideCategory>
      </TouchableOpacity>
      <TouchableOpacity onPress= {()=> {navigation.navigate('Equilíbrio')}}>
      <OutsideCategory name= 'Equilíbrio Pessoal'></OutsideCategory>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
      container:{
        flex: 1,
        paddingHorizontal: 24,
        backgroundColor: '#3AA1E0'
      },
});