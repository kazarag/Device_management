import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import {HelperText, Button} from 'react-native-paper';
import { createAccount } from '../Store/firebase';

const RegisterScreen = ({navigation}) => {


  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhoneNumber] = useState('');
  const [room, setRoom] = useState('');
  const [error, setError] = useState('');
  const role = 'user';

  const registerScreen = () => {
    if (!fullname.trim()) {
      setError('Tên không được để trống');
      return;
    }
    let regEmail =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email.match(regEmail)) {
      setError('Email sai định dạng');
      return;
    }
    if (password.length < 6) {
      setError('Mật khẩu ít nhất 6 kí tự');
      return;
    }
    if (!phone.trim()) {
      setError('Số điện thoại không được để trống');
      return;
    }
    if (!room.trim()) {
      setError('Phòng không được để trống');
      return;
    }

    createAccount(email, password, fullname, phone, room, role);
  };

  return (
    <View style={styles.container}>
      <Image
        resizeMode="contain"
        source={require('../assets/logo.png')}
        style={styles.image}
      />
      <Text style={{fontSize: 14, paddingBottom: 5}}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={text => setEmail(text)}
        placeholderTextColor="#777777"
      />
      <Text style={{fontSize: 14, paddingBottom: 5}}>Mật khẩu</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
        placeholderTextColor="#777777"
      />
      <Text style={{fontSize: 14, paddingBottom: 5}}>Họ tên</Text>
      <TextInput
        style={styles.input}
        value={fullname}
        onChangeText={text => setFullname(text)}
        placeholderTextColor="#777777"
      />
      <Text style={{fontSize: 14, paddingBottom: 5}}>Phòng</Text>
      <TextInput
        style={styles.input}
        value={room}
        onChangeText={text => setRoom(text)}
        placeholderTextColor="#777777"
      />
      <Text style={{fontSize: 14, paddingBottom: 5}}>Số điện thoại</Text>
      <TextInput
        style={styles.input}
        placeholder="+84"
        placeholderTextColor="black"
        value={phone}
        onChangeText={text => setPhoneNumber(text)}
      />

      <TouchableOpacity onPress={registerScreen} style={styles.button}>
        <Text style={styles.buttonText}>Đăng Ký</Text>
      </TouchableOpacity>

      {error ? <HelperText type="error">{error}</HelperText> : null}

      <View style={{alignItems: 'center'}}>
        <View style={{flexDirection: 'row'}}>
          <Text style={{marginTop: 9}}>Bạn đã có tài khoản?</Text>
          <Button
            onPress={() => navigation.navigate('Login')}
            style={{marginLeft: -5}}>
            Đăng nhập
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 15,
    width: '100%',
    height: '100%',
    backgroundColor: '#99ddff',
  },
  texts: {
    fontSize: 16,
    paddingBottom: 8,
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
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#0066FF',
    width: 'auto',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginVertical: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
