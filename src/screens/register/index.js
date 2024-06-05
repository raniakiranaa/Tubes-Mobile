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
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db, firebase_auth } from '../../firebase/index.js';
import { UserContext } from '../../contexts/UserContext.js';
import { addDoc, collection } from 'firebase/firestore';

const Register = () => {
  const nav = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cPassword, setcPassword] = useState('');
  const { setUser } = useContext(UserContext);

  const handleLogin = () => {
    nav.navigate("Login");
  }

  const handleVendor = () => {
    nav.navigate("#");
  }  

  const validation = () => {
    let errors = '';

    if (!/^[a-zA-Z\s]+$/.test(name)) {
      return errors = 'Name can only contain alphabet';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return errors = 'Please enter a valid email address';
    }

    if(password.length < 6) {
      return errors = 'Password should be at least 6 characters'
    }

    if(password !== cPassword) {
      return errors = 'Confirm password is not equal to password!';
    }    

    if(name === '' || email === '' || password === '' || cPassword === '') {
      return errors = 'Please fill in all fields!';
    }

    return errors;
  };

  const handleRegis = async () => {
    const err = validation();
    if(err !== '') {
      Toast.show({
        type: 'error',
        text1: err,
      });
      return;
    }

    const auth = firebase_auth;

    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      
      await addDoc(collection(db, 'customer'), {
        name: name,
        email: email,
        password: password,
        contact: null,
        married_city: null,
        deadline_guest: null,
        married_date: null,
        partner_name: null,
        role: 'customer',
        target_budget: null,
        total_guest: null,
        wedding_role: null,
      });

      setUser({
        name: name,
        email: email,});
      // setUser(response.user)
      Toast.show({
        type: 'success',
        text1: 'Register successful!',
      });
    } catch (error) {
      let errorMessage = 'Register failed! ' + error.message;
  
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Email already in use';
      }
  
      Toast.show({
        type: 'error',
        text1: errorMessage,
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
                  Register
                </Text>
                <Text style={[styles.descText, MyTheme.typography.subtitle.sub_3]}>
                  Please sign up to continue
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
                    type="text"
                    mode="text"
                    value={name}
                    fontSize={MyTheme.typography.body.body_1}
                    iconProps={{ width: 20, height: 20 }}
                    onChangeText={(text) => setName(text)}
                  />
                </View>
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
                <View style={styles.inputTextContainer}>
                  <TextInputIcon 
                    iconSource={PasswordIcon}
                    placeholder="Confirm Password"
                    type="password"
                    mode="text"
                    value={cPassword}
                    fontSize={MyTheme.typography.body.body_1}
                    iconProps={{ width: 20, height: 20 }}
                    onChangeText={(text) => setcPassword(text)}
                  />
                </View>
              </View>
              <View style={styles.submitButtonContainer}>
                <CustomButton
                  title="Register"
                  textColor={MyTheme.colors.white}
                  onPress={handleRegis}
                  size="block-round"
                  type="fill"
                  buttonColor={MyTheme.colors.brown_2}
                />
              </View>
              <View style={styles.regisContainer}>
                <Text style={[styles.outerText, MyTheme.typography.body.body_1]}>
                  Already have an account?  
                  <Text style={styles.innerText} 
                    onPress={handleLogin}
                  > Login
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
