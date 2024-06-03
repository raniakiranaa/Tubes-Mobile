import React, { useState, useEffect } from 'react';
import { FlatList, View, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MyTheme from '../../config/theme';
import { SmallCard } from '../../components/shares/Card';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';

const getVendorData = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'vendor'));
    
    if (querySnapshot.empty) {
      console.log('No matching documents.');
      return [];
    }

    const vendorData = [];

    querySnapshot.forEach(doc => {
      vendorData.push({ id: doc.id, ...doc.data() }); // Ensure each item has a unique id
    });

    return vendorData;

  } catch (error) {
    console.error('Error getting documents: ', error);
  }
};

const VendorCarousel = () => {
  const navigation = useNavigation();
  const [vendorData, setVendorData] = useState([]);

  useEffect(() => {
    const fetchVendorData = async () => {
      const data = await getVendorData();
      setVendorData(data);
    };

    fetchVendorData();
  }, []);

  return (
    <View>
      <Text style={[MyTheme.typography.subtitle.sub_3, styles.catTitle]}>
        Venue
      </Text>

      <FlatList
        data={vendorData.filter(item => item.category.includes('Venue'))}
        renderItem={({ item }) => <SmallCard image={{ uri: item.image }} title={item.name} rating={item.rating} />}
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
        renderItem={({ item }) => <SmallCard image={{ uri: item.image }} title={item.name} rating={item.rating} />}
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
  }
});

export default VendorCarousel;
