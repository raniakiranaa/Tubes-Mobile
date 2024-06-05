import React, {useEffect, useState} from 'react';
import { View, Image, StyleSheet } from 'react-native';
import MyTheme from '../../../config/theme';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../utils/deviceDimensions';
import { storage } from '../../../firebase';
import { getDownloadURL, ref } from 'firebase/storage';

export const HeaderStart = () => {
  const navbarHeight = SCREEN_HEIGHT / 3;
  // const [imageUrl, setImageUrl] = useState(null);

  // useEffect(() => {
  //   const fetchImageUrl = async () => {
  //     try {
  //       const headerRef = ref(storage, 'Header/Header-intro.png');
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
    <View style={{ flex: 1}}>
      <View style={[styles.container, { height: navbarHeight }]}>
        {/* { imageUrl && ( */}
          <Image
            style={styles.img}
            // source={{uri: imageUrl}}
            source={require('../../../../assets/images/Header-intro.png')}
            resizeMode="contain"
          />
        {/* )} */}
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