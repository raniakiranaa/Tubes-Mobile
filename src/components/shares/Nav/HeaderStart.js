import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { SCREEN_HEIGHT } from '../../../utils/deviceDimensions'; 

export const HeaderStart = () => {
  const navbarHeight = SCREEN_HEIGHT/3;
  return (
    <View style={[styles.container, {height: navbarHeight}]}>
      <Image
        style={styles.img}
        source={require('../../../../assets/icons/Header-intro.png')}
        resizeMode="contain"
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%', 
  },
  img : {
    width: '100%'
  }
});