import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import MyTheme from '../../config/theme';
// import ChatIcon from '../../../assets/icons/Chat.svg';
// import OrderIcon from '../../../assets/icons/Order.svg';

const { width: screenWidth } = Dimensions.get('window');

const ProductDetailPage = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View className='flex-row items-center justify-start mb-5'>
          <Image source={{ uri: 'https://via.placeholder.com/100' }} className='h-14 w-14 rounded-full' />
          <View className='flex-col items-start justify-start ml-3'>
            <Text style={[MyTheme.typography.subtitle.sub_2, { color: MyTheme.colors.black }]}>Royal Ballroom Package</Text>
            <Text style={[MyTheme.typography.body.body_2, { color: MyTheme.colors.neutral_2p }]}>by 
              <Text style={[MyTheme.typography.body.body_2, { color: MyTheme.colors.pink_2 }]}> JW Marriott Hotel Surabaya</Text>
            </Text>
          </View>
        </View>
        <View className='items-center'>
          <Image source={{ uri: 'https://via.placeholder.com/400' }} className='h-32 w-80 rounded-md mb-3' />
          <View className='flex-row items-center justify-center mb-6'>
            <Text style={[MyTheme.typography.subtitle.sub_2, { color: MyTheme.colors.brown_3 }]}>IDR 300,000,000</Text>
            <Text style={[MyTheme.typography.body.body_2, { color: MyTheme.colors.black }]}>  •  330 pax </Text>
          </View>
        </View>

        <Text style={[MyTheme.typography.subtitle.sub_2, { color: MyTheme.colors.neutral_1, marginBottom: 8 }]}>Description</Text>
        <View className='mb-5'>
          <Text style={[MyTheme.typography.medium.medium_2, { color: MyTheme.colors.brown_2 }]}>Location</Text>
          <Text style={[MyTheme.typography.body.body_2, { color: MyTheme.colors.neutral_1 }]}>
            JW Marriott Hotel Surabaya, Jalan Embong Malang, Kedungdoro, Surabaya City, East Java, Indonesia
            Royal Ballroom, 2nd Floor
          </Text>
        </View>

        <View className='mb-5'>
          <Text style={[MyTheme.typography.medium.medium_2, { color: MyTheme.colors.brown_2 }]}>Facilities</Text>
          <Text style={[MyTheme.typography.body.body_2, { color: MyTheme.colors.neutral_1 }]}>
            • Wedding event at the Royal Ballroom JW Marriott Hotel Surabaya{"\n"}
            • 1 Bridal Suite including breakfast for 2 (two) persons{"\n"}
            • 2 Deluxe Premium rooms including breakfast for 2 (two) persons{"\n"}
            • Includes buffet menu or set menu per person{"\n"}
            • Unique pillar-less high ceiling that can host up to 60 tables
          </Text>
        </View>
      </ScrollView>

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
  },
  content: {
    paddingVertical: 20,
    paddingHorizontal: 16,
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

export default ProductDetailPage;
