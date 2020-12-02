import React, { useState, useEffect } from 'react';
import { View, Image, TextInput, StyleSheet, TouchableOpacity, Text, AsyncStorage } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import logoImg from '../../assets/logo.png';
import Header from '../../components/Header';
import { apiUsers } from '../../services/api'

export default function Profile({ navigation }) {

    const [user_name, setUser_name] = useState('');
    const [city, setCity] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [showError, setShowError] = useState(false)
    const display = showError ? "flex" : "none";


    useEffect(() => {
        async function loadProfile() {
            const token = await AsyncStorage.getItem('token');
            const response = await apiUsers.get('/users/user/by_token', {
                headers: { Authorization: token }
            });
            console.log(response.data);
            setUser_name(response.data.user_name);
            setCity(response.data.city);
            setEmail(response.data.email);
            setCpf(response.data.cpf);
            setPhone(response.data.phone);
        }

        loadProfile();


    }, [])

    async function handleSubmit(){
        const token = await AsyncStorage.getItem('token');
        const body = {
            user_name,
            city,
            email,
            cpf,
            phone,
        }
        try {
            await apiUsers.put('/users/update', body,{
             headers: { Authorization: token},
           })
         } catch (error) {
             console.log(error.response)
             setMessage("Todos os campos devem ser Preenchidos e Validos!")
            setShowError(true);
             return;
         }
         navigation.navigate('HomePage');
      }


    return (
        <KeyboardAwareScrollView
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={styles.container}
            scrollEnabled={false}
        >
            <Header navigation={navigation} />
            <View style={styles.logo}>
                <Image source={logoImg} />
            </View>
            <Text style={[styles.error, {display}]} >{message}</Text>
            <View>
                <Text style={styles.text}>Nome:</Text>
            </View>

            <View style={styles.inputs}>
                <TextInput
                    style={styles.inputsText}
                    placeholder='Nome'
                    placeholderTextColor='#fff'
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={user_name}
                    onChangeText={setUser_name}
                />
            </View>

            <View>
                <Text style={styles.text}>Cidade:</Text>
            </View>
            <View style={styles.inputs}>
                <TextInput
                    style={styles.inputsText}
                    placeholder='Cidade'
                    placeholderTextColor='#fff'
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={city}
                    onChangeText={setCity}
                />
            </View>

            <View>
                <Text style={styles.text}>Email:</Text>
            </View>
            <View style={styles.inputs}>
                <TextInput
                    style={styles.inputsText}
                    placeholder='Email'
                    placeholderTextColor='#fff'
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={email}
                    onChangeText={setEmail}
                />
            </View>

            <View>
                <Text style={styles.text}>CPF:</Text>
            </View>

            <View style={styles.inputs}>
                <Text
                    style={styles.inputsText}
                    placeholder='CPF'
                    placeholderTextColor='#fff'
                    keyboardType="numeric"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={cpf}
                    onChangeText={setCpf}
                >{cpf}</Text>
            </View>

            <View>
                <Text style={styles.text}>Telefone:</Text>
            </View>

            <View style={styles.inputs}>
                <TextInput
                    style={styles.inputsText}
                    placeholder='Telefone'
                    placeholderTextColor='#fff'
                    keyboardType="numeric"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={phone}
                    onChangeText={setPhone}
                />
            </View>

            <TouchableOpacity style={styles.button} onPress = {handleSubmit}>
                <Text style={styles.buttonText}>Atualizar informações</Text>
            </TouchableOpacity>

        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        backgroundColor: '#3AA1E0',
    },
    logo: {
        alignSelf: "center",
    },
    inputs: {
        alignSelf: "stretch",
        paddingHorizontal: 30,
        marginTop: 10,
        backgroundColor: "#20587A",
        borderRadius: 12,
        height: 50,
    },
    inputsText: {
        fontSize: 20,
        marginTop: 10,
        color: "#fff",
    },
    text: {
        alignItems: "center",
        justifyContent: "center",
        fontSize: 16,
        marginTop: 10,
        marginBottom:-10,
        color: "#fff",
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "stretch",
        backgroundColor: "#163C54",
        paddingHorizontal: 30,
        marginTop: 20,
        borderRadius: 12,
        height: 50
    },
    buttonText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff",
    },
    row: {
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

    },
    rowTexts: {
        fontSize: 15,
    },
    must: {
        alignSelf: 'flex-end',
        fontSize: 10,
        fontStyle: 'italic',
        color: "#fff",
    },
    error:{
        color: "red",
     }
});
