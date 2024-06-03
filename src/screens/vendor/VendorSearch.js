import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, Image, TouchableOpacity, StyleSheet, Dimensions, Platform, FlatList } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import MyTheme from '../../config/theme';
import { BigSearchCard } from '../../components/shares/Card';
import SearchIcon from '../../../assets/icons/Search.svg';

const { width: screenWidth } = Dimensions.get('window');

const data = [
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
    {
        id: '3',
        name: 'Vasa Hotel Surabaya',
        category: 'Venue',
        location: 'Surabaya, Jawa Timur',
        rating: 4.5,
        image: 'https://via.placeholder.com/300',
    },
    {
        id: '4',
        name: 'Novotel Surabaya',
        category: 'Venue',
        location: 'Surabaya, Jawa Timur',
        rating: 4.3,
        image: 'https://via.placeholder.com/300',
    },
    {
        id: '5',
        name: 'The Alana Surabaya',
        category: 'Venue',
        location: 'Surabaya, Jawa Timur',
        rating: 4.2,
        image: 'https://via.placeholder.com/300',
    },
    {
        id: '6',
        name: 'Jatiroso',
        category: 'Catering',
        location: 'Surabaya, Jawa Timur',
        rating: 4.6,
        image: 'https://via.placeholder.com/300',
    },
    {
        id: '7',
        name: 'Katering Surya',
        category: 'Catering',
        location: 'Surabaya, Jawa Timur',
        rating: 4.5,
        image: 'https://via.placeholder.com/300',
    },
];


const VendorSearchPage = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBudget, setSelectedBudget] = useState(null);

  const renderVendorItem = ({ item }) => (
    <View style={styles.vendorItem}>
      <BigSearchCard
        image={item.image}
        title={item.name}
        type={item.category}
        location={item.location}
        rating={item.rating}
      />
    </View>
  );

  const locationData = [
    { label: 'Surabaya', value: 'surabaya' },
    { label: 'Jakarta', value: 'jakarta' },
  ];

  const categoryData = [
    { label: 'Venue', value: 'venue' },
    { label: 'Catering', value: 'catering' },
  ];

  const budgetData = [
    { label: 'Low', value: 'low' },
    { label: 'Medium', value: 'medium' },
    { label: 'High', value: 'high' },
  ];

  const [searchQuery, setSearchQuery] = useState('');

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
            value={searchQuery}
            onChangeText={setSearchQuery}
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

        <TouchableOpacity style={styles.searchButton} >
          <Text style={[MyTheme.typography.subtitle.sub_2, { color: MyTheme.colors.white }]}>Search Vendor</Text>
        </TouchableOpacity>
        
      </View>

      <FlatList
        data={data.filter(vendor => vendor.name.toLowerCase().includes(searchQuery.toLowerCase()))}
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
});

export default VendorSearchPage;
