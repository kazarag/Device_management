import React, {useEffect, useState} from 'react';
import {View, Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import auth from '@react-native-firebase/auth';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  MyContextControllerProvider,
  useMyContextController,
} from './src/Store/firebase';
import MyStack from './src/Router/Stack';
import Login from './src/Screen/login';

export default function App() {
  return (
    <View style={{flex: 1}}>
    <MyContextControllerProvider>
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
    </MyContextControllerProvider>
    
  </View>
  );
}

