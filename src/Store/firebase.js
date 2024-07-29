import {createContext, useContext, useMemo, useReducer} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {Alert} from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
const MyContext = createContext();
const reducer = (state, action) => {
  switch (action.type) {
    case 'USER_LOGIN': {
      return {...state, userLogin: action.value};
    }
    case 'USER_LOGOUT': {
      return {...state, userLogin: null};
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};
const MyContextControllerProvider = ({children}) => {
  const initialState = {
    userLogin: null,
  };
  const [controller, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(() => [controller, dispatch]);
  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};
const useMyContextController = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error(
      'useMyContextController phai dat trong MyContextControllerProvider',
    );
  }
  return context;
};
const USERS = firestore().collection('USERS');

const createAccount = (email, password, fullname, phone, room, role) => {
  auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      Alert.alert('Tạo tài khoản thành công với ' + email);
      USERS.doc(email).set({
        email,
        password,
        fullname,
        phone,
        room,
        role,
      });
    })
    .catch(e => console.log(e.message));
};
const login = (dispatch, email, password) => {
  auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      USERS.doc(email).onSnapshot(async u => {
        if (u.exists) {
          const userData = u.data();
          Alert.alert('Đăng nhập thành công với ' + u.id);
          dispatch({type: 'USER_LOGIN', value: userData});
        }
      });
    })
    .catch(e => Alert.alert('Sai email hoặc mật khẩu'));
};

const logout = dispatch => {
  auth()
    .signOut()
    .then(() => {
      dispatch({ type: 'USER_LOGOUT' });
    })
    .catch(error => {
      console.error('Error logging out: ', error);
    });
};
const DEVICES = firestore().collection('DEVICES');
const addDevices = (
  devicesName,
  room,
  user,
  type,
  info,
  supplier,
  datePurchase,
  warrantyperiod,
  status,
  dateUse,
  depreciationPeriod,
  note
) => {
  DEVICES.add({
    devicesName: devicesName,
    room: room,
    user: user,
    type: type,
    info: info,
    supplier:supplier,
    datePurchase:datePurchase,
    warrantyperiod:warrantyperiod,
    status: status,
    dateUse:dateUse,
    depreciationPeriod: depreciationPeriod,
    note:note
  })
    .then(() => console.log('add new DEVICE'))
    .catch(e => console.log(e.message));
};

const TYPE_OF_DEVICE = firestore().collection('TYPE_OF_DEVICE');
const addType = (typeName, describe,note) => {
  TYPE_OF_DEVICE.add({
    typeName: typeName,
    describe: describe,
    note:note
  })
    .then(() => console.log('add new TYPE_OF_DEVICE'))
    .catch(e => console.log(e.message));
};
const ROOMS = firestore().collection('ROOM');
const addRoom = (roomName, describe, note) => {
  ROOMS.add({
    roomName: roomName,
    describe: describe,
    note:note
  })
    .then(() => console.log('add new Room'))
    .catch(e => console.log(e.message));
};

const REPORT = firestore().collection('ERROR');

export {
  MyContextControllerProvider,
  useMyContextController,
  login,
  logout,
  createAccount,
  addDevices,
  addType,
  addRoom,
};
