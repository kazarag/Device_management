import { Alert, Image, StyleSheet, View, Text } from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import React, { useEffect } from 'react';
import '@react-native-firebase/app';
import { login, useMyContextController } from '../Store/firebase';

function Login({ navigation }) {
  const [controller, dispatch] = useMyContextController();
  const [email, setEmail] = React.useState('');
  const [pass, setPass] = React.useState('');
  const { userLogin } = controller;
  const [error, setError] = React.useState('');
  const [errorPass, setErrorPass] = React.useState('');

  useEffect(() => {
    if (userLogin != null) {
      if (userLogin.role === "admin")
        navigation.navigate('homeAdmin');
      else if (userLogin.role === "user")
        navigation.navigate('homeUser');
    }
    console.log(userLogin);
  }, [navigation, userLogin]);

  const handleLogin = () => {
    let regEmail =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email.match(regEmail)) {
      setError('Chưa nhập tên tài khoản');
    } else if (pass.length < 6) {
      setErrorPass('Mật khẩu cần 6 từ khóa trở lên');
    } else {
      setError('');
      setErrorPass('');
      login(dispatch, email, pass);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 15, backgroundColor: '#E1E0FF' }}>
      <Image
        source={require('../assets/logo.png')}
        style={styles.image}
      />
      <Text style={styles.label}>Tài Khoản</Text>
      <TextInput
        label={'Email'}
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        underlineColor="#fff"
      />
      {error && <HelperText type="error">{error}</HelperText>}
      <Text style={styles.label}>Mật Khẩu</Text>
      <TextInput
        secureTextEntry
        label={'Password'}
        value={pass}
        onChangeText={setPass}
        style={styles.input}
        underlineColor="#fff"
      />
      {errorPass && <HelperText type="error">{errorPass}</HelperText>}
      <Button
        style={{ borderRadius: 8, backgroundColor: '#507FF9' }}
        mode="contained"
        onPress={handleLogin}
      >
        <Text style={{ color: '#fff' }}>Đăng nhập</Text>
      </Button>
      <View
        style={{
          flexDirection: 'row',
          marginBottom: 50,
          justifyContent: 'center',
          alignContent: 'center',
          
        }}>
        <Button onPress={() => navigation.navigate('ForgotPass')}>
          Quên mật khẩu?
        </Button>
      </View>
    </View>
  );
}

export default Login;

const styles = StyleSheet.create({
  image: {
    height: 174,
    width: 174,
    alignSelf: 'center',
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8
  },
  label: {
    color: '#000',
    marginBottom: 5,
  },
});
