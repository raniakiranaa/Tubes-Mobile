import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MyTheme from '../../config/theme.js';
import { SCREEN_HEIGHT } from '../../utils/deviceDimensions.js';
import { Link } from 'expo-router';
import { TextInputIcon } from '../../components/shares/TextInput/TextInputIcon.js';
import { CustomButton } from '../../components/shares/Buttons/index.js';

const Login = () => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={[styles.titleText, MyTheme.typography.headings.h3]}>
          Login
        </Text>
        <Text style={[styles.descText, MyTheme.typography.subtitle.sub_3]}>
          Please sign in to continue
        </Text>
        <Text style={[styles.outerText, MyTheme.typography.body.body_1]}>
          Are you a Vendor?
          <Link href="#" style={styles.innerText}> Login as Vendor</Link>
        </Text>
      </View>
      <View>
        <View style={styles.inputTextContainer}>
          <TextInputIcon 
            iconSource={require('../../../assets/icons/Mail.png')}
            placeholder="Username"
            type="username"
            mode="text"
            fontSize={MyTheme.typography.body.body_1}
          />
        </View>
        <View style={styles.inputTextContainer}>
          <TextInputIcon 
            iconSource={require('../../../assets/icons/password.png')}
            placeholder="Password"
            type="password"
            mode="text"
            fontSize={MyTheme.typography.body.body_1}
          />
        </View>
        <Text style={[styles.passContainer, MyTheme.typography.body.body_2]}>
          Forgot the password?
        </Text>
      </View>
      <View style={styles.submitButtonContainer}>
        <CustomButton
          title = "Login"
          textColor = {MyTheme.colors.white}
          // onPress = {handlePress}
          size = "block-round"
          type = "fill"
          buttonColor = { MyTheme.colors.brown_2 }
        />
      </View>
      <View style={styles.regisContainer}>
        <Text style={[styles.outerText, MyTheme.typography.body.body_1]}>
          Don’t have an account yet?  
          <Link href="#" style={styles.innerText}>  Register</Link>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: SCREEN_HEIGHT / 3 ,
    paddingHorizontal: 20,
  },
  textContainer: {
    marginLeft: 4,
    paddingTop: 24,
  },
  titleText: {
    color: MyTheme.colors.brown_2,
  },
  descText: {
    color: MyTheme.colors.neutral_2p,
    paddingTop: 8
  },
  outerText: {
    color: MyTheme.colors.neutral_2p,
    paddingTop: 4,
    paddingBottom: 20
  },
  innerText: {
    fontFamily: 'poppinsMedium',
    fontSize: 14,
    color: MyTheme.colors.brown_2,
  },
  inputTextContainer : {
    alignItems: 'center',
    marginTop: 20,
    position: 'relative'
  },
  passContainer : {
    marginTop: 8,
    alignItems: 'flex-start',
    marginLeft: 10,
    color: MyTheme.colors.neutral_2p
  },
  submitButtonContainer : {
    paddingTop: 60
  },
  regisContainer : {
    paddingTop: 80,
    alignItems: 'center',
    justifyContent: 'center'
  }

});

export default Login;
