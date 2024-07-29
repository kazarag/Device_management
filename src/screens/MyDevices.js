import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icon
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore'; // Import Firestore from @react-native-firebase

const MyDevices = ({route}) => {
  const [devices, setDevices] = useState([]);
  const { fullname } = route.params || {};
  const navigation = useNavigation();

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const devicesRef = firestore().collection('DEVICES');
        const snapshot = await devicesRef.where('userName', '==', fullname).get();
        
        const devicesList = snapshot.docs.map(doc => ({
          id: doc.id,
          devicesName: doc.data().devicesName,
        }));
        
        setDevices(devicesList);
      } catch (error) {
        console.error("Error fetching devices: ", error);
      }
    };

    if (fullname) {
      fetchDevices();
    }
  }, [fullname]);

  const renderItem = ({ item, index }) => {
    const onPressItem = () => {
      navigation.navigate('MyDetailDevices', { deviceId: item.id });
    };

    return (
      <TouchableOpacity style={[styles.item, index !== 0 && { marginTop: 10 }]} onPress={onPressItem}>
        <View style={styles.iconContainer}>
          <Icon name="desktop" size={24} color="#000" />
        </View>
        <Text style={styles.title}>{item.devicesName}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={devices}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingVertical: 10 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#F5F5F5', // Set background color for each item
    borderRadius: 8,
    marginHorizontal: 20,
  },
  iconContainer: {
    backgroundColor: '#e0e0e0',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginLeft: 10,
    fontSize: 18,
  },
});

export default MyDevices;
