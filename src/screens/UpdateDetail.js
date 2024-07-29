import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import firestore from '@react-native-firebase/firestore'; // Import firestore from @react-native-firebase/firestore

const UpdateDetail = ({ route }) => {
    const [deviceDetail, setDeviceDetail] = useState({
        devicesName: '',
        room: '',
        user: '',
        type: '',
        info: '',
        supplier: '',
        datePurchase: '',
        warrantyperiod: '',
        status: '',
        dateUse: '',
        depreciationPeriod: '',
        note: '',
    });

    useEffect(() => {
        const fetchDeviceDetail = async () => {
            const deviceRef = firestore().collection('DEVICES').doc(route.params.deviceId);

            try {
                const docSnap = await deviceRef.get();
                if (docSnap.exists) {
                    const data = docSnap.data();
                    setDeviceDetail({
                        devicesName: data.devicesName || '',
                        room: data.room || '',
                        user: data.user || '',
                        type: data.type || '',
                        info: data.info || '',
                        supplier: data.supplier || '',
                        datePurchase: data.datePurchase || '',
                        warrantyperiod: data.warrantyperiod || '',
                        status: data.status || '',
                        dateUse: data.dateUse || '',
                        depreciationPeriod: data.depreciationPeriod || '',
                        note: data.note || '',
                    });
                } else {
                    console.log('No such document!');
                }
            } catch (error) {
                console.error('Error fetching document: ', error);
            }
        };

        fetchDeviceDetail();
    }, [route.params.deviceId]);

    const updateDeviceDetail = async () => {
        const deviceRef = firestore().collection('DEVICES').doc(route.params.deviceId);

        try {
            await deviceRef.update({
                devicesName: deviceDetail.devicesName,
                room: deviceDetail.room,
                user: deviceDetail.user,
                type: deviceDetail.type,
                info: deviceDetail.info,
                supplier: deviceDetail.supplier,
                datePurchase: deviceDetail.datePurchase,
                warrantyperiod: deviceDetail.warrantyperiod,
                status: deviceDetail.status,
                dateUse: deviceDetail.dateUse,
                depreciationPeriod: deviceDetail.depreciationPeriod,
                note: deviceDetail.note,
            });
            Alert.alert("Cập nhật thành công!");
        } catch (error) {
            console.error('Error updating document: ', error);
            Alert.alert("Cập nhật không thành công. Vui lòng thử lại.");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Tên thiết bị</Text>
                <TextInput
                    style={styles.input}
                    value={deviceDetail.devicesName}
                    onChangeText={(text) => setDeviceDetail({ ...deviceDetail, devicesName: text })}
                />
                <Text style={styles.label}>Phòng</Text>
                <TextInput
                    style={styles.input}
                    value={deviceDetail.room}
                    onChangeText={(text) => setDeviceDetail({ ...deviceDetail, room: text })}
                />
                <Text style={styles.label}>Người dùng</Text>
                <TextInput
                    style={styles.input}
                    value={deviceDetail.user}
                    onChangeText={(text) => setDeviceDetail({ ...deviceDetail, user: text })}
                />
                <Text style={styles.label}>Loại thiết bị</Text>
                <TextInput
                    style={styles.input}
                    value={deviceDetail.type}
                    onChangeText={(text) => setDeviceDetail({ ...deviceDetail, type: text })}
                />

                <Text style={styles.label}>Thông tin</Text>
                <TextInput
                    style={[styles.input, { height: 150 }]}
                    multiline
                    value={deviceDetail.info}
                    onChangeText={(text) => setDeviceDetail({ ...deviceDetail, info: text })}
                />

                <Text style={styles.label}>Nhà cung cấp</Text>
                <TextInput
                    style={styles.input}
                    value={deviceDetail.supplier}
                    onChangeText={(text) => setDeviceDetail({ ...deviceDetail, supplier: text })}
                />
                <Text style={styles.label}>Ngày mua</Text>
                <TextInput
                    style={styles.input}
                    value={deviceDetail.datePurchase}
                    onChangeText={(text) => setDeviceDetail({ ...deviceDetail, datePurchase: text })}
                />
                <Text style={styles.label}>Thời gian bảo hành</Text>
                <TextInput
                    style={styles.input}
                    value={deviceDetail.warrantyperiod}
                    onChangeText={(text) => setDeviceDetail({ ...deviceDetail, warrantyperiod: text })}
                />
                <Text style={styles.label}>Tình trạng</Text>
                <TextInput
                    style={styles.input}
                    value={deviceDetail.status}
                    onChangeText={(text) => setDeviceDetail({ ...deviceDetail, status: text })}
                />
                <Text style={styles.label}>Ngày sử dụng</Text>
                <TextInput
                    style={styles.input}
                    value={deviceDetail.dateUse}
                    onChangeText={(text) => setDeviceDetail({ ...deviceDetail, dateUse: text })}
                />
                <Text style={styles.label}>Thời gian khấu hao</Text>
                <TextInput
                    style={styles.input}
                    value={deviceDetail.depreciationPeriod}
                    onChangeText={(text) => setDeviceDetail({ ...deviceDetail, depreciationPeriod: text })}
                />
                <Text style={styles.label}>Ghi chú</Text>
                <TextInput
                    style={[styles.input, { height: 100 }]}
                    multiline
                    value={deviceDetail.note}
                    onChangeText={(text) => setDeviceDetail({ ...deviceDetail, note: text })}
                />

                {/* Button to update */}
                <TouchableOpacity style={styles.updateButton} onPress={updateDeviceDetail}>
                    <Text style={styles.updateButtonText}>Cập nhật</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

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
        fontSize: 16,
        borderRadius: 5,
        paddingLeft: 10
    },
    updateButton: {
        backgroundColor: '#3498db',
        paddingVertical: 15,
        borderRadius: 5,
        marginTop: 20,
    },
    updateButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
    },
});

export default UpdateDetail;
