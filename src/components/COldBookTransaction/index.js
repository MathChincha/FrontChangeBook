import React, { useState, useEffect } from 'react';
import {View, StyleSheet, AsyncStorage, FlatList, Text, TouchableOpacity, Image, Modal} from 'react-native';
import { apiTransactions } from '../../services/api';

export default function OldBookTransaction(){

    const [transactions, setTransactions] = useState([]);
    const [transaction, setTransaction] = useState([]);
    const [visible, setVisible] = useState(false);
    const [book, setBook] = useState([]);
    const [newOwner, setNewOwner] = useState([]);

    useEffect(()=>{
        async function getCompleteTransactions(){
            const token = await AsyncStorage.getItem('token');
            const response = await apiTransactions.get('/transactions/completed', {
                headers: { Authorization: token },
                params: { expand: "requestor" }
            });
            setTransactions(response.data);
        }
            getCompleteTransactions();
    },[])

    return(
        <View>
        <Modal 
            animationType="slide"
            transparent={true}
            visible={visible}>
            <View style={styles.modal}>
                <View style={styles.modalTexts}> 
                {
                    transaction.transaction_type=="TRADE" ?
                    <Text style={{color:"#fff"}}>Tipo da Transação: Troca</Text>
                    : 
                    <Text style={{color:"#fff"}}>Tipo da Transação: Venda</Text>
                }
                </View>
                <View style={styles.modalTexts}>
                    {
                        transaction.transaction_type=="TRADE" ?
                        <Text style={{color:"#fff"}}>Livro Trocado: {book.name}</Text>
                        : 
                        <Text style={{color:"#fff"}}>Preço Sugerido: {transaction.price}</Text>
                    }
                </View>
                <View style={styles.modalTexts}>
                {
                    transaction.status_transaction=="CANCELED" ?
                    <Text style={{color:"#fff"}}>Status da Transação: Cancelado</Text>
                    : 
                    <Text style={{color:"#fff"}}>Status da Transação: Finalizado</Text>
                }
                </View>
                <View style={styles.modalTexts}>
                <Text style={{color:"#fff"}}>Data de Encerramento: {transaction.end_date}</Text>
                </View>
                <View style={styles.modalTexts}>
                <Text style={{color:"#fff"}}>Nome do Solicitante: {newOwner.user_name}</Text>
                </View>
                <View style={styles.modalTexts}>
                <Text style={{color:"#fff"}}>Cidade: {newOwner.city}</Text>
                </View>
                <View style={styles.modalTexts}>
                <Text style={{color:"#fff"}}>Telefone: {newOwner.phone}</Text>
                </View>
                <View style={styles.modalTexts}>
                <Text style={{color:"#fff"}}>Email: {newOwner.email}</Text>
                </View>
                <View style={{flexDirection:"row"}}>
                <TouchableOpacity style={styles.button} onPress={()=>{setVisible(false)}}>
                    <Text style={{color:"#fff"}}>Fechar</Text>
                </TouchableOpacity>
                </View>
            </View>
        </Modal>
        <FlatList 
            data={transactions}
            keyExtractor={transaction => transaction.id}
            renderItem={({ item }) =>(
                <View>
                <TouchableOpacity onPress={()=>{setVisible(true);
                setBook(item.bookUser);
                setNewOwner(item.newOwner);
                setTransaction(item);
                console.log(item.price);
                console.log(item.end_date);
                }}>
                    <View style={styles.container}>
                        <View style={styles.row}>
                            <Image style={styles.image} source={{ uri: `data:image/jpeg;base64,${item.bookPartner.image}` }}></Image>
                            <View style={{flexDirection:"column"}}>
                                <Text style={styles.nameText}>{item.bookPartner.name}</Text>
                                <View style={{flexDirection:"row"}}>
                                    <Text style={styles.descriptionText}>{item.bookPartner.authorName}</Text>
                                    <Text style={styles.descriptionText}>{item.bookPartner.editorName}</Text>
                                </View>
                                <Text style={styles.description}>{item.bookPartner.description}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
                </View>
            )}
        />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        marginTop: 10,
        height: 160,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: "#20587A"
    },
    row: {
        marginTop: 20,
        marginLeft: 5,
        flexDirection: "row",
    },
    modalTexts:{
        justifyContent: "center",
        alignSelf:"stretch",
        backgroundColor: "#08874E",
        borderRadius: 12,
        height: 30,
        marginHorizontal:10,
        paddingHorizontal:10,
        marginTop:10
    },
    button:{
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#08874E",
        marginTop: 10,
        marginBottom:10,
        marginLeft:5,
        borderRadius: 12,
        height: 30,
        width: 110
    },
    image: {
        height: 100,
        width: 100,
        borderRadius: 50,
        marginRight: 5,
        alignSelf: "center"
    },
    nameText: {
        fontWeight: 'bold',
        fontSize: 30,
        color: '#fff',
        width: 200,
    },
    descriptionText: {
        fontSize: 15,
        color: '#fff',
        marginRight: 2,
    },
    description:{
        fontSize: 15,
        color: '#fff',
        marginRight: 2,
        width: 230
    },
    modal: {
        alignSelf:"center",
        marginTop: 250,
        height: 370,
        width: 350,
        margin: 10,
        backgroundColor: "#22A18D",
        borderRadius: 20,
        paddingTop: 5,
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
});