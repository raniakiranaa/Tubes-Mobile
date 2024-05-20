import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CustomButton } from '../../components/shares/Buttons/index.js';
import MyTheme from '../../config/theme.js';
import { TextInputIcon } from '../../components/shares/TextInput/TextInputIcon.js';

const VendorScreen = ({ navigation }) => {
    return (
        <>
            <View style={styles.container}>
                {/* <CustomHeader /> */}
                <Text style={[MyTheme.typography.subtitle.sub_3]}>Welcome to My app!</Text>
                <View style={styles.inputContainer}>
                <TextInputIcon 
                    iconSource= {require('../../../assets/icons/Mail.png')}
                    placeholder = "Username"
                    type = "username"
                    mode = "text"
                /> 
                <TextInputIcon 
                    iconSource= {require('../../../assets/icons/password.png')}
                    placeholder = "Password"
                    type = "password"
                    mode = "text"
                />
                <TextInputIcon 
                    iconSource= {require('../../../assets/icons/Mail.png')}
                    placeholder = "Username"
                    type = "username"
                    mode = "text"
                /> 
                <TextInputIcon 
                    iconSource= {require('../../../assets/icons/password.png')}
                    placeholder = "Password"
                    type = "password"
                    mode = "text"
                />
            </View>
                {/* <CustomButton 
                    title = "Login"
                    textColor = {MyTheme.colors.brown_2}
                    // onPress = {handlePress}
                    size = "large-square"
                    type = "outline"
                    buttonColor = { MyTheme.colors.white }
                    outlineColor = {MyTheme.colors.brown_3}
                    fontSize = {14}
                />
                <CustomButton 
                    title = "SignUp"
                    textColor = {MyTheme.colors.white}
                    // onPress = {handlePress}
                    size = "block-round"
                    type = "icon"
                    iconSource= {require('../../../assets/icons/icon-chat.png')}
                    buttonColor = { MyTheme.colors.brown_2 }
                /> */}
            </View>
        </>
    // <>
    //     <CustomAppbar title="Vendor" isBackButton={true} isAction={false} />
    //     <View style={styles.header}>
    //         {/* <CustomHeader /> */}
    //         <View style={styles.container}>
    //             <Text style={{ fontFamily: 'poppinsBold' }}>Welcome to My app!</Text>
    //             <OutlineButton
    //                 title='hai'
    //                 // buttonColor = { MyTheme.colors.pink_3 }
    //                 textColor = { MyTheme.colors.black }
    //                 // onPress={() => navigation.navigate('Profile')}
    //                 size = "large-square"
    //             />
    //             <IconButton 
    //                 iconSource= {require('../../../assets/icons/icon-chat.png')}
    //                 title="hai"
    //                 buttonColor = { MyTheme.colors.pink_3 }
    //                 textColor = { MyTheme.colors.black }
    //                 // type="right"
    //                 size="primary"
    //             />
    //         </View>
    //     </View>
    // </>
  );
};

const styles = StyleSheet.create({
//   header: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0, 
//     flex: 1,
//     flexDirection: 'row',
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: 100, 
//   },
  container: {
    flex: 1,
    // justifyContent: 'center',
    paddingTop: 100,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  }
});

export default VendorScreen;
