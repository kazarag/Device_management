import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { HelperText } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

const AddTypeOfDevice = ({ navigation }) => {
  const [typeName, setTypeName] = React.useState('');
  const [describe, setDescribe] = React.useState('');
  const [note, setNote] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  const [types, setTypes] = React.useState([]);
  const [error, setError] = React.useState('');

  const addType = async () => {
    if (!typeName.trim() || !describe.trim() || !note.trim()) {
      setError('Tất cả các trường đều phải được điền.');
      return;
    }
    if (!typeName.trim()) {
      setError('Tên loại không được để trống');
      return;
    }
    if (!describe.trim()) {
      setError('Mô tả không được để trống');
      return;
    }
    if (!note.trim()) {
      setError('Ghi chú không được để trống');
      return;
    }

    setError('');

    const ref = firestore().collection('TYPE_OF_DEVICE');

    try {
      await ref.add({
        typeName,
        describe,
        note,
      });
      Alert.alert('Thêm loại thiết bị thành công!');
      setTypeName('');
      setDescribe('');
      setNote('');
    } catch (error) {
      console.error('Lỗi:', error);
    }
  };

  React.useEffect(() => {
    const ref = firestore().collection('TYPE_OF_DEVICE');

    const unsubscribe = ref.onSnapshot(querySnapshot => {
      const list = [];
      querySnapshot.forEach(doc => {
        const { typeName, describe, note } = doc.data();
        list.push({
          id: doc.id,
          typeName,
          describe,
          note,
        });
      });
      setTypes(list);
      if (loading) {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, [loading]);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Tên loại</Text>
        <TextInput
          style={styles.input}
          value={typeName}
          onChangeText={setTypeName}
        />
        <Text style={styles.label}>Mô tả</Text>
        <TextInput
          style={styles.inputMultiline}
          multiline
          value={describe}
          onChangeText={setDescribe}
        />
        <Text style={styles.label}>Ghi chú</Text>
        <TextInput
          style={styles.inputMultiline}
          multiline
          value={note}
          onChangeText={setNote}
        />
        {error ? (
          <HelperText type="error" style={styles.errorText}>
            {error}
          </HelperText>
        ) : null}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={addType}
            style={[styles.button, styles.addButton]}>
            <Text style={styles.buttonText}>Thêm</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setTypeName('');
              setDescribe('');
              setNote('');
            }}
            style={styles.button}>
            <Text style={styles.buttonText}>Huỷ</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    paddingTop: 20,
    backgroundColor: 'white',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    backgroundColor: 'white',
    marginBottom: 15,
    fontSize: 20,
    borderRadius: 5,
    paddingLeft: 10,
  },
  inputMultiline: {
    backgroundColor: 'white',
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    height: 100,
    fontSize: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#21005d',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    width: '30%',
    marginLeft: 10,
  },
  addButton: {
    backgroundColor: '#21005d',
  },
  errorText: {
    fontSize: 13,
  },
});

export default AddTypeOfDevice;
