import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyTheme from '../../config/theme';
import CustomStarRating from '../../components/shares/Rating/CustomStarRating';
import WriteIcon from '../../../assets/icons/Write.svg';

const RatingReview = () => {
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

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Check if the review has been submitted before
    const checkSubmission = async () => {
      const submitted = await AsyncStorage.getItem('isSubmitted');
      if (submitted === 'true') {
        setIsSubmitted(true);
        const savedRating = await AsyncStorage.getItem('rating');
        if (savedRating) {
          setRating(parseInt(savedRating, 10));
        }
      }
    };
    checkSubmission();
  }, []);

  const handleSubmit = async () => {
    // Handle the submit action (e.g., send the review to your server)
    console.log('Rating:', rating);
    console.log('Review:', review);
    setIsSubmitted(true);
    await AsyncStorage.setItem('isSubmitted', 'true');
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Image source={{ uri: order.vendor.image }} style={styles.vendorImage} />
        <View>
          <Text style={[styles.sectionHeader]}>{order.vendor.name}</Text>
          <Text style={[MyTheme.typography.body.body_3, { color: MyTheme.colors.neutral_1 }]}>{order.vendor.address}</Text>
        </View>
      </View>
      <View style={styles.rating}>
        <Text style={[MyTheme.typography.subtitle.sub_2, { color: MyTheme.colors.black }]}>How was the order, <Text style={{ color: MyTheme.colors.pink_2 }}>{order.customer.name}</Text></Text>
        <CustomStarRating rating={rating} onChange={setRating} starSize={40} disabled={isSubmitted} />
      </View>
      <View style={styles.packageContainer}>
        <Image source={{ uri: order.vendor.image }} style={styles.packageImage} />
        <View style={styles.packageDetails}>
          <Text style={MyTheme.typography.subtitle.sub_3}>{order.package.name}</Text>
          <Text style={[MyTheme.typography.body.body_2, { color: MyTheme.colors.neutral_2p }]}>by <Text style={{ color: MyTheme.colors.pink_2 }}>{order.vendor.name}</Text></Text>
          <View style={styles.vendorPriceDetail}>
            <Text style={[MyTheme.typography.subtitle.sub_3, { color: MyTheme.colors.brown_3 }]}>{order.package.price}</Text>
            <Text style={MyTheme.typography.body.body_2}> • {order.package.pax}</Text>
          </View>
          <Text style={[MyTheme.typography.body.body_2, { color: MyTheme.colors.neutral_2p }]}>Date: {order.package.date}</Text>
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
});

export default RatingReview;
