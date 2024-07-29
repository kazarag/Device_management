import React from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { HelperText } from "react-native-paper";

const AddUsers = ({ navigation }) => {
    const [email, setEmail] = React.useState('');
    const [fullname, setFullname] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [room, setRoom] = React.useState('');
    const [role, setRole] = React.useState('');
    const [loading, setLoading] = React.useState(true);
    const [users, setUsers] = React.useState([]);
    const [error, setError] = React.useState('');

    const USERS = firestore().collection('USERS');

    const addUser = async () => {
        if (!email.trim() || !fullname.trim() || !phone.trim() || !password.trim() || !room.trim() || !role.trim()) {
            setError('Không được để trống!');
            return;
        }

        setError('');
        try {
            await auth().createUserWithEmailAndPassword(email, password);
            await USERS.doc(email).set({
                email,
                fullname,
                phone,
                password,
                room,
                role,
            });

            Alert.alert('Thêm người dùng thành công!');
            setEmail('');
            setFullname('');
            setPhone('');
            setPassword('');
            setRoom('');
            setRole('');
        } catch (error) {
            console.error("Lỗi:", error);
            setError(error.message);
        }
    }

    React.useEffect(() => {
        const unsubscribe = USERS.onSnapshot((querySnapshot) => {
            const list = [];
            querySnapshot.forEach((doc) => {
                const { email, fullname, phone, password, room, role } = doc.data();
                list.push({
                    id: doc.id,
                    email,
                    fullname,
                    phone,
                    password,
                    room,
                    role,
                });
            });
            setUsers(list);
            if (loading) {
                setLoading(false);
            }
        });

        return unsubscribe;
    }, [loading]);

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Tên người dùng</Text>
                <TextInput style={styles.input} value={fullname} onChangeText={setFullname} />
                <Text style={styles.label}>Số điện thoại</Text>
                <TextInput style={styles.input} value={phone} onChangeText={setPhone} />
                <Text style={styles.label}>Email</Text>
                <TextInput style={styles.input} value={email} onChangeText={setEmail} />
                <Text style={styles.label}>Mật khẩu</Text>
                <TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />
                <Text style={styles.label}>Phòng</Text>
                <TextInput style={styles.input} value={room} onChangeText={setRoom} />
                <Text style={styles.label}>Vai trò</Text>
                <TextInput style={styles.input} value={role} onChangeText={setRole} />
                {error ? <HelperText type="error" style={styles.errorText}>{error}</HelperText> : null}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={addUser} style={[styles.button, styles.addButton]}>
                        <Text style={styles.buttonText}>Thêm</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { setEmail(''); setFullname(''); setPhone(''); setPassword(''); setRoom(''); setRole(''); }} style={styles.button}>
                        <Text style={styles.buttonText}>Huỷ</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

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
        paddingLeft: 10
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
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    errorText: {
        fontSize: 13,
    },
});

export default AddUsers;
