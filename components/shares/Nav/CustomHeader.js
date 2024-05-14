import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export const CustomHeader = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('./../../../assets/icons/Header.png')}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0, 
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: 100, 
  }, logo: {
    width: '100%',
  }
});
