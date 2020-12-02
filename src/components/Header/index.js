import React from 'react';
import {Image, TouchableOpacity, StyleSheet,SafeAreaView} from 'react-native';
import menu from '../../assets/icon-menu.png';

export default function Header({navigation}){
    return(
        <SafeAreaView>
            <TouchableOpacity style={styles.menu} onPress = {()=> {navigation.openDrawer()}}>
            <Image source={menu}/>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
        menu:{
            paddingTop: 40,
            marginBottom: 10,
        }
});