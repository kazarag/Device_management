import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";
import firestore from '@react-native-firebase/firestore'; // Import Firestore from @react-native-firebase
import { useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const MyDetailDevices = ({route }) => {
    
    const navigation = useNavigation();
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

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.title}>Chi tiết thiết bị</Text>

                <Text style={styles.label}>Tên thiết bị</Text>
                <TextInput
                    style={[styles.input, styles.disabledInput]}
                    value={deviceDetail.devicesName}
                    editable={false}
                />
                <Text style={styles.label}>Phòng</Text>
                <TextInput
                    style={[styles.input, styles.disabledInput]}
                    value={deviceDetail.room}
                    editable={false}
                />
                <Text style={styles.label}>Người dùng</Text>
                <TextInput
                    style={[styles.input, styles.disabledInput]}
                    value={deviceDetail.user}
                    editable={false}
                />
                <Text style={styles.label}>Loại thiết bị</Text>
                <TextInput
                    style={[styles.input, styles.disabledInput]}
                    value={deviceDetail.type}
                    editable={false}
                />
                <Text style={styles.label}>Thông tin</Text>
                <TextInput
                    style={[styles.input, styles.disabledInput, { height: 150 }]}
                    multiline
                    value={deviceDetail.info}
                    editable={false}
                />
                <Text style={styles.label}>Nhà cung cấp</Text>
                <TextInput
                    style={[styles.input, styles.disabledInput]}
                    value={deviceDetail.supplier}
                    editable={false}
                />
                <Text style={styles.label}>Ngày mua</Text>
                <TextInput
                    style={[styles.input, styles.disabledInput]}
                    value={deviceDetail.datePurchase}
                    editable={false}
                />
                <Text style={styles.label}>Thời gian bảo hành</Text>
                <TextInput
                    style={[styles.input, styles.disabledInput]}
                    value={deviceDetail.warrantyperiod}
                    editable={false}
                />
                <Text style={styles.label}>Tình trạng</Text>
                <TextInput
                    style={[styles.input, styles.disabledInput]}
                    value={deviceDetail.status}
                    editable={false}
                />
                <Text style={styles.label}>Ngày sử dụng</Text>
                <TextInput
                    style={[styles.input, styles.disabledInput]}
                    value={deviceDetail.dateUse}
                    editable={false}
                />
                <Text style={styles.label}>Thời gian khấu hao</Text>
                <TextInput
                    style={[styles.input, styles.disabledInput]}
                    value={deviceDetail.depreciationPeriod}
                    editable={false}
                />
                <Text style={styles.label}>Ghi chú</Text>
                <TextInput
                    style={[styles.input, styles.disabledInput, { height: 100 }]}
                    multiline
                    value={deviceDetail.note}
                    editable={false}
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.updateButton}
                    onPress={() => navigation.navigate('Error', { deviceName: deviceDetail.devicesName })}
                >
                    <Text style={styles.updateButtonText}>Báo lỗi</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.backButtonText}>Trở về</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: "white",
    },
    title: {
        fontSize: 24,
        fontWeight: '400',
        marginBottom: 16,
        textAlign: "center",
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
        marginBottom: 15,
        fontSize: 16,
        borderRadius: 5,
        paddingLeft: 10,
        backgroundColor: "white",
    },
    disabledInput: {
        backgroundColor: '#f4f4f4', // Màu xám nhạt
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    updateButton: {
        backgroundColor: '#3498db',
        paddingVertical: 15,
        borderRadius: 5,
        flex: 1,
        marginRight: 10,
    },
    updateButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
    },
    backButton: {
        backgroundColor: '#e74c3c',
        paddingVertical: 15,
        borderRadius: 5,
        flex: 1,
    },
    backButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
    },
});

export default MyDetailDevices;
