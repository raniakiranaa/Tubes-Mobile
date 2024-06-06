import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, ScrollView, ActivityIndicator } from 'react-native';
import MyTheme from '../../config/theme';
import CalendarIcon from '../../../assets/icons/Calendar.svg';
import { db } from '../../firebase';
import { collection, getDoc, getDocs, doc } from 'firebase/firestore';
import ModalDate from '../../components/private/guest/ModalDate.js';

const { width: screenWidth } = Dimensions.get('window');

const OrderConfirmationPage = ({ route }) => {
  const { id, vendor_name, vendor_id } = route.params;
  const CatalogID = `${id}`;

  const [catalogData, setCatalogData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [serviceDate, setServiceDate] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const getCatalogData = async () => {
    setLoading(true);
    try {
      const catalogRef = doc(db, 'vendor', vendor_id, 'catalog', CatalogID);
      const catalogSnap = await getDoc(catalogRef);

      if (catalogSnap.exists()) {
        setCatalogData({ id: catalogSnap.id, ...catalogSnap.data() });
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Error getting document:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getCatalogData();
  }, [id]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value);
  };

  const formatDate = (date) => {
    return date ? date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : 'No date set';
  };

  const handleModalPress = () => {
    setModalVisible(true);
  };

  const handleAddDate = (date) => {
    setServiceDate(date);
  };

  if (loading) {
    return (
      <View style={styles.loadingOverlay}>
        <ActivityIndicator size="large" color={MyTheme.colors.brown_2} />
      </View>
    );
  }

  return (
    <View style={styles.container} className='mt-12'>
      <ScrollView contentContainerStyle={styles.content}>
        <View className='flex-row items-center rounded-md p-4 mb-8' style={MyTheme.shadows.shadow_1} >
          <Image source={{ uri: catalogData.catalog_img }} className='h-14 w-14 rounded-md mr-4' />
          <View className='flex-1'>
            <Text style={MyTheme.typography.subtitle.sub_3}>{catalogData.name}</Text>
            <Text style={[MyTheme.typography.body.body_2, {color:MyTheme.colors.neutral_2p}]}>by <Text style={{color:MyTheme.colors.pink_2}}> {vendor_name}</Text></Text>
            <View className='flex-row items-center'>
              <Text style={[MyTheme.typography.subtitle.sub_3, {color:MyTheme.colors.brown_3}]}>{formatCurrency(catalogData.price)}</Text>
              <Text style={[MyTheme.typography.body.body_2, {color:MyTheme.colors.black}]}> •  {catalogData.pax} pax</Text>
            </View>
          </View>
        </View>
        <View className='mb-5'>
          <Text style={[MyTheme.typography.subtitle.sub_2, {color:MyTheme.colors.neutral_1}]}>Service Date</Text>
          <Text style={[MyTheme.typography.body.body_2, {color:MyTheme.colors.neutral_1}]}>This is the day when you’ll be needing the product or service from the vendor.</Text>
        </View>
        <TouchableOpacity onPress={handleModalPress}>
          <View className='h-20 w-72 flex-row items-center self-center rounded-md p-4 mb-5' style={MyTheme.shadows.shadow_1}>
            <CalendarIcon width={24} height={24} />
            <View className='flex-1 ml-4'>
              <Text style={[MyTheme.typography.body.body_2, {color:MyTheme.colors.neutral_1}]}>Date</Text>
              <Text style={[MyTheme.typography.medium.medium_2, {color:MyTheme.colors.neutral_1}]}>{formatDate(serviceDate)}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
      
      <View style={styles.actions}>
        <TouchableOpacity style={styles.chatButton} onPress={() => console.log('Chat Pressed')}>
          <Text style={[MyTheme.typography.subtitle.sub_3, {color:MyTheme.colors.brown_2}]}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.orderButton} onPress={() => console.log('Order Pressed')}>
          <Text style={[MyTheme.typography.subtitle.sub_3, {color:MyTheme.colors.white}]}>Order</Text>
        </TouchableOpacity>
      </View>
      <ModalDate
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        oldTarget={serviceDate ? serviceDate.toISOString() : null}
        onAddTarget={handleAddDate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
  },
  chatButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: MyTheme.colors.brown_2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  orderButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: MyTheme.colors.brown_2,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
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

export default OrderConfirmationPage;
