import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../utils/deviceDimensions'; 
import MyTheme from '../../../config/theme';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../firebase';

export const CustomHeader = () => {
  const navbarHeight = SCREEN_HEIGHT/6;
  // const [imageUrl, setImageUrl] = useState(null);

  // useEffect(() => {
  //   const fetchImageUrl = async () => {
  //     try {
  //       const headerRef = ref(storage, 'Header/Header.png');
  //       const url = await getDownloadURL(headerRef);
  //       setImageUrl(url);
  //       console.log("berhasil");
  //     } catch (error) {
  //       console.log('Error fetching image url:', error);
  //     }
  //   };

  //   fetchImageUrl();
  // }, []);

  return (
    <View style={[styles.container, {height: navbarHeight}]}>
      {/* {imageUrl && ( */}
        <Image
          style={styles.logo}
          // source={{uri: imageUrl}}
          source={require('../../../../assets/images/Header.png')}
          resizeMode="contain"
        />
      {/* )} */}
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
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%', 
    // width: SCREEN_WIDTH,
    // alignItems: 'center',
    // justifyContent: 'center',
    zIndex: 0,
  }, logo: {
    height: '100%',
    padding: 0,
    margin:0,
    objectFit: 'contain'
  }
});
