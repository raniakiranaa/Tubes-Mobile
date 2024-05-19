import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { OutlineButton, IconButton } from '../../components/shares/Buttons/index.js';
import MyTheme from '../../config/theme.js';
import { TextInputIcon } from '../../components/shares/TextInput/TextInputIcon.js';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={{ fontFamily: 'poppinsBold' }}>Welcome to My app!</Text>
      <OutlineButton
        title='hai'
        // buttonColor = { MyTheme.colors.pink_3 }
        textColor = { MyTheme.colors.black }
        // onPress={() => navigation.navigate('Profile')}
        size = "large-square"
      />
      <IconButton 
        iconSource= {require('../../../assets/icons/icon-chat.png')}
        title="hai"
        buttonColor = { MyTheme.colors.brown_2 }
        textColor = { MyTheme.colors.white }
        // type="right"
        size="primary"
      />
      <TextInputIcon 
        iconSource = {require('../../../assets/icons/icon-chat.png')}
        placeholder = "Tes"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  }
});

export default HomeScreen;
