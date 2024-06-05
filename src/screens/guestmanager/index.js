import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import MyTheme from '../../config/theme.js';
import { CustomButton } from '../../components/shares/Buttons/index.js';
import Pencil from '../../../assets/icons/Pencil/index.js'
import { Yes, No, None } from '../../../assets/icons/budget'
import { Guest } from '../../components/private/guest/index.js'
import ModalDate from '../../components/private/guest/ModalDate.js';
import ModalGuest from '../../components/private/guest/ModalGuest.js'
import { db } from '../../firebase';
import { collection, getDoc, getDocs, updateDoc, addDoc, deleteDoc, doc } from 'firebase/firestore';

const GuestManager = () => {
  // user
  const [customerID, setCustomerID] = useState('1');

  const [loading, setLoading] = useState(true);
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

  // get deadline
  const getDeadline = async () => {
    setLoading(true)
    try {
      const customerRef = doc(db, 'customer', customerID);
      const customerDoc = await getDoc(customerRef);
  
      if (customerDoc.exists()) {
        const customerData = customerDoc.data();
        const deadlineGuest = customerData.deadline_guest ? customerData.deadline_guest.toDate() : null;
        setDeadline(deadlineGuest)
        
        // fetch guest list
        const guestCollectionRef = collection(db, 'customer', customerID, 'guest');
        const guestSnapshot = await getDocs(guestCollectionRef);

        if (!guestSnapshot.empty) {
          const guests = guestSnapshot.docs.map(doc => ({ 
            id: doc.id, ...doc.data() 
          }));

          setGuestList(guests);
          setGuestCount(guests.length);
          setYes(guests.filter(guest => guest.status === 'Yes').length);
          setNo(guests.filter(guest => guest.status === 'No').length);
          setNone(guests.filter(guest => guest.status === 'None').length);

        } else {
          console.log("No guest found for customer ID:", customerID)
        }
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Error getting document:', error);
    }
    setLoading(false)
  }

  useEffect(() => {
    getDeadline();
  }, [customerID]);

  const handleAddDate = async (date) => {
    setDeadline(date);
    try {
      const customerRef = doc(db, 'customer', customerID);
      await updateDoc(customerRef, { deadline_guest: date });
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  const formatDate = (date) => {
    return date ? date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : 'No deadline set';
  }

  const handleButtonPress = () => {
    setModalGuestVisible(true);
  };

  const handleAddGuest = async (name, role) => {
    try {
      setModalGuestVisible(false);
      const newGuest = { name, role, status: 'None' };
      const guestCollectionRef = collection(db, 'customer', customerID, 'guest');
      const guestDocRef = await addDoc(guestCollectionRef, newGuest);
      const guestWithId = { id: guestDocRef.id, ...newGuest };

      setGuestList([...guestList, guestWithId]);
      setGuestCount(guestCount + 1);
      setNone(none + 1);
      updateTotalGuestCount(guestCount + 1);
    } catch (error) {
      console.error('Error adding guest:', error);
    }
  };

  const handleRemoveGuest = async (id, status) => {
    try {
      const guestRef = doc(db, 'customer', customerID, 'guest', id);
      await deleteDoc(guestRef);
      const updatedGuestList = guestList.filter(guest => guest.id !== id);

      setGuestList(updatedGuestList);
      setGuestCount(updatedGuestList.length);
      updateStatusCount(status, 'decrease');
      updateTotalGuestCount(updatedGuestList.length);
    } catch (error) {
      console.error('Error removing guest:', error);
    }
  };

  const updateTotalGuestCount = async (count) => {
    try {
      const customerRef = doc(db, 'customer', customerID);
      await updateDoc(customerRef, { total_guest: count });
    } catch (error) {
      console.error('Error updating total guest count:', error);
    }
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

  const handleChangeStatus = async (id, newStatus) => {
    try {
      const guestRef = doc(db, 'customer', customerID, 'guest', id);
      const guestDoc = await getDoc(guestRef);

      if (guestDoc.exists()) {
        const guestData = guestDoc.data();
        updateStatusCount(guestData.status, 'decrease');
        updateStatusCount(newStatus, 'increase');

        await updateDoc(guestRef, { status: newStatus });
        const updatedGuestList = guestList.map(guest => {
          if (guest.id === id) {
            return { ...guest, status: newStatus };
          }
          return guest;
        });
        setGuestList(updatedGuestList);
      }
    } catch (error) {
      console.error('Error updating guest status:', error);
    }
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
              id={guest.id}
              name={guest.name} 
              role={guest.role} 
              status={guest.status}
              onRemove={() => handleRemoveGuest(guest.id, guest.status)}
              onChangeStatus={(newStatus) => handleChangeStatus(guest.id, newStatus)}
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
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={MyTheme.colors.neutral_2p} />
        </View>
      )}
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
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },

});

export default GuestManager;
