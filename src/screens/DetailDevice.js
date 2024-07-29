import React from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import firestore from '@react-native-firebase/firestore';
import { HelperText } from "react-native-paper";

const DetailDevice = ({ navigation }) => {
    const [devicesName, setDevicesName] = React.useState('');
    const [user, setUser] = React.useState('');
    const [type, setType] = React.useState('');
    const [room, setRoom] = React.useState('');
    const [info, setInfo] = React.useState('');
    const [supplier, setSupplier] = React.useState('');
    const [datePurchase, setDatePurchase] = React.useState('');
    const [warrantyperiod, setWarrantyPeriod] = React.useState('');
    const [status, setStatus] = React.useState('');
    const [dateUse, setDateUse] = React.useState('');
    const [depreciationPeriod, setDepreciationPeriod] = React.useState('');
    const [note, setNote] = React.useState('');
    const [loading, setLoading] = React.useState(true);
    const [devices, setDevices] = React.useState([]);
    const [error, setError] = React.useState('');

    const DEVICES = firestore().collection('DEVICES');

    const addDevices = async () => {
        if (!devicesName.trim()) {
            setError('Tên thiết bị không được trống');
            return;
        }
        if (!user.trim()) {
            setError('Tên người dùng không được để trống');
            return;
        }
        if (!type.trim()) {
            setError('Loại thiết bị không được để trống');
            return;
        }
        if (!room.trim()) {
            setError('Phòng loại không được để trống');
            return;
        }
        if (!info.trim()) {
            setError('Thông số không được để trống');
            return;
        }
        if (!status.trim()) {
            setError('Tình trạng không được để trống');
            return;
        }

        setError('');

        try {
            await DEVICES.add({
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
                note,
            });
            Alert.alert('Thêm thiết bị thành công!');
            setDevicesName('');
            setUser('');
            setType('');
            setRoom('');
            setInfo('');
            setSupplier('');
            setDatePurchase('');
            setWarrantyPeriod('');
            setStatus('');
            setDateUse('');
            setDepreciationPeriod('');
            setNote('');
        } catch (error) {
            console.error("Lỗi:", error);
        }
    }

    React.useEffect(() => {
        const unsubscribe = DEVICES.onSnapshot((querySnapshot) => {
            const list = [];
            querySnapshot.forEach((doc) => {
                const { devicesName, user, type, room, info, supplier, datePurchase, warrantyperiod, status, dateUse, depreciationPeriod, note } = doc.data();
                list.push({
                    id: doc.id,
                    devicesName,
                    user,
                    type,
                    room,
                    info,
                    supplier,
                    datePurchase,
                    warrantyperiod,
                    status,
                    dateUse,
                    depreciationPeriod,
                    note,
                });
            });
            setDevices(list);
            if (loading) {
                setLoading(false);
            }
        });

        return unsubscribe;
    }, [loading]);

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={{ marginBottom: 5, fontSize: 16 }}>Tên thiết bị</Text>
                <TextInput style={styles.input} value={devicesName} onChangeText={setDevicesName} />
                <Text style={{ marginBottom: 5, fontSize: 16 }}>Tên người dùng</Text>
                <TextInput style={styles.input} value={user} onChangeText={setUser} />
                <Text style={{ marginBottom: 5, fontSize: 16 }}>Loại thiết bị</Text>
                <TextInput style={styles.input} value={type} onChangeText={setType} />
                <Text style={{ marginBottom: 5, fontSize: 16 }}>Phòng thiết bị</Text>
                <TextInput style={styles.input} value={room} onChangeText={setRoom} />
                <Text style={{ marginBottom: 5, fontSize: 16 }}>Thông số kỹ thuật</Text>
                <TextInput style={styles.input} multiline value={info} onChangeText={setInfo} />
                <Text style={{ marginBottom: 5, fontSize: 16 }}>Nhà cung cấp</Text>
                <TextInput style={styles.input} value={supplier} onChangeText={setSupplier} />
                <Text style={{ marginBottom: 5, fontSize: 16 }}>Ngày mua</Text>
                <TextInput style={styles.input} value={datePurchase} onChangeText={setDatePurchase} />
                <Text style={{ marginBottom: 5, fontSize: 16 }}>Thời gian bảo hành</Text>
                <TextInput style={styles.input} value={warrantyperiod} onChangeText={setWarrantyPeriod} />
                <Text style={{ marginBottom: 5, fontSize: 16 }}>Tình trạng</Text>
                <TextInput style={styles.input} value={status} onChangeText={setStatus} />
                <Text style={{ marginBottom: 5, fontSize: 16 }}>Ngày sử dụng</Text>
                <TextInput style={styles.input} value={dateUse} onChangeText={setDateUse} />
                <Text style={{ marginBottom: 5, fontSize: 16 }}>Thời gian khấu hao</Text>
                <TextInput style={styles.input} value={depreciationPeriod} onChangeText={setDepreciationPeriod} />
                <Text style={{ marginBottom: 5, fontSize: 16 }}>Ghi chú</Text>
                <TextInput style={styles.input} value={note} onChangeText={setNote} />
                {error ? <HelperText type="error" style={{ fontSize: 13 }}>{error}</HelperText> : null}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={addDevices} style={[styles.button, styles.addButton]}>
                        <Text style={styles.buttonText}>Thêm</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { 
                        setDevicesName(''); 
                        setUser(''); 
                        setType(''); 
                        setRoom(''); 
                        setInfo(''); 
                        setSupplier(''); 
                        setDatePurchase(''); 
                        setWarrantyPeriod(''); 
                        setStatus(''); 
                        setDateUse(''); 
                        setDepreciationPeriod(''); 
                        setNote(''); 
                    }} style={styles.button}>
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
        backgroundColor: "white",
    },
    inputContainer: {
        marginBottom: 20,
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
});

export default DetailDevice;
