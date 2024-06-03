import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MyTheme from '../../config/theme.js';
import { SCREEN_HEIGHT } from '../../utils/deviceDimensions.js';
import { useNavigation } from '@react-navigation/native';
import { TextInputIcon } from '../../components/shares/TextInput/TextInputIcon.js';
import { CustomButton } from '../../components/shares/Buttons/index.js';
import PasswordIcon from '../../../assets/icons/Password/index.js';
import UnameIcon from '../../../assets/icons/Uname/index.js';
import { HeaderStart } from '../../components/shares/Nav/HeaderStart.js'; // Import HeaderStart

const Register = () => {
    const nav = useNavigation();
  
    const handleLogin = () => {
      nav.navigate("Login");
    }
  
    const handleVendor = () => {
      nav.navigate("#");
    }  

    return (
        <KeyboardAwareScrollView
          style={styles.container}
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={styles.scrollContainer}
          scrollEnabled={true}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
              <HeaderStart />  
              <View style={styles.contentContainer}>
                <View style={styles.textContainer}>
                  <Text style={[styles.titleText, MyTheme.typography.headings.h3]}>
                    Register
                  </Text>
                  <Text style={[styles.descText, MyTheme.typography.subtitle.sub_3]}>
                    Please register to login
                  </Text>
                  <Text style={[styles.outerText, MyTheme.typography.body.body_1]}>
                    Are you a Vendor?
                    <Text style={styles.innerText} onPress={handleVendor}>  Register as Vendor
                    </Text>
                  </Text>
                </View>
                <View>
                  <View style={styles.inputTextContainer}>
                    <TextInputIcon 
                      iconSource={UnameIcon}
                      placeholder="Name"
                      type="name"
                      mode="text"
                      fontSize={MyTheme.typography.body.body_1}
                      iconProps={{ width: 20, height: 20 }}
                    />
                  </View>
                  <View style={styles.inputTextContainer}>
                    <TextInputIcon 
                      iconSource={UnameIcon}
                      placeholder="Username"
                      type="username"
                      mode="text"
                      fontSize={MyTheme.typography.body.body_1}
                      iconProps={{ width: 20, height: 20 }}
                    />
                  </View>
                  <View style={styles.inputTextContainer}>
                    <TextInputIcon 
                      iconSource={PasswordIcon}
                      placeholder="Password"
                      type="password"
                      mode="text"
                      fontSize={MyTheme.typography.body.body_1}
                      iconProps={{ width: 20, height: 20 }}
                    />
                  </View>
                  <View style={styles.inputTextContainer}>
                    <TextInputIcon 
                      iconSource={PasswordIcon}
                      placeholder="Confirm Password"
                      type="password"
                      mode="text"
                      fontSize={MyTheme.typography.body.body_1}
                      iconProps={{ width: 20, height: 20 }}
                    />
                  </View>
                </View>
                <View style={styles.submitButtonContainer}>
                  <CustomButton
                    title="Register"
                    textColor={MyTheme.colors.white}
                    // onPress={handlePress}
                    size="block-round"
                    type="fill"
                    buttonColor={MyTheme.colors.brown_2}
                  />
                </View>
                <View style={styles.regisContainer}>
                  <Text style={[styles.outerText, MyTheme.typography.body.body_1]}>
                    Already have an account?
                    <Text style={styles.innerText} onPress={handleLogin}> Login
                    </Text>
                  </Text>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
      );
};

const styles = StyleSheet.create({
  contentContainer : {
    paddingHorizontal: 20,
  },
  textContainer: {
    marginHorizontal: 10,
    paddingTop: 24,
  },
  titleText: {
    color: MyTheme.colors.brown_2,
  },
  descText: {
    color: MyTheme.colors.neutral_2p,
    paddingTop: 8,
  },
  outerText: {
    color: MyTheme.colors.neutral_2p,
    paddingTop: 4,
    paddingBottom: 4,
  },
  innerText: {
    fontFamily: 'poppinsMedium',
    fontSize: 14,
    color: MyTheme.colors.brown_2,
  },
  inputTextContainer: {
    alignItems: 'center',
    marginTop: 20,
    position: 'relative',
    marginHorizontal: 10,
  },
  submitButtonContainer: {
    paddingTop: 40,
  },
  regisContainer: {
    paddingTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Register;
