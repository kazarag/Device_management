import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput } from "react-native";
import firestore from '@react-native-firebase/firestore'; // Import Firestore from @react-native-firebase
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ListDevices = ({ route }) => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);
    const [devices, setDevices] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredDevices, setFilteredDevices] = useState([]);
    const [deviceTitle, setDeviceTitle] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        const detailDevicesRef = firestore().collection('DEVICES');
        const unsubscribe = detailDevicesRef
            .where('deviceName', '==', route.params.deviceName)
            .onSnapshot((querySnapshot) => {
                const fetchedDevices = [];
                querySnapshot.forEach((doc) => {
                    fetchedDevices.push({
                        id: doc.id,
                        ...doc.data(),
                    });
                });
                setDevices(fetchedDevices);
                setFilteredDevices(fetchedDevices);
                setLoading(false);
            });

        setDeviceTitle(route.params.deviceName);

        return () => unsubscribe();
    }, [route.params.deviceName]);

    useEffect(() => {
        if (search === '') {
            setFilteredDevices(devices);
        } else {
            const filteredData = devices.filter((item) =>
                item.nameDevice.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredDevices(filteredData);
        }
    }, [search, devices]);

    const renderDeviceItem = ({ item }) => (
        <TouchableOpacity 
            style={styles.serviceItem} 
            onPress={() => navigation.navigate('UpdateDetail', { deviceId: item.id })}
        >
            <Text style={styles.serviceName}>{item.nameDevice}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{deviceTitle}</Text>
            <View style={styles.searchContainer}>
                <Icon name="search" size={20} style={styles.searchIcon} />
                <TextInput
                    style={[styles.searchInput, isFocused && styles.searchInputFocused]}
                    placeholder="Tìm kiếm ..."
                    value={search}
                    onChangeText={setSearch}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
            </View>
            <FlatList
                data={filteredDevices}
                renderItem={renderDeviceItem}
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
        backgroundColor: "white",
        paddingTop: 20,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
        height: 50,
    },
    searchIcon: {
        marginRight: 10,
        color: 'gray',
    },
    searchInput: {
        flex: 1,
        height: 40,
        fontSize: 18,
        paddingLeft: 10,
    },
    searchInputFocused: {
        borderWidth: 0,
        outlineWidth: 0,
    },
    serviceItem: {
        marginBottom: 25,
        padding: 15,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ccc",
        backgroundColor: "#F5F5F5",
    },
    serviceName: {
        fontSize: 16,
        fontWeight: '500', color:'#000'
    },
    title: {
        fontSize: 24,
        fontWeight: '400',
        textAlign: 'center',
        paddingBottom: 10,
    },
});

export default ListDevices;
