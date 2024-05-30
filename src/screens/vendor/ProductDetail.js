import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import MyTheme from '../../config/theme';
import { useNavigation } from '@react-navigation/native';

const { width: screenWidth } = Dimensions.get('window');

const data = [
  {
    id: '1',
    image: 'https://via.placeholder.com/400',
    name: 'Royal Ballroom Package',
    price: 'IDR 300,000,000',
    capacity: '330 pax',
    vendor: 'JW Marriott Hotel Surabaya',
    location: 'JW Marriott Hotel Surabaya, Jalan Embong Malang, Kedungdoro, Surabaya City, East Java, Indonesia',
    facilities: [
      'Wedding event at the Royal Ballroom JW Marriott Hotel Surabaya',
      '1 Bridal Suite including breakfast for 2 (two) persons',
      '2 Deluxe Premium rooms including breakfast for 2 (two) persons',
      'Includes buffet menu or set menu per person',
      'Unique pillar-less high ceiling that can host up to 60 tables',
    ],
  }
]

const ProductDetailPage = () => {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate('OrderConfirmation');
  }
  return (
    <View style={styles.container} className='mt-12'>
      <ScrollView contentContainerStyle={styles.content}>
        <View className='flex-row items-center justify-start mb-5'>
          <Image source={{ uri: data[0].image }} className='h-14 w-14 rounded-full' />
          <View className='flex-col items-start justify-start ml-3'>
            <Text style={[MyTheme.typography.subtitle.sub_2, { color: MyTheme.colors.black }]}>{data[0].name}</Text>
            <Text style={[MyTheme.typography.body.body_2, { color: MyTheme.colors.neutral_2p }]}>by
              <Text style={[MyTheme.typography.body.body_2, { color: MyTheme.colors.pink_2 }]}> {data[0].vendor}</Text>
            </Text>
          </View>
        </View>
        <View className='items-center'>
          <Image source={{ uri: data[0].image }} className='h-32 w-80 rounded-md mb-3' />
          <View className='flex-row items-center justify-center mb-6'>
            <Text style={[MyTheme.typography.subtitle.sub_2, { color: MyTheme.colors.brown_3 }]}>{data[0].price}</Text>
            <Text style={[MyTheme.typography.body.body_2, { color: MyTheme.colors.black }]}>  •  {data[0].capacity}</Text>
          </View>
        </View>

        <Text style={[MyTheme.typography.subtitle.sub_2, { color: MyTheme.colors.neutral_1, marginBottom: 8 }]}>Description</Text>
        <View className='mb-5'>
          <Text style={[MyTheme.typography.medium.medium_2, { color: MyTheme.colors.brown_2 }]}>Location</Text>
          <Text style={[MyTheme.typography.body.body_2, { color: MyTheme.colors.neutral_1 }]}>
            {data[0].location}
          </Text>
        </View>

        <View className='mb-5'>
          <Text style={[MyTheme.typography.medium.medium_2, { color: MyTheme.colors.brown_2 }]}>Facilities</Text>
          <Text style={[MyTheme.typography.body.body_2, { color: MyTheme.colors.neutral_1 }]}>
            {data[0].facilities.map((facility, index) => (
              <Text key={index}>{`\u2022 ${facility}\n`}</Text>
            ))}
          </Text>
        </View>
      </ScrollView>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.chatButton} onPress={() => console.log('Chat Pressed')}>
          <Text style={[MyTheme.typography.subtitle.sub_3, {color:MyTheme.colors.brown_2}]}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.orderButton} onPress={handlePress}>
          <Text style={[MyTheme.typography.subtitle.sub_3, {color:MyTheme.colors.white}]}>Order</Text>
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
});

export default ProductDetailPage;
