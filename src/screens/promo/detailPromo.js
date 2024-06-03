import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DetailPromo = ({ route }) => {
  const { id } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Details for Promo {id}</Text>
      {/* Add more details about the promo here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default DetailPromo;
