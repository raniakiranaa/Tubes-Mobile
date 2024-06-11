import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, Image, TouchableOpacity, StyleSheet, Dimensions, Platform } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import MyTheme from '../../config/theme';
import SearchIcon from '../../../assets/icons/Search.svg';
import VendorCarousel from './VendorCarousel';
import { useNavigation } from '@react-navigation/native';

const { width: screenWidth } = Dimensions.get('window');

const VendorPage = () => {
  const [searchText, setSearchText] = useState('');  // State for search text
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const navigation = useNavigation();

  const searchVendor = () => {    
    navigation.navigate('VendorSearch', { name: searchText, location: selectedLocation, category: selectedCategory, budget: selectedBudget });
  };

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

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} >
      <View className='p-5'>
        <View style={styles.inputWrapper}>
          <SearchIcon style={styles.icon} />
          <TextInput
            className='flex-1 h-10 w-full'
            style={MyTheme.typography.body.body_1}
            placeholder="Search"
            placeholderTextColor={MyTheme.colors.neutral_3}
            value={searchText}  // Bind the TextInput value to searchText state
            onChangeText={text => setSearchText(text)}  // Update the searchText state on change
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

        <TouchableOpacity style={styles.searchButton} onPress={searchVendor}>
          <Text style={[MyTheme.typography.subtitle.sub_2, { color: MyTheme.colors.white }]}>Search Vendor</Text>
        </TouchableOpacity>
      </View>

      <Text style={[MyTheme.typography.subtitle.sub_2, { color: MyTheme.colors.neutral_1 }]} className='mt-2 px-5'>
        Categories
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer} contentContainerStyle={{ paddingRight: 40 }}>
        <View className='flex-column items-center'>
          <Image source={require('../../../assets/icons/Venue.png')} style={{ width: 63, height: 63, marginRight: 10 }} />
          <Text style={[MyTheme.typography.body.body_2, { color: MyTheme.colors.neutral_1 }]} className='mr-2.5'>Venue</Text>
        </View>
        <View className='flex-column items-center'>
          <Image source={require('../../../assets/icons/Attire.png')} style={{ width: 63, height: 63, marginLeft: 10, marginRight: 10 }} />
          <Text style={[MyTheme.typography.body.body_2, { color: MyTheme.colors.neutral_1 }]} className='ml-2.5 mr-2.5'>Attire</Text>
        </View>
        <View className='flex-column items-center'>
          <Image source={require('../../../assets/icons/Catering.png')} style={{ width: 63, height: 63, marginLeft: 10, marginRight: 10 }} />
          <Text style={[MyTheme.typography.body.body_2, { color: MyTheme.colors.neutral_1 }]} className='ml-2.5 mr-2.5'>Catering</Text>
        </View>
        <View className='flex-column items-center'>
          <Image source={require('../../../assets/icons/Makeup.png')} style={{ width: 63, height: 63, marginLeft: 10, marginRight: 10 }} />
          <Text style={[MyTheme.typography.body.body_2, { color: MyTheme.colors.neutral_1 }]} className='ml-2.5 mr-2.5'>Makeup</Text>
        </View>
        <View className='flex-column items-center'>
          <Image source={require('../../../assets/icons/MC.png')} style={{ width: 63, height: 63, marginLeft: 10, marginRight: 10 }} />
          <Text style={[MyTheme.typography.body.body_2, { color: MyTheme.colors.neutral_1 }]} className='ml-2.5 mr-2.5'>MC</Text>
        </View>
        <View className='flex-column items-center'>
          <Image source={require('../../../assets/icons/Invitation.png')} style={{ width: 63, height: 63, marginLeft: 10, marginRight: 10 }} />
          <Text style={[MyTheme.typography.body.body_2, { color: MyTheme.colors.neutral_1 }]} className='ml-2.5 mr-2.5'>Invitation</Text>
        </View>
        <View className='flex-column items-center'>
          <Image source={require('../../../assets/icons/Band.png')} style={{ width: 63, height: 63, marginLeft: 10, marginRight: 10 }} />
          <Text style={[MyTheme.typography.body.body_2, { color: MyTheme.colors.neutral_1 }]} className='ml-2.5 mr-2.5'>Band</Text>
        </View>
        <View className='flex-column items-center'>
          <Image source={require('../../../assets/icons/Honeymoon.png')} style={{ width: 63, height: 63, marginLeft: 10 }} />
          <Text style={[MyTheme.typography.body.body_2, { color: MyTheme.colors.neutral_1 }]} className='ml-2.5'>Honeymoon</Text>
        </View>
      </ScrollView>

      <View style={styles.topContainer}>
        <View style={styles.topTitleContainer}>
          <Text style={[styles.topTitle, MyTheme.typography.subtitle.sub_2]}>Top-rated by other Eveey</Text>
        </View>
        <View style={styles.catContainer}>
          <VendorCarousel />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingBottom: Platform.OS === 'ios' ? 100 : 68,
    marginTop: 60,
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
    flex: 1,
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
  cardsContainer: {
    paddingBottom: 20,
  },
  topContainer: {
    marginTop: 20,
    width: '100%',
  },
  topTitleContainer: {
    paddingHorizontal: 20,
  },
  topTitle: {
    color: MyTheme.colors.neutral_1,
  },
  catContainer: {

  }
});

export default VendorPage;
