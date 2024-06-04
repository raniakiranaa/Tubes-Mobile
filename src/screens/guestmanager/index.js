import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import MyTheme from '../../config/theme.js';
import { CustomButton } from '../../components/shares/Buttons/index.js';
import Pencil from '../../../assets/icons/Pencil/index.js'
import { Yes, No, None } from '../../../assets/icons/budget'
import { Guest } from '../../components/private/guest/index.js'
import ModalDate from '../../components/private/guest/ModalDate.js';
import ModalGuest from '../../components/private/guest/ModalGuest.js'

const GuestManager = () => {
  const [guestList, setGuestList] = useState([]);
  const [guestCount, setGuestCount] = useState(0);
  const [yes, setYes] = useState(0)
  const [no, setNo] = useState(0)
  const [none, setNone] = useState(0)

  const [deadline, setDeadline] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalGuestVisible, setModalGuestVisible] = useState(false);

  const [newGuest, setNewGuest] = useState('');

  const handleModalPress = () => {
    setModalVisible(true);
  };

  const handleAddDate = (date) => {
    setDeadline(date);
  };

  const formatDate = (date) => {
    return date ? date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : 'No deadline set';
  }

  const handleButtonPress = () => {
    setModalGuestVisible(true);
  };

  const handleAddGuest = (name, role) => {
    const newGuest = { name, role, status: 'None' };
    setGuestList([...guestList, newGuest]);
    setGuestCount(guestCount + 1);
    setNone(none + 1);
    setModalGuestVisible(false);
  };

  const handleRemoveGuest = (name, status) => {
    const updatedGuestList = guestList.filter(guest => guest.name !== name);
    setGuestList(updatedGuestList);
    setGuestCount(updatedGuestList.length);
    updateStatusCount(status, 'decrease');
  };

  const updateStatusCount = (status, operation) => {
    if (operation === 'increase') {
      if (status === 'Yes') setYes(yes + 1);
      if (status === 'No') setNo(no + 1);
      if (status === 'None') setNone(none + 1);
    } else if (operation === 'decrease') {
      if (status === 'Yes') setYes(yes - 1);
      if (status === 'No') setNo(no - 1);
      if (status === 'None') setNone(none - 1);
    }
  };

  const handleChangeStatus = (name, newStatus) => {
    const updatedGuestList = guestList.map(guest => {
      if (guest.name === name) {
        updateStatusCount(guest.status, 'decrease');
        updateStatusCount(newStatus, 'increase');
        return { ...guest, status: newStatus };
      }
      return guest;
    });
    setGuestList(updatedGuestList);
  };

  return (
    <View style={styles.container}>
      <View className="mt-12">
        <View style={{ alignItems: 'center' }}>
          <Text style={MyTheme.typography.subtitle.sub_2}>
            {guestCount}
            {guestCount > 1 ? ' Guests' : ' Guest'}
          </Text>
          <View style={{ flexDirection: 'row', marginTop: 8, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={[{ color: MyTheme.colors.neutral_2p, marginRight: 12 }, MyTheme.typography.body.body_1]}>Deadline :</Text>
            <View style={styles.outline}>
            <Text style={[{ color: deadline ? MyTheme.colors.brown_2 : MyTheme.colors.neutral_2p }, MyTheme.typography.body.body_1]}>
                {formatDate(deadline)}
              </Text>
            </View>
            <TouchableOpacity onPress={handleModalPress}>
              <Pencil width={20} height={20} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 18, alignItems: 'center', justifyContent: 'center' }}>
          <Yes width={20} height={20}/>
          <Text style={[{ color: MyTheme.colors.neutral_2p, marginRight: 120 }, MyTheme.typography.body.body_1]}> : {yes} </Text>
          <No width={20} height={20}/>
          <Text style={[{ color: MyTheme.colors.neutral_2p, marginRight: 120 }, MyTheme.typography.body.body_1]}> : {no} </Text>
          <None width={21} height={21}/>
          <Text style={[{ color: MyTheme.colors.neutral_2p }, MyTheme.typography.body.body_1]}> : {none} </Text>
        </View>
        <ScrollView style={styles.guest} contentContainerStyle={{ paddingBottom: 120 }}>
          {guestList.map((guest, index) => (
            <Guest 
              key={index} 
              name={guest.name} 
              role={guest.role} 
              status={guest.status}
              onRemove={() => handleRemoveGuest(guest.name, guest.status)}
              onChangeStatus={(newStatus) => handleChangeStatus(guest.name, newStatus)}
            />
          ))}
        </ScrollView>
      </View>
      <View style={styles.modalButton}>
        <CustomButton
          title="Add Guest"
          size="block-round"
          buttonColor={MyTheme.colors.brown_2}
          textColor={MyTheme.colors.white}
          onPress={handleButtonPress}
        />
      </View>
      <ModalDate
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        oldTarget={deadline ? deadline.toISOString() : null}
        onAddTarget={handleAddDate}
      />
      <ModalGuest
        visible={modalGuestVisible}
        onClose={() => setModalGuestVisible(false)}
        onAddGuest={handleAddGuest}
        newGuest={newGuest}
        setNewGuest={setNewGuest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    marginTop: 24,
  },
  modalButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: 'white',
  },
  outline: {
    borderWidth: 0.5,
    width: 170,
    height: 24,
    borderRadius: 180,
    borderColor: MyTheme.colors.brown_2,
    backgroundColor: 'rgba(255, 218, 194, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 4
  },
  guest: {
    marginTop: 42,
    marginHorizontal: 8,
    marginBottom: 42,
  }

});

export default GuestManager;
