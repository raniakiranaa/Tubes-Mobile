import React from 'react';
import { View, Text, StyleSheet, Modal, TextInput, TouchableOpacity } from 'react-native';
import MyTheme from '../../../config/theme.js';
import { TextInputIcon } from '../../shares/TextInput/TextInputIcon.js';
import { Cross } from '../../../../assets/icons/budget/index.js'

const ModalCategory = ({ visible, onClose, onAddCategory, newCategory, setNewCategory }) => {
    return (
        <Modal
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <TouchableOpacity style={{ alignItems: 'flex-end' }} onPress={onClose}>
                        <Cross fillClassName={MyTheme.colors.neutral_2p} width={20} height={20}/>
                    </TouchableOpacity>
                    <View style={{ alignItems: 'center', marginBottom: 35 }}>
                        <Text style={[MyTheme.typography.subtitle.sub_2]}>Create Category</Text>
                    </View>
                    <View style={{ paddingHorizontal: 5 }}>
                        <TextInputIcon
                            placeholder="Category Name"
                            mode="text"
                            fontSize={MyTheme.typography.body.body_1}
                            value={newCategory}
                            onChangeText={setNewCategory}
                        />
                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={styles.modalButton} onPress={onAddCategory}>
                                <Text style={[{ color: MyTheme.colors.white }, MyTheme.typography.subtitle.sub_3]}>Add</Text>
                            </TouchableOpacity>
                        </View>
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
        borderRadius: 10,
        padding: 20,
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
        borderRadius: 5,
        alignItems: 'center',
        borderRadius: 48
    },
});

export default ModalCategory;
