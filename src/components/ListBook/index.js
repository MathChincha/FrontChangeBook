import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Image, FlatList, AsyncStorage } from 'react-native';
import { apiBooks } from '../../services/api';

export default function ListBook({ navigation }) {
    const [books, setBooks] = useState([]);

        useEffect(() => {
        async function getBooksUser() {
                const token = await AsyncStorage.getItem('token');
                const response = await apiBooks.get('/books', {
                    headers: { Authorization: token }
                });
                setBooks(response.data)
            }
        getBooksUser();
        }, [])

    function handleSubmit(bookId) {
        navigation.navigate('Book',{
            bookId: bookId
        })
    }
    return (
        <FlatList
            data={books}
            keyExtractor={book => book.id}
            renderItem={({ item }) => (
                <TouchableOpacity onPress={()=>handleSubmit(item.id)}>
                    <View style={styles.container}>
                        <View style={styles.row}>
                            <Image style={styles.image} source={{ uri: `data:image/jpeg;base64,${item.image}` }}></Image>
                            <View style={styles.collum}>
                                <Text style={styles.nameText}>{item.name}</Text>
                                <View style={styles.rowText}>
                                    <Text style={styles.descriptionText}>{item.authorName}</Text>
                                </View>
                                <Text style={styles.descriptionText}>{item.editorName}</Text>
                                <Text style={styles.description}>{item.description}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            )}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        marginTop: 10,
        height: 180,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: "#20587A"
    },
    row: {
        marginTop: 20,
        marginLeft: 5,
        flexDirection: "row",
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
        marginRight: 5,
    },
    image: {
        height: 100,
        width: 100,
        borderRadius: 50,
        marginRight: 5,
        alignSelf: "center"
    },
    rowText: {
        flexDirection: "row",
    },
    description:{
        fontSize: 15,
        color: '#fff',
        marginRight: 2,
        width: 230
    }
});