import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useMyContextController } from '../Store/firebase';
const [device, setDevice] = useState('');
const [errorDescription, setErrorDescription] = useState('');

  const handleSend = () => {
    
    console.log('Thiết bị:', device);
    console.log('Mô tả lỗi:', errorDescription);
  };

  const handleCancel = () => {
    
    setDevice('');
    setErrorDescription('');
  };
const report =({navigation})=>{
  const [controller, dispatch] = useMyContextController();

    return (
        <View style={styles.container}>
          <Text style={styles.label}>Thiết bị</Text>
          <TextInput
            style={styles.input}
            value={device}
            onChangeText={setDevice}
          />
          
          <Text style={styles.label}>Mô tả lỗi</Text>
          <TextInput
            style={styles.input}
            value={errorDescription}
            onChangeText={setErrorDescription}
            multiline
          />
          
          <View style={styles.buttonContainer}>
            <Button title="Gửi" onPress={handleSend} />
            <Button title="Hủy" onPress={handleCancel} />
          </View>
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        padding: 20,
      },
      label: {
        fontSize: 16,
        marginBottom: 10,
      },
      input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
    });
export default report;