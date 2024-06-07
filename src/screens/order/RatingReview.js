import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ActivityIndicator, TouchableWithoutFeedback, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyTheme from '../../config/theme';
import CustomStarRating from '../../components/shares/Rating/CustomStarRating';
import WriteIcon from '../../../assets/icons/Write.svg';
import { db } from '../../firebase';
import { getDoc, doc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../contexts/UserContext.js';

const RatingReview = ({ route }) => {
  const order = {
    customer: {
      name: 'Eveey',
      address: 'Jl. Kusuma Bangsa No. 5 Surabaya, Jawa Timur',
    },
    vendor: {
      name: 'JW Marriott Surabaya',
      address: 'JW Marriott Hotel Surabaya, Jalan Embong Malang, Kedungdoro, Surabaya City, East Java, Indonesia',
      image: 'https://via.placeholder.com/150',
    },
    package: {
      name: 'Royal Ballroom Package',
      price: 'IDR 300,000,000',
      pax: '330 pax',
      date: '14 February 2024',
    },
    status: 'Vendor Confirmation',
    statusMessage: 'Waiting for the vendor to confirm service availability on February 14th, 2024.',
  };

  const { user } = useContext(UserContext);
  const { id } = route.params;
  const orderID = `${id}`;
  const [orderDeliveredData, setOrderDeliveredData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getOrderDelivered = async () => {
    setLoading(true);
    try {
      const orderRef = doc(db, 'customer', user.id, 'order', orderID);
      const orderSnap = await getDoc(orderRef);

      if (orderSnap.exists()) {
        const orderData = orderSnap.data();
        const vendorRef = doc(db, 'vendor', `${orderData.vendor_ID}`);
        const vendorSnap = await getDoc(vendorRef);
        if (vendorSnap.exists()) {
          const vendorData = vendorSnap.data();
          const catalogRef = doc(db, 'vendor', `${orderData.vendor_ID}`, 'catalog', `${orderData.catalog_ID}`);
          const catalogSnap = await getDoc(catalogRef);
          if (catalogSnap.exists()) {
            const catalogData = catalogSnap.data();
            setOrderDeliveredData({
              id: orderSnap.id,
              ...orderData,
              vendor_name: vendorData.name,
              vendor_image: vendorData.image,
              vendor_location: vendorData.location,
              catalog_name: catalogData.name,
              catalog_image: catalogData.catalog_img,
              catalog_pax: catalogData.pax,
              catalog_price: catalogData.price,
            });
          } else {
            console.error('No catalog found with ID: ', orderData.catalog_ID);
            setOrderDeliveredData({
              id: orderSnap.id,
              ...orderData,
              vendor_name: vendorData.name,
              vendor_image: vendorData.image,
              vendor_location: vendorData.location,
              catalog_name: null,
              catalog_image: null,
              catalog_pax: null,
              catalog_price: null,
            });
          }
        } else {
          console.error('No vendor found with ID: ', orderData.vendor_ID);
          setOrderDeliveredData({
            id: orderSnap.id,
            ...orderData,
            vendor_name: null,
            vendor_image: null,
            vendor_location: null,
            catalog_name: null,
            catalog_image: null,
            catalog_pax: null,
            catalog_price: null,
          });
        }
      } else {
        console.log('No matching documents.');
        setLoading(false);
        return;
      }
    } catch (error) {
      console.error('Error getting documents: ', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getOrderDelivered();
  }, [id]);

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const checkSubmission = async () => {
      const submitted = await AsyncStorage.getItem('isSubmitted');
      if (submitted === 'true') {
        setIsSubmitted(true);
        const savedRating = await AsyncStorage.getItem('rating');
        const savedReview = await AsyncStorage.getItem('review');
        setRating(parseInt(savedRating, 10));
        setReview(savedReview);
      }
    };
    checkSubmission();
  }, []);

  const handleSubmit = async () => {
    console.log('Rating:', rating);
    console.log('Review:', review);
    setIsSubmitted(true);
    await AsyncStorage.setItem('isSubmitted', 'true');
    await AsyncStorage.setItem('rating', rating.toString());
    await AsyncStorage.setItem('review', review);

    try {
      await addDoc(collection(db, 'vendor', `${orderDeliveredData.vendor_ID}`, 'review'), {
        comment: review,
        created_at: serverTimestamp(),
        name: user.name,
        rating: rating,
      });
      console.log('Review successfully submitted!');
    } catch (error) {
      console.error('Error submitting review: ', error);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value);
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  if (loading) {
    return (
      <View style={styles.loadingOverlay}>
        <ActivityIndicator size="large" color={MyTheme.colors.brown_2} />
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.section}>
          <Image source={{ uri: orderDeliveredData.vendor_image }} style={styles.vendorImage} />
          <View>
            <Text style={[styles.sectionHeader]}>{orderDeliveredData.vendor_name}</Text>
            <Text style={[MyTheme.typography.body.body_3, { color: MyTheme.colors.neutral_1 }]}>{orderDeliveredData.vendor_location}</Text>
          </View>
        </View>
        <View style={styles.rating}>
          <Text style={[MyTheme.typography.subtitle.sub_2, { color: MyTheme.colors.black }]}>How was the order, <Text style={{ color: MyTheme.colors.pink_2 }}>{user.name}?</Text></Text>
          <CustomStarRating rating={rating} onChange={setRating} starSize={40} disabled={isSubmitted} />
        </View>
        <View style={styles.packageContainer}>
          <Image source={{ uri: orderDeliveredData.catalog_image }} style={styles.packageImage} />
          <View style={styles.packageDetails}>
            <Text style={MyTheme.typography.subtitle.sub_3}>{orderDeliveredData.catalog_name}</Text>
            <Text style={[MyTheme.typography.body.body_2, { color: MyTheme.colors.neutral_2p }]}>by <Text style={{ color: MyTheme.colors.pink_2 }}>{orderDeliveredData.vendor_name}</Text></Text>
            <View style={styles.vendorPriceDetail}>
              <Text style={[MyTheme.typography.subtitle.sub_3, { color: MyTheme.colors.brown_3 }]}>{formatCurrency(orderDeliveredData.catalog_price)}</Text>
              <Text style={MyTheme.typography.body.body_2}> • {orderDeliveredData.catalog_pax} pax</Text>
            </View>
            <Text style={[MyTheme.typography.body.body_2, { color: MyTheme.colors.neutral_2p }]}>Date: {formatDate(orderDeliveredData.date_order)}</Text>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <WriteIcon width={17} height={17} style={styles.writeIcon} />
          <TextInput
            style={styles.reviewInput}
            placeholder="Write your review here..."
            multiline
            numberOfLines={4}
            onChangeText={setReview}
            value={review}
            placeholderTextColor={MyTheme.colors.neutral_3}
            editable={!isSubmitted}
          />
        </View>

        {!isSubmitted && (
          <View style={styles.action}>
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={[MyTheme.typography.subtitle.sub_3, { color: MyTheme.colors.white }]}>Submit</Text>
            </TouchableOpacity>
          </View>
        )}

        {isSubmitted && (
          <View style={styles.thankYouContainer}>
            <Text style={[MyTheme.typography.subtitle.sub_2, { color: MyTheme.colors.brown_2 }]}>Thank you for your review!</Text>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  section: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  sectionHeader: {
    fontFamily: 'poppinsMedium',
    fontSize: 14,
  },
  vendorImage: {
    width: 45,
    height: 45,
    borderRadius: 25,
    marginRight: 11,
  },
  rating: {
    marginBottom: 50,
    alignItems: 'center',
  },
  packageContainer: {
    flexDirection: 'row',
    borderRadius: 10,
    marginBottom: 20,
    padding: 16,
    ...MyTheme.shadows.shadow_1,
  },
  packageImage: {
    width: 55,
    height: 55,
    borderRadius: 10,
    marginRight: 15,
  },
  packageDetails: {
    flex: 1,
  },
  vendorPriceDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  writeIcon: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
  reviewInput: {
    height: 100,
    borderColor: MyTheme.colors.neutral_3,
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 40,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 10,
    textAlignVertical: 'top',
  },
  action: {
    position: 'absolute',
    bottom: 12,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 20,
  },
  submitButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 25,
    backgroundColor: MyTheme.colors.brown_2,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  thankYouContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  resetButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    borderColor: MyTheme.colors.brown_2,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
});

export default RatingReview;
