import React, { useState } from 'react';
import { View, TextInput, StyleSheet, FlatList } from 'react-native';
import MyTheme from '../../config/theme';
import SearchIcon from '../../../assets/icons/Search.svg';
import { BigSearchCard } from '../../components/shares/Card'; // Ensure this is correctly imported

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
  const [searchQuery, setSearchQuery] = useState('');

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
        data={vendors.filter(vendor => vendor.name.toLowerCase().includes(searchQuery.toLowerCase()))}
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
});

export default SavedVendorPage;
