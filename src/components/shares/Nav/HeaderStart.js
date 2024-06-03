import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import MyTheme from '../../../config/theme';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../utils/deviceDimensions';

export const HeaderStart = () => {
  const navbarHeight = SCREEN_HEIGHT / 3;
  return (
    <View style={{ flex: 1}}>
      <View style={[styles.container, { height: navbarHeight }]}>
        <Image
          style={styles.img}
          source={require('../../../../assets/images/Header-intro.png')}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0,
  },
  img: {
    padding: 0,
    margin: 0,
    height: '100%',
    objectFit: 'contain'
  },
});