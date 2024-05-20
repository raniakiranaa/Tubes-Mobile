import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import MyTheme from '../../../config/theme';

const OrderItem = ({ order }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: order.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title}>{order.title}</Text>
        <Text style={[styles.package, MyTheme.typography.body.body_3]}>{order.package}</Text>
        <Text style={[styles.price, MyTheme.typography.body.body_3]}>{order.price}</Text>
        <View style={styles.statusContainer}>
            {order.status === 'Payment Confirmation' && <Text style={[styles.statusYellow, MyTheme.typography.body.body_3, { color: '#D1B75D' }]}>{order.status}</Text>}
            {order.status === 'Booked' && <Text style={[styles.statusGreen, MyTheme.typography.body.body_3, { color: '#77A670' }]}>{order.status}</Text>}
            {order.status === 'Waiting for Payment' && <Text style={[styles.statusOrange, MyTheme.typography.body.body_3, { color: '#E98D39' }]}>{order.status}</Text>}
            {order.status === 'Vendor Confirmation' && <Text style={[styles.statusRed, MyTheme.typography.body.body_3, { color: '#E2796B' }]}>{order.status}</Text>}
        </View>
      </View>
      <View style={styles.actions}>
        <Text style={MyTheme.typography.body.body_3}>{order.date}</Text>
        <TouchableOpacity style={styles.button} onPress={console.log('Pressed')}>
          {order.status === 'Waiting for Payment' && <Text style={[styles.buttonText, MyTheme.typography.subtitle.sub_4]}>Pay</Text>}
          {order.status !== 'Waiting for Payment' && <Text style={[styles.buttonText, MyTheme.typography.subtitle.sub_4]}>Chat</Text>}
        </TouchableOpacity>
      </View>
    </View>
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
  price: {
    color: MyTheme.colors.brown_3,
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
  buttonText: {
    color: 'white',
  },
});

export default OrderItem;
