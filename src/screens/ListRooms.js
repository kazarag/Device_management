import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";
import firestore from '@react-native-firebase/firestore'; // Import Firestore from @react-native-firebase
import Icon from 'react-native-vector-icons/FontAwesome';

const ListRooms = ({ navigation }) => {
    const [loading, setLoading] = useState(true);
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const roomsRef = firestore().collection('ROOM');

        const unsubscribe = roomsRef.onSnapshot((querySnapshot) => {
            const fetchedRooms = [];
            querySnapshot.forEach((doc) => {
                fetchedRooms.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });
            setRooms(fetchedRooms);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const renderRoomItem = ({ item }) => (
        <TouchableOpacity 
            style={styles.roomItem} 
            onPress={() => navigation.navigate('ListTypeOfDevice', { roomId: item.id })}
        >
            <Text style={styles.roomName}>{item.roomName}</Text>
            <Text style={styles.roomDescription}>{item.describe}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={rooms}
                renderItem={renderRoomItem}
                keyExtractor={(item) => item.id}
                refreshing={loading}
                onRefresh={() => setLoading(true)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 40,
        backgroundColor: "white",
    },
    roomItem: {
        marginBottom: 25,
        padding: 15,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ccc",
        backgroundColor: "#F5F5F5",
    },
    roomName: {
        fontSize: 16,
        fontWeight: '500',
        color:'#000'
    },
    roomDescription: {
        fontSize: 14,
        color: 'gray',
    },
});

export default ListRooms;
