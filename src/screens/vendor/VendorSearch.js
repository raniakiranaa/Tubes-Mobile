import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, FlatList, ActivityIndicator } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import MyTheme from '../../config/theme';
import { BigSearchCard } from '../../components/shares/Card';
import SearchIcon from '../../../assets/icons/Search.svg';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigation, useRoute } from '@react-navigation/native';

const { width: screenWidth } = Dimensions.get('window');

const VendorSearchPage = () => {
  const route = useRoute();
  const { name, category, location, budget } = route.params;

  let searchedName = name ? name.toLowerCase() : '';
  let searchedCategory = category ? category.toLowerCase() : '';
  let searchedLocation = location ? location.toLowerCase() : '';
  let searchedBudget = budget ? budget.toLowerCase() : '';

  const navigation = useNavigation();
  const [searchedVendorData, setSearchedVendorData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchText, setSearchText] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBudget, setSelectedBudget] = useState(null);

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
        const averageRating = reviewData.length > 0 ? totalRating / reviewData.length : 0;
        return {
          vendor_id: vendorDoc.id,
          ...vendorData,
          average_rating: averageRating,
        };
      }));

      const filteredData = vendorData.filter(vendor => {
        const vendorName = vendor.name ? vendor.name.toLowerCase() : '';
        const vendorCategories = vendor.category ? vendor.category.map(cat => cat.toLowerCase()) : [];
        const vendorLocation = vendor.location ? vendor.location.toLowerCase() : '';
        const vendorBudget = vendor.budget ? vendor.budget.toLowerCase() : '';

        return (
          (!searchedName || vendorName.includes(searchedName)) &&
          (!searchedCategory || vendorCategories.includes(searchedCategory)) &&
          (!searchedLocation || vendorLocation.includes(searchedLocation)) &&
          (!searchedBudget || vendorBudget.includes(searchedBudget))
        );
      });

      setSearchedVendorData(filteredData);
    } catch (error) {
      console.error('Error getting documents: ', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getVendorData();
  }, [searchedName, searchedCategory, searchedLocation, searchedBudget]);

  const handleSearch = () => {
    searchedName = searchText.toLowerCase();
    searchedCategory = selectedCategory ? selectedCategory.toLowerCase() : '';
    searchedLocation = selectedLocation ? selectedLocation.toLowerCase() : '';
    searchedBudget = selectedBudget ? selectedBudget.toLowerCase() : '';
    
    getVendorData();
  };

  const renderVendorItem = ({ item }) => (
    <View style={styles.vendorItem}>
      <BigSearchCard
        image={item.image}
        title={item.name}
        type={item.category[0]}
        location={item.location}
        rating={item.average_rating}
      />
    </View>
  );

  const locationData = [
    { label: 'Surabaya', value: 'surabaya' },
    { label: 'Jakarta', value: 'jakarta' },
    { label: 'Bandung', value: 'bandung' },
    { label: 'Bali', value: 'bali' },
    { label: 'Sidoarjo', value: 'sidoarjo' },
  ];

  const categoryData = [
    { label: 'Venue', value: 'venue' },
    { label: 'Catering', value: 'catering' },
    { label: 'Photography', value: 'photography' },
    { label: 'Entertainment', value: 'entertainment' },
    { label: 'Music', value: 'music' },
  ];

  const budgetData = [
    { label: 'Low', value: 'low' },
    { label: 'Medium', value: 'medium' },
    { label: 'High', value: 'high' },
  ];

  if (loading) {
    return (
      <View style={styles.loadingOverlay}>
        <ActivityIndicator size="large" color={MyTheme.colors.brown_2} />
      </View>
    );
  }

  return (
    <View style={styles.container} className='mt-12'>
      <View className='p-5'>
        <View style={styles.inputWrapper}>
          <SearchIcon style={styles.icon} />
          <TextInput
            className='flex-1 h-10 w-full'
            style={MyTheme.typography.body.body_1}
            placeholder="Search"
            placeholderTextColor={MyTheme.colors.neutral_3}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        <View style={styles.filterWrapper}>
          <Dropdown
            data={locationData}
            labelField="label"
            valueField="value"
            placeholder="Location"
            value={selectedLocation}
            onChange={item => setSelectedLocation(item.value)}
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            containerStyle={styles.dropdownContainer}
          />
        </View>

        <View style={styles.filtersRow}>
          <Dropdown
            data={categoryData}
            labelField="label"
            valueField="value"
            placeholder="Category"
            value={selectedCategory}
            onChange={item => setSelectedCategory(item.value)}
            style={styles.dropdownRow}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            containerStyle={styles.dropdownContainer}
            className='mr-1'
          />
          <Dropdown
            data={budgetData}
            labelField="label"
            valueField="value"
            placeholder="Budget"
            value={selectedBudget}
            onChange={item => setSelectedBudget(item.value)}
            style={styles.dropdownRow}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            containerStyle={styles.dropdownContainer}
            className='ml-1'
          />
        </View>

        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={[MyTheme.typography.subtitle.sub_2, { color: MyTheme.colors.white }]}>Search Vendor</Text>
        </TouchableOpacity>
        
      </View>

      <FlatList
        data={searchedVendorData.filter(vendor => vendor.name.toLowerCase().includes(searchText.toLowerCase()))}
        keyExtractor={(item) => item.id}
        renderItem={renderVendorItem}
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
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#F2F4F5",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  filterWrapper: {
    marginBottom: 12,
  },
  filtersRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dropdown: {
    backgroundColor: MyTheme.colors.white,
    borderColor: "#E3E5E5",
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 4,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  dropdownRow: {
    flex: 1,
    backgroundColor: MyTheme.colors.white,
    borderColor: "#E3E5E5",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 20,
  },
  placeholderStyle: {
    color: '#72777A',
    ...MyTheme.typography.body.body_1,
  },
  selectedTextStyle: {
    color: '#72777A',
    ...MyTheme.typography.body.body_1,
  },
  dropdownContainer: {
    backgroundColor: MyTheme.colors.white,
    borderColor: "#E3E5E5",
    borderRadius: 10,
  },
  searchButton: {
    paddingVertical: 8,
    borderRadius: 25,
    backgroundColor: MyTheme.colors.brown_2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
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

export default VendorSearchPage;
