import React from 'react';
import { ScrollView, View, TextInput, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
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
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} className='mt-12'>
      <View className='flex-row items-center rounded-lg px-2.5 mb-6' style={{backgroundColor: "#F2F4F5"}}>
        <SearchIcon style={{marginRight: 10}} />
        <TextInput
          className='flex-1 h-10 w-full'
          style={MyTheme.typography.body.body_1}
          placeholder="Search"
          placeholderTextColor={MyTheme.colors.neutral_3}
        />
      </View>

      <FlatList
        data={vendors}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className='mb-2.5'>
            <BigSearchCard
              image={item.image}
              title={item.name}
              type={item.category}
              location={item.location}
              rating={item.rating}
            />
          </View>
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  contentContainer: {
    alignItems: 'center',
  },
  listContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 20,
  },
});

export default SavedVendorPage;
