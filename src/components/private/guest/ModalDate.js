import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import MyTheme from '../../../config/theme.js';
import { Cross } from '../../../../assets/icons/budget/index.js';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const ModalDate = ({ visible, onClose, onAddTarget, oldTarget }) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        if (oldTarget) {
            const date = new Date(oldTarget);
            if (!isNaN(date.getTime())) {
                setSelectedDate(date);
            }
        }
    }, [oldTarget]);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setSelectedDate(date);
        hideDatePicker();
    };

    const handleSave = () => {
        onAddTarget(selectedDate);
        onClose();
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    };

    return (
        <Modal
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <TouchableOpacity style={{ alignItems: 'flex-end' }} onPress={onClose}>
                        <Cross fillClassName={MyTheme.colors.neutral_2p} width={20} height={20} />
                    </TouchableOpacity>
                    <View style={{ alignItems: 'center', marginBottom: 35 }}>
                        <Text style={[MyTheme.typography.subtitle.sub_2]}>Edit Deadline</Text>
                    </View>
                    <TouchableOpacity style={styles.datePickerButton} onPress={showDatePicker}>
                        <Text style={[{ color: MyTheme.colors.brown_2 }, MyTheme.typography.body.body_1]}>
                            {formatDate(selectedDate)}
                        </Text>
                    </TouchableOpacity>
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                        date={selectedDate}
                        pickerContainerStyleIOS={styles.pickerContainerStyleIOS}
                        textColor='black'// Ensure text color is visible
                        themeVariant='light'
                    />
                    <View style={styles.modalButtons}>
                        <TouchableOpacity style={styles.modalButton} onPress={handleSave}>
                            <Text style={[{ color: MyTheme.colors.white }, MyTheme.typography.subtitle.sub_3]}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: 300,
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 20,
    },
    datePickerButton: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.5,
        borderColor: MyTheme.colors.brown_2,
        borderRadius: 48,
        padding: 10,
        backgroundColor: 'rgba(255, 218, 194, 0.25)',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20,
    },
    modalButton: {
        flex: 1,
        paddingVertical: 10,
        backgroundColor: MyTheme.colors.brown_2,
        alignItems: 'center',
        borderRadius: 48,
    },
    pickerContainerStyleIOS: {
        backgroundColor: MyTheme.colors.white,
    },
});

export default ModalDate;
