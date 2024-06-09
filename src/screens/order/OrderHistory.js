import React, { useState, useContext } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import MyTheme from '../../config/theme';
import OrderItem from '../../components/shares/Item/OrderItem';
import { db } from '../../firebase';
import { collection, getDoc, getDocs, doc, query, where } from 'firebase/firestore';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { UserContext } from '../../contexts/UserContext.js';

const HistoryScreen = () => {
  const { user } = useContext(UserContext);
  const [historyOrdersData, setHistoryOrdersData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getHistoryOrders = async () => { 
    setLoading(true);  // Make sure to set loading to true at the beginning
    try {
      const orderRef = collection(db, 'customer', user.id, 'order');
      const q = query(orderRef, where('status', '==', 'Delivered'));
      const orderSnap = await getDocs(q);

      if (orderSnap.empty) {
        console.log('No matching documents.');
        setLoading(false);
        return;
      }

      const historyOrdersData = await Promise.all(orderSnap.docs.map(async (orderDoc) => {
        const orderData = orderDoc.data();
        const vendorRef = doc(db, 'vendor', `${orderData.vendor_ID}`);
        const vendorSnap = await getDoc(vendorRef);
        if (vendorSnap.exists()) {
          const vendorData = vendorSnap.data();
          const catalogRef = doc(db, 'vendor', `${orderData.vendor_ID}`, 'catalog', `${orderData.catalog_ID}`);
          const catalogSnap = await getDoc(catalogRef);
          if (catalogSnap.exists()) {
            const catalogData = catalogSnap.data();
            return {
              id: orderDoc.id,
              ...orderData,
              vendor_name: vendorData.name,
              vendor_image: vendorData.image,
              catalog_name: catalogData.name,
              catalog_pax: catalogData.pax,
              catalog_category: catalogData.category
            };
          } else {
            console.error('No catalog found with ID: ', orderData.catalog_ID);
            return {
              id: orderDoc.id,
              ...orderData,
              vendor_name: vendorData.name,
              vendor_image: vendorData.image,
              catalog_name: null,
              catalog_pax: null,
              catalog_category: null
            };
          }
        } else {
          console.error('No vendor found with ID: ', orderData.vendor_ID);
          return {
            id: orderDoc.id,
            ...orderData,
            vendor_name: null,
            vendor_image: null,
            catalog_name: null,
            catalog_pax: null,
            catalog_category: null
          };
        }
      }));
      setHistoryOrdersData(historyOrdersData);
    } catch (error) {
      console.error('Error getting documents: ', error);
    }
    setLoading(false);
  }  

  useFocusEffect(
    React.useCallback(() => {
      getHistoryOrders();
    }, [user.id])
  );

  const navigation = useNavigation();

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
      <FlatList
        data={historyOrdersData}
        renderItem={({ item }) => <OrderItem id={item.id} image={item.vendor_image} vendor_name={item.vendor_name} catalog_name={item.catalog_name} catalog_category={item.catalog_category} pax={item.catalog_pax} price={formatCurrency(item.total_price)} status={item.status} order_date={item.order_date}
        onPress={() => {
          if (item.status === 'Delivered') {
            navigation.navigate('RatingReview', { id: item.id });
          } else {
            navigation.navigate('OrderDetail', { id: item.id });
          }
        }} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
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

export default HistoryScreen;
