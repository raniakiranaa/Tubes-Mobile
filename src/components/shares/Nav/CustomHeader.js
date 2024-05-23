import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../utils/deviceDimensions'; 
import MyTheme from '../../../config/theme';

export const CustomHeader = () => {
  const navbarHeight = SCREEN_HEIGHT/6;

  return (
    <View style={[styles.container, {height: navbarHeight}]}>
      <Image
        style={styles.logo}
        source={require('../../../../assets/images/Header.png')}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // right: 0, 
    // flex: 1,
    // flexDirection: 'row',
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
    // height: '100%', 
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
