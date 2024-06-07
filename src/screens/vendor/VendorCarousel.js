import React, { useState, useEffect } from 'react';
import { FlatList, View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MyTheme from '../../config/theme';
import { SmallCard } from '../../components/shares/Card';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { set } from 'firebase/database';

const VendorCarousel = () => {
  const navigation = useNavigation();
  const [vendorData, setVendorData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getVendorData = async () => {
    setLoading(true);
    try {
      const vendorRef = collection(db, 'vendor');
      const vendorSnap = await getDocs(vendorRef);

      if (vendorSnap.empty) {
        console.log('No matching documents.');
        setLoading(false);
        return;
      }

      const vendorData = await Promise.all(vendorSnap.docs.map(async (vendorDoc) => {
        const vendorData = vendorDoc.data();
        const reviewRef = collection(db, 'vendor', `${vendorDoc.id}`, 'review');
        const reviewSnap = await getDocs(reviewRef);
        const reviewData = reviewSnap.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        const totalRating = reviewData.reduce((acc, review) => acc + parseFloat(review.rating), 0);
        const averageRating = totalRating / reviewData.length;
        return {
          vendor_id: vendorDoc.id,
          ...vendorData,
          average_rating: averageRating,
        };
      }
      ));
      setVendorData(vendorData);
    } catch (error) {
      console.error('Error getting documents: ', error);
    }
    setLoading(false);
  };
  
  const handlePress = (id) => {
    navigation.navigate('VendorDetail', { id });
  };

  useEffect(() => {
    getVendorData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingOverlay}>
        <ActivityIndicator size="large" color={MyTheme.colors.brown_2} />
      </View>
    );
  }

  return (
    <View>
      <Text style={[MyTheme.typography.subtitle.sub_3, styles.catTitle]}>
        Venue
      </Text>

      <FlatList
        data={vendorData.filter(item => item.category.includes('Venue'))}
        renderItem={({ item }) => <SmallCard image={{ uri: item.image }} title={item.name} rating={item.average_rating} onPress={() => handlePress(item.vendor_id)} />}
        keyExtractor={item => item.id} // Ensure the id is unique
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.cardsContainer}
        contentContainerStyle={{ paddingLeft: 20, paddingRight: 8 }}
      />

      <Text style={[MyTheme.typography.subtitle.sub_3, styles.catTitle]}>
        Catering
      </Text>

      <FlatList
        data={vendorData.filter(item => item.category.includes('Catering'))}
        renderItem={({ item }) => <SmallCard image={{ uri: item.image }} title={item.name} rating={item.average_rating} onPress={() => handlePress(item.vendor_id)} />}
        keyExtractor={item => item.id} // Ensure the id is unique
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.cardsContainer}
        contentContainerStyle={{ paddingLeft: 20, paddingRight: 8 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cardsContainer: {
    paddingBottom: 20,
  },
  catTitle: {
    color: MyTheme.colors.brown_2,
    marginVertical: 5,
    paddingHorizontal: 20,
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

export default VendorCarousel;
