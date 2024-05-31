import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import MyTheme from '../../config/theme.js';
import { useNavigation } from '@react-navigation/native';
import UnameIcon from '../../../assets/icons/Uname/index.js';
import { SCREEN_WIDTH } from '../../utils/deviceDimensions.js';
import CaretLeft from '../../../assets/icons/CaretRight/index.js';
import SettingIcon from '../../../assets/icons/SettingIcon/index.js';
import FAQIcon from '../../../assets/icons/FAQ/index.js';
import TnC from '../../../assets/icons/Tnc/index.js';
import LogoutIcon from '../../../assets/icons/Logout/index.js';

const Profile = () => {
    const nav = useNavigation();
    const handleEditProfile = () => {
        nav.navigate('#');
    }

    const handleSettings = () => {
        nav.navigate('#');
    }

    const handleHelpsFAQ = () => {
        nav.navigate('#');
    }

    const handleTnC = () => {
        nav.navigate('#');
    }

    const handleLogout = () => {
        nav.navigate('#');
    }

    return (
        <View style={styles.container}>
            <View style={styles.custContainer}>
                <Image
                    style={styles.imgCust}
                    source={require('../../../assets/images/Eveey.jpg')}
                />
                <Text style={[styles.nameCust, MyTheme.typography.subtitle.sub_1]}>
                    Eveey
                </Text>
                <Text style={MyTheme.typography.body.body_2}>
                    eveey12345
                </Text>
            </View>
            <View style={styles.optionContainer}>
                <TouchableOpacity style={styles.options} onPress={handleEditProfile}>
                    <View style={styles.iconStyle}>
                        <UnameIcon width={25} height={25} fillColor={MyTheme.colors.brown_2} strokeColor={MyTheme.colors.brown_2}/>
                    </View>
                    <View style={styles.optionTitle}>
                        <Text style={[styles.textTitle, MyTheme.typography.medium.medium_1]}>
                            Edit Profile
                        </Text>
                    </View>
                    <View style={styles.caretIcon}>
                        <CaretLeft />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.options} onPress={handleSettings}>
                    <View style={styles.iconStyle}>
                        <SettingIcon width={24} height={24} fillColor={MyTheme.colors.brown_2}/>
                    </View>
                    <View style={styles.optionTitle}>
                        <Text style={[styles.textTitle, MyTheme.typography.medium.medium_1]}>
                            Settings
                        </Text>
                    </View>
                    <View style={styles.caretIcon}>
                        <CaretLeft />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.options} onPress={handleHelpsFAQ}>
                    <View style={styles.iconStyle}>
                        <FAQIcon width={25} height={25} fillColor={MyTheme.colors.brown_2} strokeColor={MyTheme.colors.brown_2}/>
                    </View>
                    <View style={styles.optionTitle}>
                        <Text style={[styles.textTitle, MyTheme.typography.medium.medium_1]}>
                            Helps and FAQ
                        </Text>
                    </View>
                    <View style={styles.caretIcon}>
                        <CaretLeft />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.options} onPress={handleTnC}>
                    <View style={styles.iconStyle}>
                        <TnC width={23} height={23} fillColor={MyTheme.colors.brown_2} />
                    </View>
                    <View style={styles.optionTitle}>
                        <Text style={[styles.textTitle, MyTheme.typography.medium.medium_1]}>
                            Terms and Conditions
                        </Text>
                    </View>
                    <View style={styles.caretIcon}>
                        <CaretLeft />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.options} onPress={handleLogout}>
                    <View style={styles.iconStyle}>
                        <LogoutIcon width={23} height={23} />
                    </View>
                    <View style={styles.optionTitle}>
                        <Text style={[styles.logoutStyle, MyTheme.typography.medium.medium_1]}>
                            Logout
                        </Text>
                    </View>
                    <View style={styles.caretIcon}>
                        <CaretLeft />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#fff',
    },
    imgCust : {
        width: 100,
        height: 100,
        borderRadius: 50
    },
    custContainer: {
        marginTop : 60,
        alignItems: 'center'
    },
    nameCust: {
        paddingTop: 8
    },
    optionContainer : {
        paddingTop: 20,
    },
    options : {
        flexDirection: 'row',
        height: 52,
        borderBottomWidth: 0.2,
        borderColor: MyTheme.colors.neutral_4,
        width: SCREEN_WIDTH,
        alignItems: 'center',
        paddingHorizontal: 18,
    },
    iconStyle : {
        justifyContent: 'center', 
        alignItems: 'center',
        marginRight: 10,
    },
    optionTitle: {
        flex: 1, 
        justifyContent: 'center',
    },
    textTitle : {
        color: MyTheme.colors.black,
    },
    caretIcon : {
        paddingRight: 4,
    },
    logoutStyle : {
        color: MyTheme.colors.danger,
    }
});

export default Profile;
