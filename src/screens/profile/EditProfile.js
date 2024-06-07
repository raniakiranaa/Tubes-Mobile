import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import MyTheme from '../../config/theme.js';
import { useNavigation } from '@react-navigation/native';
import { TextInputIcon } from '../../components/shares/TextInput/TextInputIcon.js';
import { CustomButton } from '../../components/shares/Buttons/index.js';
import { db } from '../../firebase/index.js';
import { UserContext } from '../../contexts/UserContext.js';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import MarriedDateModal from './MarriedDateModal.js';
import Toast from 'react-native-toast-message';
import { Dropdown } from 'react-native-element-dropdown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const EditProfile = () => {
    const nav = useNavigation();
    const { user, setUser } = useContext(UserContext);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        contact: '',
        wedding_role: '',
        partner_name: '',
        married_city: '',
        married_date: null,
    });
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [wedding_role, setWeddingRole] = useState('');
    const [partner_name, setPartnerName] = useState('');
    const [married_city, setMarriedCity] = useState('');
    const [married_date, setMarriedDate] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [display, setDisplay] = useState('');
    const [tempDisplay, setTempDisplay] = useState('');

    const weddingRoleData = [
        { label: 'Bride', value: 'Bride' },
        { label: 'Groom', value: 'Groom' },
    ];

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userDoc = await getDoc(doc(db, 'customer', user.id));
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setFormData({
                        ...userData,
                    });
                    setName(userData.name);
                    setEmail(userData.email);
                    setContact(userData.contact);
                    setPartnerName(userData.partner_name);
                    setWeddingRole(userData.wedding_role);
                    setMarriedCity(userData.married_city);
                    setMarriedDate(userData.married_date);
                    if (userData.married_date) handleTempDate(userData.married_date);
                    // console.log('tempDisplay', tempDisplay);
                } else {
                    console.log('No such document!');
                }
            } catch (error) {
                console.error('Error fetching user data: ', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [user.id]);

    const handleSave = async () => {
        try {
            const updatedData = {
                name: name,
                contact: contact,
                wedding_role: wedding_role,
                partner_name: partner_name,
                married_city: married_city,
                married_date: married_date,
            };

            const custRef = doc(db, 'customer', user.id);
            await updateDoc(custRef, updatedData);
            setUser({
                ...user,
                name: name,
            });
            nav.goBack();

            Toast.show({
                type: 'success',
                text1: 'Edit Profile successful!',
            });
        } catch (error) {
            console.error('Error updating document: ', error);
        }
    };

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const handleDateChange = (datee) => {
        setMarriedDate(datee);
    };

    const handleTempDate = (date) => {
        const createdDate = new Date(date.seconds * 1000);
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        const formattedDate = createdDate.toLocaleDateString('en-US', options);
        setTempDisplay(formattedDate);
    }

    const dateDisplay = (date) => {
        setDisplay(date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }));
    };

    const handleModalSave = () => {
        toggleModal();
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={MyTheme.colors.brown_3} />
            </View>
        );
    }

    return (
        <KeyboardAwareScrollView
            style={styles.Acontainer}
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={styles.scrollContainer}
            scrollEnabled={true}
        >
            <ScrollView style={styles.container}>
                <View style={styles.custContainer}>
                    <Image
                        style={styles.imgCust}
                        source={require('../../../assets/images/Eveey.jpg')}
                    />
                    <Text style={[styles.nameCust, MyTheme.typography.subtitle.sub_1]}>{user.name}</Text>
                </View>
                <View style={styles.editContainer}>
                    <View style={styles.dataContainer}>
                        <Text style={[styles.title, MyTheme.typography.medium.medium_1]}>Name</Text>
                        <TextInputIcon
                            placeholder={formData.name || 'Add your name'}
                            type="text"
                            mode="text"
                            value={name}
                            fontSize={MyTheme.typography.body.body_1}
                            onChangeText={text => setName(text)}
                        />
                    </View>
                    <View style={styles.dataContainer}>
                        <Text style={[styles.title, MyTheme.typography.medium.medium_1]}>Email</Text>
                        <TextInputIcon
                            placeholder={formData.email || 'Add your email'}
                            type="text"
                            mode="text"
                            value={email}
                            fontSize={MyTheme.typography.body.body_1}
                            disabled={true}
                        />
                    </View>
                    <View style={styles.dataContainer}>
                        <Text style={[styles.title, MyTheme.typography.medium.medium_1]}>Phone</Text>
                        <TextInputIcon
                            placeholder={formData.contact || 'Add your phone number'}
                            type="phone"
                            mode="tel"
                            value={contact}
                            fontSize={MyTheme.typography.body.body_1}
                            onChangeText={setContact}
                        />
                    </View>
                    <View style={styles.dataContainer}>
                        <Text style={[styles.title, MyTheme.typography.medium.medium_1]}>Wedding Role</Text>
                        <Dropdown
                            data={weddingRoleData}
                            labelField="label"
                            valueField="value"
                            placeholder="Select your wedding role"
                            value={wedding_role}
                            onChange={item => setWeddingRole(item.value)}
                            style={styles.dropdown}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            containerStyle={styles.dropdownContainer}
                        />
                    </View>
                    <View style={styles.dataContainer}>
                        <Text style={[styles.title, MyTheme.typography.medium.medium_1]}>Partner Name</Text>
                        <TextInputIcon
                            placeholder={formData.partner_name || 'Add your partner name'}
                            type="text"
                            mode="text"
                            value={partner_name}
                            fontSize={MyTheme.typography.body.body_1}
                            onChangeText={setPartnerName}
                        />
                    </View>
                    <View style={styles.dataContainer}>
                        <Text style={[styles.title, MyTheme.typography.medium.medium_1]}>Married City</Text>
                        <TextInputIcon
                            placeholder={formData.married_city || 'Add your married city'}
                            type="text"
                            mode="text"
                            value={married_city}
                            fontSize={MyTheme.typography.body.body_1}
                            onChangeText={setMarriedCity}
                        />
                    </View>
                    <TouchableOpacity style={styles.dataContainer} onPress={toggleModal}>
                        <Text style={[styles.title, MyTheme.typography.medium.medium_1]}>Married Date</Text>
                        <TextInputIcon
                            placeholder={display || tempDisplay || 'Add your married date'}
                            type="date"
                            mode="text"
                            value={married_date}
                            fontSize={MyTheme.typography.body.body_1}
                            editable={false}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.saveButtonContainer}>
                    <CustomButton
                        title="Save"
                        textColor={MyTheme.colors.white}
                        onPress={handleSave}
                        size="block-round"
                        type="fill"
                        buttonColor={MyTheme.colors.brown_2}
                    />
                </View>
                <MarriedDateModal
                    visible={isModalVisible}
                    onClose={toggleModal}
                    onSave={handleModalSave}
                    selectedDate={selectedDate}
                    onDateChange={handleDateChange}
                    dateToDisplay={dateDisplay}
                />
                <View style={styles.toastContainer}>
                    <Toast position="top" />
                </View>
            </ScrollView>
        </KeyboardAwareScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    custContainer: {
        alignItems: 'center',
        marginTop: 60,
    },
    imgCust: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    nameCust: {
        paddingTop: 8,
        ...MyTheme.typography.headings.h3,
    },
    editContainer: {
        paddingHorizontal: 25,
        paddingVertical: 10,
    },
    dataContainer: {
        marginBottom: 15,
    },
    saveButtonContainer: {
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        marginBottom: 5,
    },
    toastContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
    },
    dropdown: {
        backgroundColor: MyTheme.colors.white,
        borderColor: MyTheme.colors.neutral_4,
        borderWidth: 2,
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 2,
        alignContent: 'center',
    },
    placeholderStyle: {
        color: MyTheme.colors.neutral_2p,
        ...MyTheme.typography.body.body_1,
    },
    selectedTextStyle: {
        color: MyTheme.colors.neutral_2p,
        ...MyTheme.typography.body.body_1,
    },
    dropdownContainer: {
        backgroundColor: MyTheme.colors.white,
        borderColor: "#E3E5E5",
        borderRadius: 10,
    },
});

export default EditProfile;
