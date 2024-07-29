import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useMyContextController } from '../Store/firebase';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import ForgotPass from '../screens/ForgotPass'
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import Addroom from '../screens/Addroom';
import AddTypeOfDevice from '../screens/AddTypeOfDevice';
import DetailDevice from '../screens/DetailDevice';
import ListRooms from '../screens/ListRooms';
import ListTypeOfDevice from '../screens/ListTypeOfDevice';
import ListDevices from '../screens/ListDevices';
import UpdateDetail from '../screens/UpdateDetail';
import MyDevices from '../screens/MyDevices';
import MyDetailDevices from '../screens/MyDetailDevices';
import Error from '../screens/Error';
import HomeScreenAdmin from '../screens/HomeScreenAdmin';
import MyProfile from '../screens/MyProfile';
import MyProfileAdmin from '../screens/MyProfileAdmin';
import ListUser from '../screens/ListUser';
import AddUsers from '../screens/AddUsers';
import UpdateUsers from '../screens/UpdateUsers';
import { Icon } from 'react-native-paper';
const Stack = createStackNavigator();
const MyStack = ({ navigation, route }) => {
  const [controller, dispatch] = useMyContextController();
  const { userLogin } = controller;
  return (
    <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        <Stack.Screen options={{ headerShown: false }} name="ForgotPass" component={ForgotPass} />
        <Stack.Screen options={{title: 'Đăng Ký', headerTitleAlign: 'center'}} name='Register' component={RegisterScreen} />
        <Stack.Screen options={{title: 'Trang Chủ', headerTitleAlign: 'center', headerLeft: () => null}} name='HomeScreen' component={HomeScreen} />
        <Stack.Screen options={{title: 'Thêm Phòng', headerTitleAlign: 'center'}} name='Addroom' component={Addroom}/>
        <Stack.Screen options={{title: 'Thêm Loại Thiết Bị', headerTitleAlign: 'center'}} name='AddTypeOfDevice' component={AddTypeOfDevice}/>
        <Stack.Screen options={{title: 'Thêm Chi Tiết Thiết Bị', headerTitleAlign: 'center'}} name='DetailDevice' component={DetailDevice}/>
        <Stack.Screen options={({ navigation }) => ({ title: 'Danh Sách Phòng', headerTitleAlign: 'center', headerRight: () => (
              <Icon name="plus-circle" onPress={() => navigation.navigate('Addroom')} size={30} color="#49454f" style={{ marginRight: 30 }}/> ), })}
              name='ListRooms' component={ListRooms}
        />
        <Stack.Screen options={({ navigation }) => ({ title: 'Danh Sách Thiết Bị', headerTitleAlign: 'center', headerRight: () => (
              <Icon name="plus-circle" onPress={() => navigation.navigate('AddDevice')} size={30} color="#49454f" style={{ marginRight: 30 }}/> ), })}
              name='ListTypeOfDevice' component={ListTypeOfDevice}
        />
        <Stack.Screen options={({ navigation }) => ({ title: 'Thiết Bị', headerTitleAlign: 'center', headerRight: () => (
              <Icon name="plus-circle" onPress={() => navigation.navigate('DetailDevice')} size={30} color="#49454f" style={{ marginRight: 30 }}/> ), })}
              name='ListDevices' component={ListDevices}
        />
        <Stack.Screen options={{title: 'Chi Tiết Thiết Bị', headerTitleAlign: 'center'}} name='UpdateDetail' component={UpdateDetail}/>
        <Stack.Screen options={{title: 'Thiết Bị Của Tôi', headerTitleAlign: 'center'}} name='MyDevices' component={MyDevices}/>
        <Stack.Screen options={{ headerShown: false }} name='MyDetailDevices' component={MyDetailDevices}/>
        <Stack.Screen options={{title: 'Trở về'}} name='Error' component={Error}/>
        <Stack.Screen options={{title: 'Trang Chủ', headerTitleAlign: 'center', headerLeft: () => null}} name='HomeScreenAdmin' component={HomeScreenAdmin}/>
        <Stack.Screen options={{title: 'Hồ Sơ Cá Nhân', headerTitleAlign: 'center'}} name='MyProfile' component={MyProfile}/>
        <Stack.Screen options={{title: 'Hồ Sơ Cá Nhân', headerTitleAlign: 'center'}} name='MyProfileAdmin' component={MyProfileAdmin}/>

        <Stack.Screen options={({ navigation }) => ({ title: 'Danh Sách Người Dùng', headerTitleAlign: 'center', headerRight: () => (
              <Icon name="plus-circle" onPress={() => navigation.navigate('AddUsers')} size={30} color="#49454f" style={{ marginRight: 30 }}/> ), })}
              name='ListUser' component={ListUser}
        />
        <Stack.Screen options={{title: 'Thêm Người Dùng', headerTitleAlign: 'center'}} name='AddUsers' component={AddUsers} />
        <Stack.Screen options={{title: 'Chi Tiết Người Dùng', headerTitleAlign: 'center'}} name='UpdateUsers' component={UpdateUsers} />
      </Stack.Navigator>
  );
};

export default MyStack;
