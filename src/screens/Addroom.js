import React from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import firestore from '@react-native-firebase/firestore';
import { HelperText } from "react-native-paper";
import { addRoom } from "../Store/firebase";

const Addroom = ({ navigation }) => {
    const [roomName, setRoomName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [note, setNote] = React.useState('');
    const [loading, setLoading] = React.useState(true);
    const [rooms, setRooms] = React.useState([]);
    const [error, setError] = React.useState('');

    const AddRoom = async () => {
        if (!roomName.trim() || !description.trim() || !note.trim()) {
            setError('Tên phòng, mô tả và ghi chú không được để trống');
            return;
        }

        setError('');
        try {
            await addRoom(roomName, description, note);
            Alert.alert('Thêm phòng thành công!');
            setRoomName('');
            setDescription('');
            setNote('');
        } catch (error) {
            console.error("Lỗi:", error);
            setError(error.message);
        }
    }

    React.useEffect(() => {
        const ref = firestore().collection('ROOM');

        const unsubscribe = ref.onSnapshot((querySnapshot) => {
            const list = [];
            querySnapshot.forEach((doc) => {
                const { roomName, description, note } = doc.data();
                list.push({
                    id: doc.id,
                    roomName,
                    description,
                    note,
                });
            });
            setRooms(list);
            if (loading) {
                setLoading(false);
            }
        });

        return unsubscribe;
    }, [loading]);

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Tên phòng</Text>
                <TextInput style={styles.input} value={roomName} onChangeText={setRoomName} />
                <Text style={styles.label}>Mô tả</Text>
                <TextInput style={styles.inputMultiline} multiline value={description} onChangeText={setDescription} />
                <Text style={styles.label}>Ghi chú</Text>
                <TextInput style={styles.input} value={note} onChangeText={setNote} />
                {error ? <HelperText type="error" style={styles.errorText}>{error}</HelperText> : null}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={AddRoom} style={[styles.button, styles.addButton]}>
                        <Text style={styles.buttonText}>Thêm</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { setRoomName(''); setDescription(''); setNote(''); }} style={styles.button}>
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
        paddingTop: 20,
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
    inputMultiline: {
        backgroundColor: "white",
        marginBottom: 10,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#ccc",
        placeholderTextColor: "#777777",
        height: 100,
        fontSize: 20,
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

export default Addroom;
