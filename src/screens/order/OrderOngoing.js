import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import OrderItem from '../../components/shares/Item/OrderItem';

const ongoingOrders = [
  {
    id: '1',
    image: 'https://via.placeholder.com/50',
    title: 'Sonokembang',
    package: 'Wedding A Package 300 pax',
    price: 'IDR 30,000,000',
    status: 'Payment Confirmation',
    statusColor: 'yellow',
    date: '1 Apr 2024',
    action: 'Chat',
  },
  {
    id: '2',
    image: 'https://via.placeholder.com/50',
    title: 'Sonokembang',
    package: 'Wedding B Package 300 pax',
    price: 'IDR 30,000,000',
    status: 'Booked',
    statusColor: 'green',
    date: '1 Apr 2024',
    action: 'Chat',
  },
  {
    id: '3',
    image: 'https://via.placeholder.com/50',
    title: 'Sonokembang',
    package: 'Wedding C Package 300 pax',
    price: 'IDR 30,000,000',
    status: 'Waiting for Payment',
    statusColor: 'orange',
    date: '1 Apr 2024',
    action: 'Pay',
  },
  {
    id: '4',
    image: 'https://via.placeholder.com/50',
    title: 'JW Marriott Surabaya',
    package: 'Royal Ballroom Package 330 pax',
    price: 'IDR 300,000,000',
    status: 'Vendor Confirmation',
    statusColor: 'red',
    date: '1 Apr 2024',
    action: 'Chat',
  },
];

const OngoingScreen = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={ongoingOrders}
        renderItem={({ item }) => <OrderItem order={item} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

export default OngoingScreen;
