import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import OrderItem from '../../components/shares/Item/OrderItem';

const historyOrders = [
  {
    id: '5',
    image: 'https://via.placeholder.com/50',
    title: 'Axioo Photography',
    package: 'Wedding Photography Package 300 pax',
    price: 'IDR 3,000,000',
    status: 'Delivered',
    statusColor: 'yellow',
    date: '31 Mar 2024',
    action: 'Chat',
  },
];

const HistoryScreen = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={historyOrders}
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

export default HistoryScreen;
