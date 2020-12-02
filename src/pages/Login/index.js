import React, {useState, useEffect} from 'react';
import { View, AsyncStorage, Image, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import logoImg from '../../assets/logo.png';

import { apiUsers } from '../../services/api'


export default function Login({ navigation }) {

  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false)
  const display = showError ? "flex" : "none";



  async function handleSubmit(){
    var response
    try {
       response = await apiUsers.post('/users/login', {
        cpf,
        password
      })
      setShowError(false);
    } catch (error) {
        console.log("Login Invalid")
        setShowError(true);
        return;
    }
    const { token } = response.data;
    await AsyncStorage.setItem('token', token);
    navigation.navigate('HomeDrawer')
    setShowError(false);

  }


  function CreateAccount(){
    navigation.navigate('Register');
  }

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image source={logoImg} />
      </View>
      <Text style={[styles.error, {display}]} >CPF ou Senha invalido!</Text>
      <View style={styles.inputs}>
        <TextInput
          style={styles.inputsText}
          placeholder='CPF'
          placeholderTextColor='#fff'
          keyboardType="numeric"
          autoCapitalize="none"
          autoCorrect={false}
          value={cpf}
          onChangeText={setCpf}
          />
          
      </View>
      <View style={styles.inputs}>
        <TextInput
          style={styles.inputsText}
          textContentType="password"
          placeholder='Senha'
          secureTextEntry={true}
          placeholderTextColor='#fff'
          autoCapitalize="none"
          autoCorrect={false}
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress = {handleSubmit}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <View style={styles.row}>
        <TouchableOpacity onPress={CreateAccount}>
        <Text style={styles.rowTexts}>Criar Conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: '#3AA1E0'
  },
  logo: {
    marginTop: 50,
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
  button: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
    backgroundColor: "#163C54",
    paddingHorizontal: 30,
    marginTop: 10,
    borderRadius: 12,
    height: 50
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  row:{
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end"
    
  },
  rowTexts:{
    fontSize: 15,
  },
  error:{
     color: "red",
  }
});
