import React from 'react';
import { View, Text, StyleSheet, Modal, TextInput, TouchableOpacity } from 'react-native';
import MyTheme from '../../../config/theme.js';
import { TextInputIcon } from '../../shares/TextInput/TextInputIcon.js';
import { Cross } from '../../../../assets/icons/budget/index.js';

const ModalEdit = ({ visible, onClose, onEditCategory, newCategoryTarget, setNewCategoryTarget, oldCategory }) => {
  const handleSave = () => {
    onEditCategory();
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
            <Text style={[MyTheme.typography.subtitle.sub_2]}>Edit Target Budget</Text>
          </View>
          <View style={{ paddingHorizontal: 5 }}>
            <TextInputIcon
              placeholder={oldCategory ? oldCategory.target_category.toString() : ""}
              mode="text"
              fontSize={MyTheme.typography.body.body_1}
              value={newCategoryTarget}
              onChangeText={setNewCategoryTarget}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={handleSave}>
                <Text style={[{ color: MyTheme.colors.white }, MyTheme.typography.subtitle.sub_3]}>Save</Text>
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
    borderRadius: 48
  },
});

export default ModalEdit;
