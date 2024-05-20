import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import OrderItem from '../../components/shares/Item/OrderItem';

const historyOrders = [
  // Similar structure to ongoingOrders, fill with history orders data
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
