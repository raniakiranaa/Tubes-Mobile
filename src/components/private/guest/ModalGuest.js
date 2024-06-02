import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput } from 'react-native';
import MyTheme from '../../../config/theme.js';
import { Cross } from '../../../../assets/icons/budget/index.js';

const ModalGuest = ({ visible, onClose, onAddGuest, newGuest, setNewGuest }) => {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [selectedRole, setSelectedRole] = useState('Bride/Groom Side');
    const [roleSelected, setRoleSelected] = useState(false);

    useEffect(() => {
        if (!visible) {
            setDropdownVisible(false);
        }
    }, [visible]);

    const handleDropdownToggle = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const handleRoleSelect = (role) => {
        setSelectedRole(role);
        setRoleSelected(true);
        setDropdownVisible(false);
    };

    const handleAddGuest = () => {
        if (newGuest && selectedRole) {
            onAddGuest(newGuest, selectedRole);
            setNewGuest('');
            setSelectedRole('Bride/Groom Side');
            setRoleSelected(false);
        }
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
                        <Text style={[MyTheme.typography.subtitle.sub_2]}>Add Guest</Text>
                    </View>
                    <View style={{ paddingHorizontal: 5, zIndex: 1 }}>
                        <View style={{ marginBottom: 10, zIndex: 2 }}>
                            <TouchableOpacity style={styles.dropdown} onPress={handleDropdownToggle}>
                                <Text
                                    style={[
                                        MyTheme.typography.body.body_1,
                                        { color: roleSelected ? MyTheme.colors.black : MyTheme.colors.neutral_3 }
                                    ]}
                                >
                                    {selectedRole}
                                </Text>
                            </TouchableOpacity>
                            {dropdownVisible && (
                                <View style={styles.dropdownMenu}>
                                    <TouchableOpacity style={styles.dropdownItem} onPress={() => handleRoleSelect('Bride')}>
                                        <Text style={MyTheme.typography.body.body_1}>Bride</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.dropdownItem} onPress={() => handleRoleSelect('Groom')}>
                                        <Text style={MyTheme.typography.body.body_1}>Groom</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                        <TextInput
                            placeholder="Guest Name"
                            style={[styles.textInput, MyTheme.typography.body.body_1]}
                            value={newGuest}
                            onChangeText={setNewGuest}
                        />
                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={styles.modalButton} onPress={handleAddGuest}>
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
        borderRadius: 15,
        padding: 20,
        zIndex: 1,
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
    dropdown: {
        borderWidth: 1,
        borderColor: MyTheme.colors.neutral_3,
        borderRadius: 5,
        padding: 10,
        zIndex: 10,
    },
    dropdownMenu: {
        position: 'absolute',
        top: 40,
        left: 0,
        width: '100%',
        borderWidth: 1,
        borderColor: MyTheme.colors.neutral_3,
        borderRadius: 5,
        backgroundColor: 'white',
        zIndex: 20,
    },
    dropdownItem: {
        padding: 10,
        zIndex: 21,
    },
    textInput: {
        borderWidth: 1,
        borderColor: MyTheme.colors.neutral_3,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
});

export default ModalGuest;
