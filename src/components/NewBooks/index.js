import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Image, Picker, TouchableOpacity, Text, AsyncStorage } from 'react-native';
import book from '../../assets/icon-book.png';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from "expo-image-manipulator";
import { apiBooks } from '../../services/api'


export default function NewBooks({ navigation }) {
    const [name, setName] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [editorName, setEditorName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [isForTrade, setIsForTrade] = useState('');
    const [tradeDescription, setTradeDescription] = useState('');
    const [isForSell, setIsForSell] = useState('');
    const [image, setImage] = useState('');
    const [showImage, setShowImage] = useState(book);
    const [showError, setShowError] = useState(false);

    async function getImage() {
        try {
            let result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1
            });

            const resizedImage = await ImageManipulator.manipulateAsync(result.uri, [{ resize: { width: 256, height: 256 } }],{ compress: 1, format: ImageManipulator.SaveFormat.JPEG, base64: true })
            setImage(resizedImage.base64)
            setShowImage({uri: `data:image/jpeg;base64,${resizedImage.base64}`})
        } catch (E) {
            console.log(E);
        }
    }

    async function saveBook() {
        if(isForTrade==false && isForSell==false)
            setShowError(true)
        else{
        const token = await AsyncStorage.getItem('token');
        const body = {
            name,
            authorName,
            editorName,
            description,
            category,
            isForTrade,
            tradeDescription,
            isForSell,
            image   
        }
        
        try {
            await apiBooks.post('/books', body, {
                headers: { Authorization: token },
            })
            navigation.navigate('MyBooks');
        } catch (error) {
            console.log(error)
            return;
        }
        }
    }

    return (
        <KeyboardAwareScrollView
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={styles.container}
            scrollEnabled={true}>
            <View style={styles.bookContainer}>
                <TouchableOpacity onPress={getImage}>
                    <Image style={styles.image} source={showImage}></Image>
                </TouchableOpacity>
                <View style={styles.campos}>
                    {
                        showError ? <Text style={styles.erro}>Pelo menos 1 tipo de transação(troca/venda) no livro</Text> 
                        : <Text style={styles.campos}>*Todos os campos devem ser preenchidos</Text>
                    }
                </View>
                <View style={styles.inputsBox}>
                    <TextInput style={styles.inputsText}
                        placeholder='Nome do livro'
                        placeholderTextColor='#fff'
                        autoCorrect={false}
                        value={name}
                        onChangeText={setName} />
                </View>
                <View style={styles.inputsBox}>
                    <TextInput style={styles.inputsText}
                        placeholder='Nome do Autor'
                        placeholderTextColor='#fff'
                        autoCorrect={false}
                        value={authorName}
                        onChangeText={setAuthorName} />
                </View>
                <View style={styles.inputsBox}>
                    <TextInput style={styles.inputsText}
                        placeholder='Nome da Editora'
                        placeholderTextColor='#fff'
                        autoCorrect={false}
                        value={editorName}
                        onChangeText={setEditorName} />
                </View>
                <View style={styles.inputsBox}>
                    <Picker
                        value={category}
                        selectedValue={category}
                        style={styles.category}
                        onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}>
                        <Picker.Item label="Selecione uma Categoria" value='Selecione uma Categoria' />
                        <Picker.Item label="Administração" value='Administração' />
                        <Picker.Item label="Agricultura" value='Agricultura' />
                        <Picker.Item label="Antropologia" value='Antropologia' />
                        <Picker.Item label="Arqueologia" value='Arqueologia' />
                        <Picker.Item label="Arquitetura" value="Arquitetura" />
                        <Picker.Item label="Artes" value="Artes" />
                        <Picker.Item label="Artesanato" value="Artesanato" />
                        <Picker.Item label="Astronomia" value="Astronomia" />
                        <Picker.Item label="Auto Ajuda" value="Auto Ajuda" />
                        <Picker.Item label="Biografias" value="Biografias" />
                        <Picker.Item label="Biologia" value="Biologia" />
                        <Picker.Item label="Brasil" value="Brasil" />
                        <Picker.Item label="Ciência Política" value="Ciência Política" />
                        <Picker.Item label="Ciências Exatas" value="Ciências Exatas" />
                        <Picker.Item label="Coleções" value="Coleções" />
                        <Picker.Item label="Comportamento" value="Comportamento" />
                        <Picker.Item label="Contos" value="Contos" />
                        <Picker.Item label="Crítica Literária" value="Crítica Literária" />
                        <Picker.Item label="Culinária" value="Culinária" />
                        <Picker.Item label="Esoterismo" value="Esoterismo" />
                        <Picker.Item label="Esportes" value="Esportes" />
                        <Picker.Item label="Ficção Científica" value="Ficção Científica" />
                        <Picker.Item label="Folclore" value="Folclore" />
                        <Picker.Item label="Genealogia" value="Genealogia" />
                        <Picker.Item label="Hobbies" value="Hobbies" />
                        <Picker.Item label="Humor" value="Humor" />
                        <Picker.Item label="Infanto Juvenis" value="Infanto Juvenis" />
                        <Picker.Item label="Jornais" value="Jornais" />
                        <Picker.Item label="Literatura Brasileira" value="Literatura Brasileira" />
                        <Picker.Item label="Religião" value="Religião" />
                    </Picker>
                </View>
                <View style={styles.inputsBox}>
                    <Picker
                        value={isForSell}
                        selectedValue={isForSell}
                        style={styles.category}
                        onValueChange={(itemValue, itemIndex) => setIsForSell(itemValue)}>
                        <Picker.Item label="Está à venda?" value='Está à venda?' />
                        <Picker.Item label="Sim" value={true} />
                        <Picker.Item label="Não" value={false} />
                    </Picker>
                </View>
                <View style={styles.inputsBox}>
                    <Picker
                        value={isForTrade}
                        selectedValue={isForTrade}
                        style={styles.category}
                        onValueChange={(itemValue, itemIndex) => setIsForTrade(itemValue)}>
                        <Picker.Item label="Está para troca?" value='Está para troca?' />
                        <Picker.Item label="Sim" value={true} />
                        <Picker.Item label="Não" value={false} />
                    </Picker>
                </View>
                <View style={styles.categoryBox}>
                    <TextInput style={styles.inputCatBox}
                        placeholder='Descrição do livro'
                        placeholderTextColor='#fff'
                        autoCorrect={false}
                        multiline={true}
                        value={description}
                        onChangeText={setDescription} />
                </View>
                <View style={styles.categoryBox}>
                    <TextInput style={styles.inputCatBox}
                        placeholder='Descrição da troca e/ou venda'
                        placeholderTextColor='#fff'
                        autoCorrect={false}
                        multiline={true}
                        value={tradeDescription}
                        onChangeText={setTradeDescription} />
                </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={saveBook}>
                <Text style={styles.buttonText}>Adicionar Livro</Text>
            </TouchableOpacity>
        </KeyboardAwareScrollView>
    )
};

const styles = StyleSheet.create({
    campos:{
        color: "#fff",
        alignSelf: "flex-end",
        marginRight: 12.50,
        paddingBottom: 2.5
    },
    erro:{
        color:'#FF0000',
        alignSelf: "center",
        paddingBottom: 2.5,
    },
    image: {
        height: 100,
        width: 100,
        borderRadius: 50,
        marginBottom: 10
    },
    inputsText: {
        height: 30,
        width: 300,
        marginLeft: 10,
        fontSize: 20,
        color: "#fff",

    },
    inputsBox: {
        borderRadius: 10,
        backgroundColor: '#266A94',
        marginBottom: 10,
        width: 300,
        height: 30
    },
    category: {
        height: 30,
        width: 300,
        color: '#fff',
        fontSize: 40,
    },
    categoryBox: {
        borderRadius: 10,
        backgroundColor: '#266A94',
        marginBottom: 10,
        width: 300,
        height: 100
    },
    inputCatBox: {
        borderRadius: 10,
        backgroundColor: '#266A94',
        marginBottom: 10,
        marginLeft: 10,
        fontSize: 20,
        color: "#fff",
    },
    bookContainer: {
        height: 610,
        backgroundColor: "#20587A",
        borderRadius: 20,
        alignItems: 'center',
        paddingVertical: 10,
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
});