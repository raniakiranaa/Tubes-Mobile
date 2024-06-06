import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { HeaderHome } from '../../components/shares/Nav/HeaderHome.js';
import MyTheme from '../../config/theme.js';
import logo from '../../../assets/images/Logo.png';

const ComingSoon = () => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <View style={styles.contentContainer}>
          <Text style={[styles.text, MyTheme.typography.headings.h4]}>C</Text>
          <Image source={logo} style={styles.logo} />
          <Text style={[styles.text, MyTheme.typography.headings.h4]}>ming Soon</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: MyTheme.colors.black,

  },
  logo: {
    width: 25.5,  // Sesuaikan ukuran logo Anda
    height: 22, // Sesuaikan ukuran logo Anda
    marginHorizontal: 3,
  },
});

export default ComingSoon;
