import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {useMyContextController} from '../Store/firebase';
import Login from '../Screen/login';
import report from '../Screen/report';
const Stack = createStackNavigator();
const MyStack = ({navigation, route}) => {
  const [controller, dispatch] = useMyContextController();
  const {userLogin} = controller;
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#FEF7FF',
        },
      
      }}
      >
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerTitle: 'Đăng nhập'}}
      />
      {/* <Stack.Screen
        name="Report"
        component={report}
        options={{headerTitle: 'Báo lỗi'}}
      /> */}
    </Stack.Navigator>
  );
};
export default MyStack;
