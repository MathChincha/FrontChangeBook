import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text, Modal, ScrollView, AsyncStorage, FlatList, TextInput} from 'react-native';
import { RadioButton } from 'react-native-paper';
import Header from '../../components/Header';
import { apiBooks, apiTransactions } from '../../services/api';


export default function TransactionBook({ route,navigation }) {

const [name, setName] = useState('');
const [authorName, setAuthorName] = useState('');
const [editorName, setEditorName] = useState('');
const [description, setDescription] = useState('');
const [category, setCategory] = useState('');
const [isForTrade, setIsForTrade] = useState('');
const [tradeDescription, setTradeDescription] = useState('');
const [isForSell, setIsForSell] = useState('');
const [bookPartnerId, setBookPartnerId] = useState('');
const [books, setBooks] = useState([]);
const [showImage, setShowImage] = useState('');
const [modalVisibleTransaction, setModalVisibleTransaction] = useState(false);
const [modalVisibleTrade, setModalVisibleTrade] = useState(false);
const [modalVisibleSell, setModalVisibleSell] = useState(false);
const [txtTransaction, setTxtTransaction] = useState('comprar ou trocar');
const [user_name, setUserName] = useState('');
const [city, setCity] = useState('');
const [visibleTrade, setVisibleTrade] = useState(false);
const [visibleSell, setVisibleSell] = useState(false);
const [price, setPrice] = useState('');
const [bookUserId, setBookUserId] = useState('');

useEffect(() => {
    function getBook() {
            setBookPartnerId(route.params.book.id);
            setName(route.params.book.name);
            setAuthorName(route.params.book.authorName);
            setEditorName(route.params.book.editorName);
            setDescription(route.params.book.description);
            setCategory(route.params.book.category);
            setIsForTrade(route.params.book.isForTrade ? "Sim" : "Não");
            setIsForSell(route.params.book.isForSell ? "Sim" : "Não");
            setTradeDescription(route.params.book.tradeDescription);
            setShowImage({uri: `data:image/jpeg;base64,${route.params.book.image}`});
            setUserName(route.params.book.user.user_name);
            setCity(route.params.book.user.city);
            setVisibleSell(route.params.book.isForSell);
            setVisibleTrade(route.params.book.isForTrade);
        }
    async function getBooksUser() {
            const token = await AsyncStorage.getItem('token');
            const response = await apiBooks.get('/books', {
                headers: { Authorization: token }
            });
            setBooks(response.data);
        }
    getBooksUser();
    getBook();
}, [])

 async function startTrade(){
    console.log(bookPartnerId);
    console.log(bookUserId);
    const token = await AsyncStorage.getItem('token');
    const body = {
        bookPartnerId,
        bookUserId,
    }
    try {
        await apiTransactions.post('/transactions', body,{
        headers: { Authorization: token},
    
    })
    navigation.navigate('MinhasSolicitações');
    }
    catch(error){
        console.log(error)
        return;
    }
}
function openTrade(){
    setModalVisibleTransaction(false);
    setModalVisibleTrade(true);
}
 async function startSell(){
    setModalVisibleSell(false);
    console.log(bookPartnerId);
    const token = await AsyncStorage.getItem('token');
    const body = {
        bookPartnerId,
        price : parseFloat(price),
    }
    try {
        await apiTransactions.post('/transactions', body,{
        headers: { Authorization: token},
    
    })
    navigation.navigate('MinhasSolicitações');
    }
    catch(error){
        console.log(error)
        return;
    }
}
function openSell(){
    setModalVisibleTransaction(false);
    setModalVisibleSell(true);
}
 async function close(){
     setModalVisibleTrade(false);
     setModalVisibleSell(false);
     console.log(parseFloat(price));
     console.log(bookPartnerId);
     console.log(bookUserId);

 }
    return(
        <View style={styles.container}>
            <Header navigation={navigation}/>
            <Modal 
            animationType="slide"
            transparent={true}
            visible={modalVisibleTransaction}>
                <View style={styles.modalViewTs}>
                    <Text style={styles.modalText}>Você deseja {txtTransaction}</Text>
                    <View style={styles.modalRow}>
                    <TouchableOpacity style={styles.modalButtom} onPress={()=>{openTrade()}}>
                        {
                            visibleTrade ? <Text style={styles.modalTextB}>Trocar</Text> : null
                        }
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.modalButtom} onPress={()=>{openSell()}}>
                        {
                            visibleSell ? <Text style={styles.modalTextB}>Comprar</Text> : null
                        }
                    </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisibleTrade}>
                <View style={styles.modalViewTr}>
                    <Text style={styles.tradeLivro}>Escolha um Livro para fazer a troca</Text>
                    <ScrollView style={{width:300}}>
                    <RadioButton.Group
                         onValueChange={setBookUserId}
                         value={bookUserId}>
                    <FlatList
                        data={books}
                        keyExtractor={book => book.id}
                        renderItem={({ item }) => (
                            <View style={styles.row}>
                            <RadioButton value={item.id}/>
                            <Text style={styles.title}>{item.name}</Text>
                            </View>
                        )}
                    />
                    </RadioButton.Group>
                    </ScrollView>
                    <View style={{flexDirection:"row"}}>
                    <TouchableOpacity style={styles.buttonTrade} onPress={()=>{close()}}>
                        <Text style={{color:"#fff", fontWeight:"bold"}}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonTrade} onPress={()=>{startTrade()}}>
                        <Text style={{color:"#fff", fontWeight:"bold"}}>Trocar</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <Modal 
            animationType="slide"
            transparent={true}
            visible={modalVisibleSell}>
                <View style={styles.modalViewTs}>
                    <Text style={styles.title}>Insira o valor desejado para comprar:</Text>
                    <View style={styles.inputsModal}>
                    <TextInput
                    style={{color:"#fff"}}
                    placeholder='Valor'
                    placeholderTextColor='#fff'
                    autoCapitalize="none"
                    keyboardType="numeric"
                    autoCorrect={false}
                    value={price}
                    onChangeText={setPrice}/>
                    </View>
                    <View style={{flexDirection:"row"}}>
                    <TouchableOpacity style={styles.buttonTrade} onPress={()=>{close()}}>
                        <Text style={{color:"#fff", fontWeight:"bold"}}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonTrade} onPress={()=>{startSell()}}>
                        <Text style={{color:"#fff", fontWeight:"bold"}}>Comprar</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <View style={styles.bookContainer}>
                <Image style={styles.image} source={showImage}></Image>
                <View style={styles.inputsBox}>
                    <Text style={styles.inputsText}>{name}</Text>
                </View>
                <ScrollView>
                    <Text style={styles.title}>Nome do Dono</Text>
                    <View style={styles.inputsBox}>
                        <Text style={styles.inputsText}>{user_name}</Text>
                    </View>
                    <Text style={styles.title}>Cidade</Text>
                    <View style={styles.inputsBox}>
                        <Text style={styles.inputsText}>{city}</Text>
                    </View>
                    <Text style={styles.title}>Nome do Autor(a)</Text>
                    <View style={styles.inputsBox}>
                        <Text style={styles.inputsText}>{authorName}</Text>
                    </View>
                    <Text style={styles.title}>Nome da Editora</Text>
                    <View style={styles.inputsBox}>
                        <Text style={styles.inputsText}>{editorName}</Text>
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
                    <Text style={styles.title}>Descrição do Dono</Text>
                    <View style={styles.categoryBox}>
                        <Text style={styles.inputCatBox}>{description}</Text>
                    </View>
                    <Text style={styles.title}>Descrição da Transação</Text>
                    <View style={styles.categoryBox}>
                        <Text style={styles.inputCatBox}>{tradeDescription}</Text>
                    </View>
                </ScrollView>
            </View>
            <TouchableOpacity style={styles.button} onPress={()=>{setModalVisibleTransaction(true)}}>
                <Text style={styles.buttonText}>Iniciar Transação</Text>
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
    row:{
        flexDirection:"row",
        alignItems:"center",
        marginTop:5,
    },
    image: {
        height: 100,
        width: 100,
        borderRadius: 50,
        marginBottom: 10,
        alignSelf:"center"
    },
    title:{
        color: "#fff",
        marginBottom:5,
        marginLeft: 10
    },
    tradeLivro:{
        color:"#fff",
        alignSelf:"center",
        fontWeight:'bold',
        fontSize:15
    },
    inputsModal:{
        paddingLeft:5,
        borderRadius: 10,
        backgroundColor: '#08874E',
        marginBottom: 10,
        width: 200,
        height: 30
    },
    inputsText: {
        height: 30,
        width: 300,
        marginLeft: 10,
        fontSize: 20,
        color: "#fff",
        marginTop: 2,

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
        height: 630,
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
    buttonTrade:{
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#08874E",
        paddingHorizontal: 30,
        marginTop: 10,
        marginBottom:10,
        marginLeft:5,
        borderRadius: 12,
        height: 30,
        width: 120
    },
    buttonText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff",
    },
    modalViewTs: {
        alignSelf:"center",
        marginTop: 250,
        height: 150,
        width: 300,
        margin: 10,
        backgroundColor: "#22A18D",
        borderRadius: 20,
        paddingTop: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
      },
      modalViewTr: {
        alignSelf:"center",
        marginTop: 180,
        height: 300,
        width: 300,
        margin: 5,
        backgroundColor: "#22A18D",
        borderRadius: 20,
        paddingTop: 25,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
      },
      modalText:{
          fontSize: 20,
          color:"#fff"
      },
      modalTextB:{
        fontSize: 20,
        color:"#fff",
        fontWeight:"bold"
    },
      modalButtom:{
        marginRight: 20,
        alignSelf:"flex-end",
      },
      modalRow:{
        flexDirection:"row",
        marginTop: 30,
        marginLeft: 120
      },
})