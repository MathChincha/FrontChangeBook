import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Image, Picker, TouchableOpacity, Text, AsyncStorage, ScrollView } from 'react-native';
import { apiBooks } from '../../services/api';
import Header from '../../components/Header';


export default function Book({ route,navigation }) {

const [name, setName] = useState('');
const [authorName, setAuthorName] = useState('');
const [editorName, setEditorName] = useState('');
const [description, setDescription] = useState('');
const [category, setCategory] = useState('');
const [isForTrade, setIsForTrade] = useState('');
const [tradeDescription, setTradeDescription] = useState('');
const [isForSell, setIsForSell] = useState('');
const {bookId} = route.params;
const [books, setBooks] = useState([]);
const [showImage, setShowImage] = useState('');

useEffect(() => {
    async function getBookById() {
            const token = await AsyncStorage.getItem('token');
            const response = await apiBooks.get(`/books/${bookId}`, {
                headers: { Authorization: token }
            });
            console.log(response.data.name);
            setBooks(response.data);
            setName(response.data.name);
            setAuthorName(response.data.authorName);
            setEditorName(response.data.editorName);
            setDescription(response.data.description);
            setCategory(response.data.category);
            setIsForTrade(response.data.isForTrade ? "Sim" : "Não");
            setIsForSell(response.data.isForSell ? "Sim" : "Não");
            setTradeDescription(response.data.tradeDescription);
            setShowImage({uri: `data:image/jpeg;base64,${response.data.image}`})
            
        }
    getBookById();
}, [])

async function removeBook(){
        const token = await AsyncStorage.getItem('token');
            const response = await apiBooks.delete(`/books/${bookId}`, {
                headers: { Authorization: token }
            });
            navigation.navigate('MyBooks');
}
    return(
        <View style={styles.container}>
            <Header navigation={navigation}/>
            <View style={styles.bookContainer}>
                <Image style={styles.image} source={showImage}></Image>
                <ScrollView>
                <Text style={styles.title}>Nome do Livro</Text>
                <View style={styles.inputsBox}>
                    <TextInput style={styles.inputsText}
                        placeholder="Nome do Livro"
                        placeholderTextColor='#fff'
                        autoCorrect={false}
                        value={name}
                        onChangeText={setName} />
                </View>
                <Text style={styles.title}>Nome do Autor(a)</Text>
                <View style={styles.inputsBox}>
                    <TextInput style={styles.inputsText}
                        placeholder="Nome do Autor"
                        placeholderTextColor='#fff'
                        autoCorrect={false}
                        value={authorName}
                        onChangeText={setAuthorName} />
                </View>
                <Text style={styles.title}>Nome da Editora</Text>
                <View style={styles.inputsBox}>
                    <TextInput style={styles.inputsText}
                        placeholder="Nome da Editora"
                        placeholderTextColor='#fff'
                        autoCorrect={false}
                        value={editorName}
                        onChangeText={setEditorName} />
                </View>
                <Text style={styles.title}>Categoria</Text>
                <View style={styles.inputsBox}>
                    <Text style={styles.inputsText}>{category}</Text>
                </View>
                <Text style={styles.title}>Está para venda?</Text>
                <View style={styles.inputsBox}>
                    <Text style={styles.inputsText}>{isForSell}</Text>
                </View>
                <Text style={styles.title}>Está para troca?</Text>
                <View style={styles.inputsBox}>
                    <Text style={styles.inputsText}>{isForTrade}</Text>
                </View>
                <Text style={styles.title}>Descrição do livro</Text>
                <View style={styles.categoryBox}>
                    <TextInput style={styles.inputCatBox}
                        placeholder="Descrição do Livro"
                        placeholderTextColor='#fff'
                        autoCorrect={false}
                        multiline={true}
                        value={description}
                        onChangeText={setDescription} />
                </View>
                <Text style={styles.title}>Descrição da Transação</Text>
                <View style={styles.categoryBox}>
                    <TextInput style={styles.inputCatBox}
                        placeholder="Descrição da venda e/ou troca"
                        placeholderTextColor='#fff'
                        autoCorrect={false}
                        multiline={true}
                        value={tradeDescription}
                        onChangeText={setTradeDescription} />
                </View>
                </ScrollView>
            </View>
            <TouchableOpacity style={styles.button} onPress={removeBook}>
                <Text style={styles.buttonText}>Remover livro</Text>
            </TouchableOpacity>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        backgroundColor: '#3AA1E0'
    },
    title:{
        color: "#fff",
        marginBottom:5,
        marginLeft: 10
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
        height: 590,
        backgroundColor: "#20587A",
        borderRadius: 20,
        alignItems: 'center',
        paddingVertical: 10,
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "stretch",
        backgroundColor: "#A33B32",
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
})