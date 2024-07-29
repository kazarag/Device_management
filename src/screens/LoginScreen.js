import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { HelperText, Button } from "react-native-paper";
import {login, useMyContextController} from '../Store/firebase';

const Login = ({ navigation }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [controller, dispatch] = useMyContextController();
  const {userLogin} = controller;
  useEffect(() => {
    if (userLogin != null) {
      if (userLogin.role === 'admin') {
        Alert.alert("Chào mừng admin đăng nhập!");
        navigation.navigate("HomeScreenAdmin");
      } else {
        Alert.alert(`Chào mừng đăng nhập: ${userLogin.fullname}`);
        navigation.navigate("HomeScreen", { fullname: userLogin.fullname }); 
      }
    }
    console.log(userLogin);
  }, [navigation, userLogin]);
  const handleLogin = () => {
    let regEmail =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email.match(regEmail)) {
      Alert.alert('Chưa nhập tên tài khoản hoặc sai định dạng');
    } else if (password.length < 6) {
      Alert.alert('Mật khẩu cần 6 từ khóa trở lên');
    } else {
      login(dispatch, email, password);
    }
  };
  return (
    <View style={styles.container}>
      <Image resizeMode="contain" source={require("../assets/logo.png")} style={styles.image} />
      <Text style={{ paddingBottom: 8, fontSize: 16 , color:'#000'}}>Tài khoản</Text>
      <TextInput style={styles.input} value={email} onChangeText={text => setEmail(text)} placeholderTextColor="#aaaaaa" />
      <Text style={{ paddingBottom: 8, fontSize: 16,color:'#000' }}>Mật khẩu</Text>
      <TextInput style={styles.input} value={password} onChangeText={text => setPassword(text)} placeholderTextColor="#aaaaaa" secureTextEntry />

      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Đăng Nhập</Text>
      </TouchableOpacity>

      <View style={{ alignItems: 'center' }}>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={()=> navigation.navigate('ForgotPass')}>
            <Text style={{ color: "black", fontSize: 16, marginTop: 6 }}>Quên mật khẩu?</Text>
          </TouchableOpacity>
          <Button onPress={() => navigation.navigate('Register')}><Text style={{ color: "black", fontSize: 16, }}>Tạo tài khoản</Text></Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 15,
    width: "100%",
    height: "100%",
    backgroundColor: "#99ddff",
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
    alignItems: 'center',
    width: 'auto',
    backgroundColor: "white",
    fontSize: 16,
    color: '#000'
  },
  button: {
    backgroundColor: '#0066FF',
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

export default Login;
