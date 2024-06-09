import React, { useState, useEffect, useContext } from 'react';
import { View, TextInput, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import MyTheme from '../../config/theme';
import SearchIcon from '../../../assets/icons/Search.svg';
import { BigSearchCard } from '../../components/shares/Card'; // Ensure this is correctly imported
import { db } from '../../firebase';
import { collection, getDoc, getDocs, doc, query, where } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../contexts/UserContext.js';
import { set } from 'firebase/database';

const vendors = [
  {
    id: '1',
    name: 'JW Marriott Surabaya',
    category: 'Venue',
    location: 'Surabaya, Jawa Timur',
    rating: 4.8,
    image: 'https://via.placeholder.com/300',
  },
  {
    id: '2',
    name: 'Sonokembang',
    category: 'Catering',
    location: 'Surabaya, Jawa Timur',
    rating: 5.0,
    image: 'https://via.placeholder.com/300',
  },
];

const SavedVendorPage = () => {
  const { user } = useContext(UserContext);
  const [savedVendorData, setSavedVendorData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const getSavedVendorData = async () => {
    setLoading(true);
    try {
      const savedVendorRef = collection(db, 'customer', user.id, 'saved_vendor');
      const savedVendorSnap = await getDocs(savedVendorRef);

      if (savedVendorSnap.empty) {
        console.log('No matching documents.');
        setLoading(false);
        return;
      }

      const savedVendorData = await Promise.all(savedVendorSnap.docs.map(async (savedVendorDoc) => {
        const savedVendorData = savedVendorDoc.data();
        const vendorRef = doc(db, 'vendor', `${savedVendorData.vendor_id}`);
        const vendorSnap = await getDoc(vendorRef);
        if (vendorSnap.exists()) {
          const vendorData = vendorSnap.data();
          const reviewRef = collection(db, 'vendor', `${savedVendorData.vendor_id}`, 'review');
          const reviewSnap = await getDocs(reviewRef);
          const reviewData = reviewSnap.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          const totalRating = reviewData.reduce((acc, review) => acc + parseFloat(review.rating), 0);
          const averageRating = totalRating / reviewData.length;
          return {
            id: savedVendorDoc.id,
            ...vendorData,
            average_rating: averageRating,
          };
        } else {
          console.error('No vendor found with ID: ', savedVendorData.vendor_id);
          return {
            id: savedVendorDoc.id,
            ...savedVendorData,
          };
        }
      }
      ));
      setSavedVendorData(savedVendorData);
    } catch (error) {
      console.error('Error getting documents: ', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getSavedVendorData();
  }, []);

  const [searchQuery, setSearchQuery] = useState('');

  const renderVendorItem = ({ item }) => (
    <View style={styles.vendorItem}>
      <BigSearchCard
        image={item.image}
        title={item.name}
        type={item.category[0]}
        location={item.location}
        rating={item.average_rating}
        onPress={() => navigation.navigate('VendorDetail', { id: item.vendor_id })}
      />
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingOverlay}>
        <ActivityIndicator size="large" color={MyTheme.colors.brown_2} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <SearchIcon style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor={MyTheme.colors.neutral_3}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={savedVendorData.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))}
        renderItem={renderVendorItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
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
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F4F5',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 68,
    marginBottom: 24,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    width: '100%',
    ...MyTheme.typography.body.body_1,
  },
  listContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 20,
  },
  vendorItem: {
    marginBottom: 10,
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

export default SavedVendorPage;
