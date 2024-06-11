import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import MyTheme from '../../config/theme';
import { useNavigation } from '@react-navigation/native';
import { db } from '../../firebase';
import { collection, getDoc, getDocs, doc } from 'firebase/firestore';

const { width: screenWidth } = Dimensions.get('window');

const ProductDetailPage = ({ route }) => {
  const { id, vendor_name, vendor_id, vendor_image } = route.params;
  const CatalogID = `${id}`;
  
  const [catalogData, setCatalogData] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const navigation = useNavigation();

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value);
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
        <View className='flex-row items-center justify-start mb-5'>
          <Image source={{ uri: vendor_image }} className='h-14 w-14 rounded-full' />
          <View className='flex-col items-start justify-start ml-3'>
            <Text style={[MyTheme.typography.subtitle.sub_2, { color: MyTheme.colors.black }]}>
              {catalogData.name}
            </Text>
            <Text style={[MyTheme.typography.body.body_2, { color: MyTheme.colors.neutral_2p }]}>
              by
              <Text style={[MyTheme.typography.body.body_2, { color: MyTheme.colors.pink_2 }]}>
                {' '}{vendor_name}
              </Text>
            </Text>
          </View>
        </View>
        <View className='items-center'>
          <Image source={{ uri: catalogData.catalog_img }} className='h-32 w-80 rounded-md mb-3' />
          <View className='flex-row items-center justify-center mb-6'>
            <Text style={[MyTheme.typography.subtitle.sub_2, { color: MyTheme.colors.brown_3 }]}>
              {formatCurrency(catalogData.price)}
            </Text>
            <Text style={[MyTheme.typography.body.body_2, { color: MyTheme.colors.black }]}>
              {' '}•{' '}{catalogData.pax} pax
            </Text>
          </View>
        </View>

        <Text style={[MyTheme.typography.subtitle.sub_2, { color: MyTheme.colors.neutral_1, marginBottom: 8 }]}>
          Description
        </Text>
        <View className='mb-5'>
          <Text style={[MyTheme.typography.medium.medium_2, { color: MyTheme.colors.brown_2 }]}>
            Location
          </Text>
          <Text style={[MyTheme.typography.body.body_2, { color: MyTheme.colors.neutral_1 }]}>
            {catalogData.location}
          </Text>
        </View>

        <View className='mb-5'>
          <Text style={[MyTheme.typography.medium.medium_2, { color: MyTheme.colors.brown_2 }]}>
            Facilities
          </Text>
          {catalogData.facilities.map((facility, index) => (
            <Text key={index} style={[MyTheme.typography.body.body_2, { color: MyTheme.colors.neutral_1 }]}>
              {`\u2022 ${facility}`}
            </Text>
          ))}
        </View>
      </ScrollView>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.chatButton} onPress={() => navigation.navigate('ComingSoon')}>
          <Text style={[MyTheme.typography.subtitle.sub_3, { color: MyTheme.colors.brown_2 }]}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.orderButton} onPress={() => navigation.navigate('OrderConfirmation', { id: catalogData.id, vendor_id, vendor_name })}>
          <Text style={[MyTheme.typography.subtitle.sub_3, { color: MyTheme.colors.white }]}>Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    paddingVertical: 20,
    paddingHorizontal: 16,
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

export default ProductDetailPage;
