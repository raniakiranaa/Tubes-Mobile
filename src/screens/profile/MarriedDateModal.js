import React, { useState } from 'react';
import { View, Modal, StyleSheet } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import MyTheme from '../../config/theme';

const MarriedDateModal = ({
    visible = false,
    onClose = () => {},
    onSave = () => {},
    selectedDate = new Date(),
    onDateChange = () => {},
    dateToDisplay = () => {}
}) => {
    const [date, setDate] = useState(selectedDate);

    const handleConfirm = (date) => {
        setDate(date);
        onDateChange(date);
        onSave();
        dateToDisplay(date);
        onClose();
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <DateTimePickerModal
                    isVisible={visible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={onClose}
                    date={date}
                    pickerContainerStyleIOS={styles.pickerContainerStyleIOS}
                    textColor='black'// Ensure text color is visible
                    themeVariant='light'
                />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Ensure modal background
    },
    pickerContainerStyleIOS: {
        backgroundColor: MyTheme.colors.white,
    },
});

export default MarriedDateModal;
