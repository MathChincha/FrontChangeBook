import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, Platform, TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

import Login from './pages/Login';
import Register from './pages/Register';
import HomePage from './pages/HomePage';
import MyBooks from './pages/MyBooks';
import Profile from './pages/Profile';
import NewBook from './pages/NewBook';
import Literatura from './pages/Literatura';
import Técnicos from './pages/Técnicos';
import Equilíbrio from './pages/Equilíbrio';
import Solicitações from './pages/Solicitações';
import MinhasSolicitações from './pages/MinhasSolicitações';
import Book from './pages/Book';
import CategoryBook from './pages/CategoryBook';
import TransactionBook from './pages/TransactionBook';
import History from './pages/Históricos';

export default function Routes(){
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions = {{headerShown: false}}>
                <Stack.Screen name = "Login" component = {Login} options ={{unmountOnBlur: true}} />
                <Stack.Screen name = "Register" component = {Register} options ={{unmountOnBlur: true}} />
                <Stack.Screen name = "HomeDrawer" component = {HomeDrawer} options ={{unmountOnBlur: true}} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export function HomeDrawer(){
    return(
        <Drawer.Navigator drawerContent={(props) => <CustomDrawer{...props}/>}>
            <Drawer.Screen name = "HomePage" component = {HomePage} />
            <Drawer.Screen name = "MyBooks" component = {MyBooks} options ={{unmountOnBlur: true}} />
            <Drawer.Screen name = "Profile" component = {Profile} options ={{unmountOnBlur: true}} />
            <Drawer.Screen name = "NewBook" component = {NewBook} options ={{unmountOnBlur: true}} />
            <Drawer.Screen name = "Literatura" component = {Literatura} options ={{unmountOnBlur: true}} />
            <Drawer.Screen name = "Equilíbrio" component = {Equilíbrio} options ={{unmountOnBlur: true}} />
            <Drawer.Screen name = "Técnicos" component = {Técnicos} options ={{unmountOnBlur: true}} />
            <Drawer.Screen name = "Solicitações" component = {Solicitações} options ={{unmountOnBlur: true}} />
            <Drawer.Screen name = "MinhasSolicitações" component = {MinhasSolicitações} options ={{unmountOnBlur: true}} />
            <Drawer.Screen name = "Book" component = {Book} options ={{unmountOnBlur: true}} />
            <Drawer.Screen name = "CategoryBook" component = {CategoryBook} options ={{unmountOnBlur: true}} />
            <Drawer.Screen name = "TransactionBook" component = {TransactionBook} options ={{unmountOnBlur: true}} />
            <Drawer.Screen name = "History" component = {History} options ={{unmountOnBlur: true}} />
        </Drawer.Navigator>
    );
}

const CustomDrawer = ({navigation}) =>{
    return(
        <SafeAreaView style={styles.SafeAndroidView}>
            <View style={styles.Text}>
                <Text style={styles.Text}>Bem Vindo</Text>
            </View>
            <View style={styles.Buttons}>
                <TouchableOpacity onPress={()=> navigation.navigate('HomePage')}>
                    <Text style={styles.Buttons}>Início</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> navigation.navigate('Solicitações')}>
                    <Text style={styles.Buttons}>Solicitações</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> navigation.navigate('MinhasSolicitações')}>
                    <Text style={styles.Buttons}>Minhas Solicitações</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> navigation.navigate('History')}>
                    <Text style={styles.Buttons}>Histórico</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> navigation.navigate('MyBooks')}>
                    <Text style={styles.Buttons}>Meus Livros</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> navigation.navigate('Profile')}>
                    <Text style={styles.Buttons}>Perfil</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> navigation.navigate('Login')}>
                    <Text style={styles.Buttons}>Sair</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
        SafeAndroidView:{
            flex: 1,
            backgroundColor: "#163C54",
            paddingTop: Platform.OS === "android" ? 30 : 0,
            paddingLeft: 10,
        },
        Text:{
            fontSize:30,
            color:'#fff',
            alignItems:'center',
            paddingTop: 30,
        },
        Buttons:{
            marginTop: 20,
            color:'#fff',
            fontSize: 20,
            paddingLeft: 15
        },
});