import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MyTheme from '../../config/theme.js';
import { SCREEN_HEIGHT } from '../../utils/deviceDimensions.js';
import { Link } from 'expo-router';
import { TextInputIcon } from '../../components/shares/TextInput/TextInputIcon.js';
import { CustomButton } from '../../components/shares/Buttons/index.js';

const Login = () => {

    return(
        <View style={styles.Container}>
            <View style={styles.TextContainer}>
                <Text style={styles.titleText}>
                    Login
                </Text>
                <Text style={styles.descText}>
                    Please sign in to continue
                </Text>
                <Text style={styles.vendorText}>
                    Are you a Vendor? 
                    <Link href="#" style={styles.innerText}>  Login as Vendor</Link>
                </Text>
            </View>
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
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    Container : {
        flex: 1,
        paddingTop: (SCREEN_HEIGHT/3) + 12,
        paddingHorizontal: 20
    }, 
    TextContainer : {
        marginLeft: 4
    },
    titleText : {
        fontFamily: "poppinsBold",
        fontSize: 40,
        color: MyTheme.colors.brown_2,
    },
    descText : {
        fontFamily: "poppinsSemiBold",
        fontSize: 16,
        color: MyTheme.colors.neutral_2p,
        marginLeft: 4
    },
    vendorText : {
        fontFamily: "poppinsRegular",
        fontSize: 12,
        marginLeft: 4,
        color: MyTheme.colors.neutral_2p
    },
    innerText : {
        fontFamily: "poppinsMedium",
        fontSize: 12,
        color: MyTheme.colors.brown_2,
        marginLeft: 4
    },
    inputContainer : {
        marginTop: 24,
    },
    tInputContainer : {
        paddingVertical: 10
    }
});

export default Login;