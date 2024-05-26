import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import MyTheme from '../../config/theme';
// import ChatIcon from '../../../assets/icons/Chat.svg';
import CalendarIcon from '../../../assets/icons/Calendar.svg';

const { width: screenWidth } = Dimensions.get('window');

const OrderConfirmationPage = () => {
  return (
    <View style={styles.container}>
      <View className='flex-row items-center rounded-md p-4 mb-8' style={MyTheme.shadows.shadow_1} >
        <Image source={{ uri: 'https://via.placeholder.com/100' }} className='h-14 w-14 rounded-md mr-4' />
        <View className='flex-1'>
          <Text style={MyTheme.typography.subtitle.sub_3}>Royal Ballroom Package</Text>
          <Text style={[MyTheme.typography.body.body_2, {color:MyTheme.colors.neutral_2p}]}>by <Text style={{color:MyTheme.colors.pink_2}}>JW Marriott Hotel Surabaya</Text></Text>
          <View className='flex-row items-center'>
            <Text style={[MyTheme.typography.subtitle.sub_3, {color:MyTheme.colors.brown_3}]}>IDR 300,000,000</Text>
            <Text style={[MyTheme.typography.body.body_2, {color:MyTheme.colors.black}]}> • 330 pax</Text>
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
          <Text style={[MyTheme.typography.medium.medium_2, {color:MyTheme.colors.neutral_1}]}>February 14, 2024</Text>
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
    paddingHorizontal: 20,
    paddingVertical: 10,
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
