import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MyTheme from '../../config/theme.js';
import { useNavigation } from '@react-navigation/native';
import { TextInputIcon } from '../../components/shares/TextInput/TextInputIcon.js';
import { CustomButton } from '../../components/shares/Buttons/index.js';
import PasswordIcon from '../../../assets/icons/Password/index.js';
import UnameIcon from '../../../assets/icons/Uname/index.js';
import { HeaderStart } from '../../components/shares/Nav/HeaderStart.js';
import Toast from 'react-native-toast-message';
import { firebase_auth } from '../../firebase/index.js';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { UserContext } from '../../contexts/UserContext.js';

const Login = () => {
  const nav = useNavigation();
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [error, setError] = useState(null); // State for error message

  const handleRegis = () => {
    nav.navigate("Register");
  }

  const handleVendor = () => {
    nav.navigate("#");
  }

  const validation = () => {
    let errors = '';

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return errors = 'Please enter a valid email address';
    }

    if( email === '' || password === '') {
      return errors = 'Please fill in all fields!';
    }

    return errors;
  };

  // const isValidEmail = (email) => {
  //   return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  // };

  const handleLogin = async () => {
    const err = validation();
    if(err != '') {
      Toast.show({
        type: 'error',
        text1: err,
      });
      return;
    }
    
    const auth = firebase_auth;
    
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
      setUser(response.user)
      Toast.show({
        type: 'success',
        text1: 'Login successful!',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Login failed!',
        text2: 'check your email or password'
      });
      console.log(error.message);
    }
  };
  
  return (
    <View>
      <View style={styles.toastContainer}>
        <Toast position="top" />
      </View>
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
                  Login
                </Text>
                <Text style={[styles.descText, MyTheme.typography.subtitle.sub_3]}>
                  Please sign in to continue
                </Text>
                <Text style={[styles.outerText, MyTheme.typography.body.body_1]}>
                  Are you a Vendor?
                  <Text style={styles.innerText} onPress={handleVendor}>  Login as Vendor
                  </Text>
                </Text>
              </View>
              <View>
                <View style={styles.inputTextContainer}>
                  <TextInputIcon 
                    iconSource={UnameIcon}
                    placeholder="Email"
                    type="email"
                    mode="email"
                    value={email}
                    fontSize={MyTheme.typography.body.body_1}
                    iconProps={{ width: 20, height: 20 }}
                    onChangeText={(text) => setEmail(text)}
                  />
                </View>
                <View style={styles.inputTextContainer}>
                  <TextInputIcon 
                    iconSource={PasswordIcon}
                    placeholder="Password"
                    type="password"
                    mode="text"
                    value={password}
                    fontSize={MyTheme.typography.body.body_1}
                    iconProps={{ width: 20, height: 20 }}
                    onChangeText={(text) => setPassword(text)}
                  />
                </View>
                <Text style={[styles.passContainer, MyTheme.typography.body.body_2]}>
                  Forgot the password?
                </Text>
              </View>
              <View style={styles.submitButtonContainer}>
                <CustomButton
                  title="Login"
                  textColor={MyTheme.colors.white}
                  onPress={handleLogin}
                  size="block-round"
                  type="fill"
                  buttonColor={MyTheme.colors.brown_2}
                />
              </View>
              <View style={styles.regisContainer}>
                <Text style={[styles.outerText, MyTheme.typography.body.body_1]}>
                  Don’t have an account yet?  
                  <Text style={styles.innerText} 
                    onPress={handleRegis}
                  > Register
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 20,
  },
  toastContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
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
  passContainer: {
    marginTop: 8,
    alignItems: 'flex-start',
    marginLeft: 10,
    color: MyTheme.colors.neutral_2p,
  },
  submitButtonContainer: {
    paddingTop: 40,
  },
  regisContainer: {
    paddingTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 10,
  },
});

export default Login;
