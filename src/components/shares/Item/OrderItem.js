import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyTheme from '../../../config/theme';

const OrderItem = ({ id, image, vendor_name, catalog_name, catalog_category, pax, price, status, order_date, onPress }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const checkSubmission = async () => {
      const submitted = await AsyncStorage.getItem(`isSubmitted_${id}`);
      if (submitted === 'true') {
        setIsSubmitted(true);
      }
    };
    checkSubmission();
  }, [id]);

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Image source={{ uri: image }} style={styles.image} />
        <View style={styles.details}>
          <Text style={styles.title}>{vendor_name}</Text>
          <Text style={[styles.package, MyTheme.typography.body.body_3]}>{catalog_name} • {pax} pax</Text>
          <Text style={[MyTheme.typography.body.body_3, {color: MyTheme.colors.brown_3}]}><Text style={{color: MyTheme.colors.pink_2}}>{catalog_category}</Text> • {price}</Text>
          <View style={styles.statusContainer}>
              {status === 'Payment Confirmation' && <Text style={[styles.statusYellow, MyTheme.typography.body.body_3, { color: '#D1B75D' }]}>{status}</Text>}
              {status === 'Booked' && <Text style={[styles.statusGreen, MyTheme.typography.body.body_3, { color: '#77A670' }]}>{status}</Text>}
              {status === 'Delivered' && <Text style={[styles.statusGreen, MyTheme.typography.body.body_3, { color: '#77A670' }]}>{status}</Text>}
              {status === 'Waiting for Payment' && <Text style={[styles.statusOrange, MyTheme.typography.body.body_3, { color: '#E98D39' }]}>{status}</Text>}
              {status === 'Vendor Confirmation' && <Text style={[styles.statusRed, MyTheme.typography.body.body_3, { color: '#E2796B' }]}>{status}</Text>}
          </View>
        </View>
        <View style={styles.actions}>
          <Text style={MyTheme.typography.body.body_3}>{order_date}</Text>
          <TouchableOpacity style={isSubmitted && status === 'Delivered' ? styles.reviewSubmittedButton : styles.button}>
            {status === 'Waiting for Payment' && <Text style={[styles.buttonText, MyTheme.typography.subtitle.sub_4]}>Pay</Text>}
            {status === 'Delivered' && <Text style={isSubmitted ? [MyTheme.typography.subtitle.sub_4, {color: '#979C9E'}] : [styles.buttonText, MyTheme.typography.subtitle.sub_4]}>Review</Text>}
            {status !== 'Waiting for Payment' && status !== 'Delivered' && <Text style={[styles.buttonText, MyTheme.typography.subtitle.sub_4]}>Chat</Text>}
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#fff',
    marginVertical: 1,
    elevation: 1,
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 5,
  },
  details: {
    flex: 1,
    marginLeft: 11,
  },
  title: {
    fontSize: 14,
    fontFamily: 'poppinsMedium',
  },
  package: {
    color: MyTheme.colors.neutral_1,
  },
  statusContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  statusRed: {
    backgroundColor: '#FFEAE7',
    borderColor: '#E2796B',
    borderWidth: 0.2,
    marginTop: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 1,
    paddingHorizontal: 4,
    marginTop: 5,
  },
  statusOrange: {
    backgroundColor: '#FFEEDE',
    borderColor: '#E98D39',
    borderWidth: 0.2,
    marginTop: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 1,
    paddingHorizontal: 4,
    marginTop: 5,
  },
  statusYellow: {
    backgroundColor: '#FDFFE2',
    borderColor: '#FFD955',
    borderWidth: 0.2,
    marginTop: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 1,
    paddingHorizontal: 4,
    marginTop: 5,
  },
  statusGreen: {
    backgroundColor: '#EEFFEA',
    borderColor: '#77A670',
    borderWidth: 0.2,
    marginTop: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 1,
    paddingHorizontal: 4,
    marginTop: 5,
  },
  actions: {
    alignItems: 'flex-end',
  },
  button: {
    backgroundColor: MyTheme.colors.brown_2,
    marginTop: 5,
    borderRadius: 25,
    height: 21,
    width: 63,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reviewSubmittedButton: {
    backgroundColor: MyTheme.colors.neutral_5,
    marginTop: 5,
    borderRadius: 25,
    height: 21,
    width: 63,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
});

export default OrderItem;
