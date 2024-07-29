import React, {useEffect} from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {
  MyContextControllerProvider,
  useMyContextController,
} from './src/Store/firebase';
import MyStack from './src/Router/Stack';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const App = () => {
  const USERS = firestore().collection('USERS');
  const admin = {
    fullname: 'Admin',
    email: 'admin1@gmail.com',
    password: '1234567',
    phone: '0913214555',
    role: 'admin',
    room: 'Kỹ thuật',
  };

  useEffect(() => {
    USERS.doc(admin.email).onSnapshot(u => {
      if (!u.exists) {
        auth()
          .createUserWithEmailAndPassword(admin.email, admin.password)
          .then(() => {
            USERS.doc(admin.email).set(admin);
            console.log('Add new account admin');
          });
      }
    });
  }, []);

  return (
    <View style={{flex: 1}}>
      <MyContextControllerProvider>
        <NavigationContainer>
          <MyStack />
        </NavigationContainer>
      </MyContextControllerProvider>
    </View>
  );
};

export default App;
