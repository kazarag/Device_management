import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import firestore from '@react-native-firebase/firestore'; // Import from @react-native-firebase/firestore
import { HelperText } from "react-native-paper";

const UpdateUsers = ({ route }) => {
    const { fullname } = route.params;

    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [room, setRoom] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const usersRef = firestore().collection('users');
                const querySnapshot = await usersRef.where('fullname', '==', fullname).get();

                if (querySnapshot.empty) {
                    setError('No user found');
                    setLoading(false);
                    return;
                }

                querySnapshot.forEach(doc => {
                    const userData = doc.data();
                    setEmail(userData.email || '');
                    setPhone(userData.phone || '');
                    setPassword(userData.password || '');
                    setRoom(userData.room || '');
                    setLoading(false);
                });
            } catch (error) {
                console.error("Error fetching user data:", error);
                setError('An error occurred while fetching user data.');
                setLoading(false);
            }
        };

        fetchUserData();
    }, [fullname]);

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Tên người dùng</Text>
                <TextInput style={styles.input} value={fullname} editable={false} />
                <Text style={styles.label}>Số điện thoại</Text>
                <TextInput style={styles.input} value={phone} onChangeText={setPhone} />
                <Text style={styles.label}>Email</Text>
                <TextInput style={styles.input} value={email} onChangeText={setEmail} />
                <Text style={styles.label}>Mật khẩu</Text>
                <TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />
                <Text style={styles.label}>Phòng</Text>
                <TextInput style={styles.input} value={room} onChangeText={setRoom} />
                {error ? <HelperText type="error" style={styles.errorText}>{error}</HelperText> : null}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        paddingTop: 30,
        backgroundColor: "white",
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
        borderColor: "#ccc",
        borderWidth: 1,
        backgroundColor: "white",
        marginBottom: 15,
        fontSize: 20,
        borderRadius: 5,
        paddingLeft: 10,
    },
    errorText: {
        fontSize: 13,
    },
});

export default UpdateUsers;
