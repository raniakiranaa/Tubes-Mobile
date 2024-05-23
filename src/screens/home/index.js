import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CustomButton } from '../../components/shares/Buttons/index.js';
import MyTheme from '../../config/theme.js';
import { TextInputIcon } from '../../components/shares/TextInput/TextInputIcon.js';
import { useNavigation } from '@react-navigation/native';
import UnameIcon from '../../../assets/icons/Uname/index.js';

const HomeScreen = ({ navigation }) => {
  const navi = useNavigation();
  const handlePress = () => {
    console.log("Button Pressed");
    navi.navigate("Login");
  };

  return (
    <KeyboardAwareScrollView
      style={styles.Acontainer}
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.scrollContainer}
      scrollEnabled={true}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={{ fontFamily: 'poppinsBold' }}>Welcome to My app!</Text>
          <CustomButton 
            title="Login"
            textColor={MyTheme.colors.brown_2}
            onPress={handlePress}
            size="large-square"
            type="outline"
            buttonColor={MyTheme.colors.white}
            outlineColor={MyTheme.colors.brown_3}
            fontSize={14}
          />
          <CustomButton 
            title="SignUp"
            textColor={MyTheme.colors.white}
            onPress={handlePress}
            size="block-round"
            type="icon"
            iconSource={UnameIcon}
            buttonColor={MyTheme.colors.brown_2}
            iconProps={{ width: 24, height: 24, fillColor: MyTheme.colors.white, strokeColor: MyTheme.colors.white }}
          />
          <TextInputIcon 
            iconSource={UnameIcon}
            placeholder="Profile"
            type="password"
            mode="text"
            iconProps={{ width: 20, height: 20 }}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    marginTop: 400
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  }
});

export default HomeScreen;
