import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const MyProfileAdmin = () => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [roomName, setRoomName] = useState(''); // Added roomName if necessary

  useEffect(() => {
    const fetchUserData = async () => {
      
      const user = auth().currentUser;

      if (user) {
        const userEmail = user.email; // Get current user's email

        try {
          // Fetch user data from Firestore
          const userDoc = await firestore().collection('USERS').doc(userEmail).get();

          if (userDoc.exists) {
            const userData = userDoc.data();
            setFullname(userData.fullname || '');
            setEmail(userData.email || '');
            setPhone(userData.phone || '');
            setRoomName(userData.roomName || ''); // Get roomName if necessary
          }
        } catch (error) {
          console.error("Error fetching user data: ", error);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleUpdate = async () => {

    const user = auth().currentUser;

    if (user) {
      const userEmail = user.email;

      try {
        // Update user information in Firestore
        await firestore().collection('USERS').doc(userEmail).update({
          fullname,
          email,
          phone,
          roomName,
        });

        Alert.alert("Cập nhật thông tin thành công!");
      } catch (error) {
        Alert.alert("Cập nhật thông tin thất bại. Vui lòng thử lại.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image resizeMode="contain" source={require("../assets/logouser.png")} style={styles.image} />
      <Text style={{ paddingBottom: 8, fontSize: 16 ,color:'#000'}}>Tên người dùng</Text>
      <TextInput
        style={styles.input}
        value={fullname}
        onChangeText={text => setFullname(text)}
      />
      <Text style={{ paddingBottom: 8, fontSize: 16 ,color:'#000'}}>Phòng</Text>
      <TextInput
        style={styles.input}
        value={roomName}
        onChangeText={text => setRoomName(text)}
      />
      <Text style={{ paddingBottom: 8, fontSize: 16,color:'#000' }}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <Text style={{ paddingBottom: 8, fontSize: 16,color:'#000' }}>Số điện thoại</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={text => setPhone(text)}
      />

      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Cập nhật</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 15,
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  image: {
    height: 160,
    marginBottom: 30,
    alignItems: 'center',
    width: 'auto',
  },
  input: {
    width: '90%',
    height: 55,
    borderWidth: 1,
    borderColor: '#777777',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: "white",
    fontSize: 16,
    color:'#000'
  },
  button: {
    backgroundColor: '#21005d',
    width: 'auto',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginVertical: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MyProfileAdmin;
