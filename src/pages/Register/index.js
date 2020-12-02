import React, { useState } from 'react';
import { View, Image, TextInput, StyleSheet, TouchableOpacity, Text, AsyncStorage } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import logoImg from '../../assets/logo.png';
import { apiUsers } from '../../services/api'

export default function Register({ navigation }) {

  const [user_name, setUser_name] = useState('');
  const [city, setCity] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [message, setMessage] = useState('');
  const [showError, setShowError] = useState(false)
  const display = showError ? "flex" : "none";


  async function handleSubmit(){
    var response
    if(password != confirm){
      console.log("Invalid Confirm")
      setMessage("Senha de confirmação incorreta!")
      setShowError(true);
    }else{
      try {
        await apiUsers.post('/users/sign-up', {
         user_name,
         city,
         email,
         cpf,
         phone,
         password
       })
     } catch (error) {
         console.log("Register invalid");
         console.log(error);
         setMessage("Todos os campos devem ser Preenchidos e Validos!");
         setShowError(true);
         return;
     }
     response = await apiUsers.post('/users/login', {
      cpf,
      password
    })
     const { token } = response.data;
     await AsyncStorage.setItem('token', token);
     navigation.navigate('HomeDrawer')
     setShowError(false);
    }
  }



  return (
    <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.container}
      scrollEnabled={false}
    >
      <View style={styles.logo}>
        <Image source={logoImg} />
      </View>
      <Text style={[styles.error, {display}]} >{message}</Text>
      <View>
        <Text style={styles.must}>*Todos os campos devem ser preenchidos!</Text>
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
          onSubmitEditing={() => { this.secondTextInput.focus(); }}
        />
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
          ref={(input) => { this.secondTextInput = input; }}
          onSubmitEditing={() => { this.thirdTextInput.focus(); }}
        />
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
          ref={(input) => { this.thirdTextInput = input; }}
          onSubmitEditing={() => { this.fourthTextInput.focus(); }}
          />
      </View>

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
          ref={(input) => { this.fourthTextInput = input; }}
          onSubmitEditing={() => { this.fifthTextInput.focus(); }} 
          />
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
          ref={(input) => { this.fifthTextInput = input; }}
          onSubmitEditing={() => { this.sixthTextInput.focus(); }} 
          />
      </View>


      <View style={styles.inputs}>
        <TextInput
          style={styles.inputsText}
          placeholder='Senha'
          placeholderTextColor='#fff'
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
          ref={(input) => { this.sixthTextInput = input; }}
          onSubmitEditing={() => { this.seventhTextInput.focus(); }}
        />
      </View>

      <View style={styles.inputs}>
        <TextInput
          style={styles.inputsText}
          placeholder='Confirmar Senha'
          placeholderTextColor='#fff'
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          value={confirm}
          onChangeText={setConfirm}
          ref={(input) => { this.seventhTextInput = input; }}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress = {handleSubmit}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
      
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: '#3AA1E0',
    justifyContent: 'center'
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
  button: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
    backgroundColor: "#163C54",
    paddingHorizontal: 30,
    marginTop: 70,
    borderRadius: 12,
    height: 50
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  row:{
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    
  },
  rowTexts:{
    fontSize: 15,
  },
  must:{
    alignSelf:'flex-end',
    fontSize: 10,
    fontStyle:'italic',
    color:"#fff",
  },
  error:{
    color: "red",
 }
});
