import React from 'react';
import { View, Text, StyleSheet, Touchable, TouchableOpacity } from 'react-native';
import { CustomButton } from '../../components/shares/Buttons/index.js';
import {Link, Redirect, router} from "expo-router";
import MyTheme from '../../config/theme.js';
import { TextInputIcon } from '../../components/shares/TextInput/TextInputIcon.js';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = ({ navigation }) => {
  const navi = useNavigation();
  const handlePress = () => {
    console.log("Button Pressed");
    navi.navigate("Login");
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontFamily: 'poppinsBold' }}>Welcome to My app!</Text>
      <CustomButton 
        title = "Login"
        textColor = {MyTheme.colors.brown_2}
        onPress = {handlePress}
        size = "large-square"
        type = "outline"
        buttonColor = { MyTheme.colors.white }
        outlineColor = {MyTheme.colors.brown_3}
        fontSize = {14}
      />
      <CustomButton 
        title = "SignUp"
        textColor = {MyTheme.colors.white}
        onPress = {handlePress}
        size = "block-round"
        type = "icon"
        iconSource= {require('../../../assets/icons/icon-chat.png')}
        buttonColor = { MyTheme.colors.brown_2 }
      />
      <TextInputIcon 
        iconSource= {require('../../../assets/icons/Profile.png')}
        placeholder = "Profile"
        type = "password"
        mode = "text"
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
