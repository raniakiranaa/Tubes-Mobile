import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import MyTheme from '../../config/theme';
import { db } from '../../firebase';
import { getDoc, doc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../contexts/UserContext.js';

const OrderDetail = ({ route }) => {
  const { user } = useContext(UserContext);
  const { id } = route.params;
  const orderID = `${id}`
  const [orderDetailData, setOrderDetailData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getOrderDetail = async () => {
    setLoading(true);
    try {
      const orderRef = doc(db, 'customer', user.id, 'order', orderID);
      const orderSnap = await getDoc(orderRef);

      if (orderSnap.exists()) {
        const orderData = orderSnap.data();
        const vendorRef = doc(db, 'vendor', `${orderData.vendor_ID}`);
        const vendorSnap = await getDoc(vendorRef);
        if (vendorSnap.exists()) {
          const vendorData = vendorSnap.data();
          const catalogRef = doc(db, 'vendor', `${orderData.vendor_ID}`, 'catalog', `${orderData.catalog_ID}`);
          const catalogSnap = await getDoc(catalogRef);
          if (catalogSnap.exists()) {
            const catalogData = catalogSnap.data();
            setOrderDetailData({
              id: orderSnap.id,
              ...orderData,
              vendor_name: vendorData.name,
              vendor_image: vendorData.image,
              vendor_location: vendorData.location,
              catalog_name: catalogData.name,
              catalog_image: catalogData.catalog_img,
              catalog_pax: catalogData.pax,
              catalog_price: catalogData.price
            });
          } else {
            console.error('No catalog found with ID: ', orderData.catalog_ID);
            setOrderDetailData({
              id: orderSnap.id,
              ...orderData,
              vendor_name: vendorData.name,
              vendor_image: vendorData.image,
              vendor_location: vendorData.location,
              catalog_name: null,
              catalog_image: null,
              catalog_pax: null,
              catalog_price: null
            });
          }
        } else {
          console.error('No vendor found with ID: ', orderData.vendor_ID);
          setOrderDetailData({
            id: orderSnap.id,
            ...orderData,
            vendor_name: null,
            vendor_image: null,
            vendor_location: null,
            catalog_name: null,
            catalog_image: null,
            catalog_pax: null,
            catalog_price: null
          });
        }
      } else {
        console.log('No matching documents.');
        setLoading(false);
        return;
      }
    } catch (error) {
      console.error('Error getting documents: ', error);
    }
    setLoading(false);
  }

  useEffect(() => {
    getOrderDetail();
  }, [id]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value);
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  if (loading) {
    return (
      <View style={styles.loadingOverlay}>
        <ActivityIndicator size="large" color={MyTheme.colors.brown_2} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.vendorImage} />
        <View>
          <Text style={[styles.sectionHeader]}>{user.name}</Text>
          <Text style={[MyTheme.typography.body.body_3, {color: MyTheme.colors.neutral_1}]}>Lorem ipsum</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Image source={{ uri: orderDetailData.vendor_image }} style={styles.vendorImage} />
        <View>
          <Text style={[styles.sectionHeader]}>{orderDetailData.vendor_name}</Text>
          <Text style={[MyTheme.typography.body.body_3, {color: MyTheme.colors.neutral_1}]}>{orderDetailData.vendor_location}</Text>
        </View>
      </View>

      <View style={styles.packageContainer}>
        <Image source={{ uri: orderDetailData.catalog_image }} style={styles.packageImage} />
        <View style={styles.packageDetails}>
          <Text style={MyTheme.typography.subtitle.sub_3}>{orderDetailData.catalog_name}</Text>
          <Text style={[MyTheme.typography.body.body_2, {color:MyTheme.colors.neutral_2p}]}>by <Text style={{color:MyTheme.colors.pink_2}}>{orderDetailData.vendor_name}</Text></Text>
          <View style={styles.vendorPriceDetail}>
            <Text style={[MyTheme.typography.subtitle.sub_3, {color:MyTheme.colors.brown_3}]}>{formatCurrency(orderDetailData.catalog_price)}</Text>
            <Text style={MyTheme.typography.body.body_2}> • {orderDetailData.catalog_pax} pax</Text>
          </View>
          <Text style={[MyTheme.typography.body.body_2, {color:MyTheme.colors.neutral_2p}]}>Date: {formatDate(orderDetailData.date_order)}</Text>
        </View>
      </View>

      <View style={styles.statusContainer}>
        <Text style={styles.statusLabel}>Status :</Text>
          <View style={styles.statusValue}>
              {orderDetailData.status === 'Payment Confirmation' && <Text style={[styles.statusYellow, MyTheme.typography.body.body_2, { color: '#D1B75D' }]}>{orderDetailData.status}</Text>}
              {orderDetailData.status === 'Booked' && <Text style={[styles.statusGreen, MyTheme.typography.body.body_2, { color: '#77A670' }]}>{orderDetailData.status}</Text>}
              {orderDetailData.status === 'Delivered' && <Text style={[styles.statusGreen, MyTheme.typography.body.body_2, { color: '#77A670' }]}>{orderDetailData.status}</Text>}
              {orderDetailData.status === 'Waiting for Payment' && <Text style={[styles.statusOrange, MyTheme.typography.body.body_2, { color: '#E98D39' }]}>{orderDetailData.status}</Text>}
              {orderDetailData.status === 'Vendor Confirmation' && <Text style={[styles.statusRed, MyTheme.typography.body.body_2, { color: '#E2796B' }]}>{orderDetailData.status}</Text>}
          </View>
      </View>
      {orderDetailData.status === 'Payment Confirmation' && <Text style={[MyTheme.typography.body.body_2, {color:MyTheme.colors.neutral_1}]}>Waiting for payment confirmation for your order placed on {formatDate(orderDetailData.date_order)}.</Text>}
      {orderDetailData.status === 'Booked' && <Text style={[MyTheme.typography.body.body_2, {color:MyTheme.colors.neutral_1}]}>Your order placed on {formatDate(orderDetailData.date_order)} has been successfully booked.</Text>}
      {orderDetailData.status === 'Delivered' && <Text style={[MyTheme.typography.body.body_2, {color:MyTheme.colors.neutral_1}]}>Your order placed on {formatDate(orderDetailData.date_order)} has been successfully delivered.</Text>}
      {orderDetailData.status === 'Waiting for Payment' && <Text style={[MyTheme.typography.body.body_2, {color:MyTheme.colors.neutral_1}]}>Waiting for payment for your order placed on {formatDate(orderDetailData.date_order)}.</Text>}
      {orderDetailData.status === 'Vendor Confirmation' && <Text style={[MyTheme.typography.body.body_2, {color:MyTheme.colors.neutral_1}]}>Waiting for the vendor to confirm service availability on {formatDate(orderDetailData.date_order)}.</Text>}

      <View style={styles.actions}>
        <TouchableOpacity style={styles.chatButton} onPress={() => console.log('Chat Pressed')}>
          <Text style={[MyTheme.typography.subtitle.sub_3, {color:MyTheme.colors.brown_2}]}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={() => console.log('Cancel Pressed')}>
          <Text style={[MyTheme.typography.subtitle.sub_3, {color:MyTheme.colors.white}]}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  backButton: {
    marginBottom: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  sectionHeader: {
    fontFamily: 'poppinsMedium',
    fontSize: 14,
  },
  vendorImage: {
    width: 45,
    height: 45,
    borderRadius: 25,
    marginRight: 11,
  },
  packageContainer: {
    flexDirection: 'row',
    borderRadius: 10,
    marginBottom: 20,
    padding: 16,
    ...MyTheme.shadows.shadow_1
  },
  packageImage: {
    width: 55,
    height: 55,
    borderRadius: 10,
    marginRight: 15,
  },
  packageDetails: {
    flex: 1,
  },
  vendorPriceDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  statusLabel: {
    fontFamily: 'poppinsMedium',
    fontSize: 14,
    color: MyTheme.colors.brown_2,
  },
  statusValue: {
    marginLeft: 12,
  },
  statusRed: {
    backgroundColor: '#FFEAE7',
    borderColor: '#E2796B',
    borderWidth: 0.2,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 1,
    paddingHorizontal: 4,
  },
  statusOrange: {
    backgroundColor: '#FFEEDE',
    borderColor: '#E98D39',
    borderWidth: 0.2,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 1,
    paddingHorizontal: 4,
  },
  statusYellow: {
    backgroundColor: '#FDFFE2',
    borderColor: '#FFD955',
    borderWidth: 0.2,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 1,
    paddingHorizontal: 4,
  },
  statusGreen: {
    backgroundColor: '#EEFFEA',
    borderColor: '#77A670',
    borderWidth: 0.2,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 1,
    paddingHorizontal: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding:20,
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
  cancelButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: MyTheme.colors.danger,
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

export default OrderDetail;
