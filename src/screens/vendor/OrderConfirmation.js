import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import MyTheme from '../../config/theme';
// import ChatIcon from '../../../assets/icons/Chat.svg';
import CalendarIcon from '../../../assets/icons/Calendar.svg';

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
    date : 'February 14, 2024'
  }
]

const OrderConfirmationPage = () => {
  return (
    <View style={styles.container} className='mt-12'>
      <ScrollView>
        <View className='flex-row items-center rounded-md p-4 mb-8' style={MyTheme.shadows.shadow_1} >
          <Image source={{ uri: data[0].image }} className='h-14 w-14 rounded-md mr-4' />
          <View className='flex-1'>
            <Text style={MyTheme.typography.subtitle.sub_3}>{data[0].name}</Text>
            <Text style={[MyTheme.typography.body.body_2, {color:MyTheme.colors.neutral_2p}]}>by <Text style={{color:MyTheme.colors.pink_2}}> {data[0].vendor}</Text></Text>
            <View className='flex-row items-center'>
              <Text style={[MyTheme.typography.subtitle.sub_3, {color:MyTheme.colors.brown_3}]}>{data[0].price}</Text>
              <Text style={[MyTheme.typography.body.body_2, {color:MyTheme.colors.black}]}> •  {data[0].capacity}</Text>
            </View>
          </View>
        </View>
        <View className='mb-5'>
          <Text style={[MyTheme.typography.subtitle.sub_2, {color:MyTheme.colors.neutral_1}]}>Service Date</Text>
          <Text style={[MyTheme.typography.body.body_2, {color:MyTheme.colors.neutral_1}]}>This is the day when you’ll be needing the product or service from the vendor.</Text>
        </View>
        <View className='h-20 w-72 flex-row items-center self-center rounded-md p-4 mb-5' style={MyTheme.shadows.shadow_1}>
          <CalendarIcon width={24} height={24} />
          <View className='flex-1 ml-4'>
            <Text style={[MyTheme.typography.body.body_2, {color:MyTheme.colors.neutral_1}]}>Date</Text>
            <Text style={[MyTheme.typography.medium.medium_2, {color:MyTheme.colors.neutral_1}]}>{data[0].date}</Text>
          </View>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.chatButton} onPress={() => console.log('Chat Pressed')}>
            <Text style={[MyTheme.typography.subtitle.sub_3, {color:MyTheme.colors.brown_2}]}>Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.orderButton} onPress={() => console.log('Order Pressed')}>
            <Text style={[MyTheme.typography.subtitle.sub_3, {color:MyTheme.colors.white}]}>Order</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
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

export default OrderConfirmationPage;
