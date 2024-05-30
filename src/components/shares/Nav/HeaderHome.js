import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../utils/deviceDimensions'; 
import MyTheme from '../../../config/theme';

export const HeaderHome = () => {
  const navbarHeight = SCREEN_HEIGHT/3.5;

  return (
    <View style={[styles.container, {height: navbarHeight}]}>
      <Image
        style={styles.logo}
        source={require('../../../../assets/images/Header-home.png')}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0,
  }, logo: {
    height: '100%',
    padding: 0,
    margin:0,
    objectFit: 'contain'
  }
});
