import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";
import firestore from '@react-native-firebase/firestore'; // Import Firestore from @react-native-firebase

const ListTypeOfDevice = ({ navigation }) => {
    const [loading, setLoading] = useState(true);
    const [types, setTypes] = useState([]);

    useEffect(() => {
        const typeOfDeviceRef = firestore().collection('TYPE_OF_DEVICE');

        const unsubscribe = typeOfDeviceRef.onSnapshot((querySnapshot) => {
            const fetchedTypes = [];
            querySnapshot.forEach((doc) => {
                fetchedTypes.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });
            setTypes(fetchedTypes);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const renderTypeItem = ({ item }) => (
        <TouchableOpacity 
            style={styles.typeItem} 
            onPress={() => navigation.navigate('ListDevices', { typeId: item.id })}
        >
            <Text style={styles.typeName}>{item.typeName}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={types}
                renderItem={renderTypeItem}
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
    typeItem: {
        marginBottom: 25,
        padding: 15,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ccc",
        backgroundColor: "#F5F5F5",
    },
    typeName: {
        fontSize: 16,
        fontWeight: '500',
        color:'#000'
    },
    typeDescription: {
        fontSize: 14,
        color: 'gray',
    },
});

export default ListTypeOfDevice;
