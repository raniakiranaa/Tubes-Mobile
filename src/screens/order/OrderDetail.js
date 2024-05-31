import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import MyTheme from '../../config/theme';
import CustomAppbar from '../../components/shares/Appbar/CustomAppbar';

const OrderDetail = ({ navigation }) => {
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

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Image source={{ uri: order.vendor.image }} style={styles.vendorImage} />
        <View>
          <Text style={[styles.sectionHeader]}>{order.customer.name}</Text>
          <Text style={[MyTheme.typography.body.body_3, {color: MyTheme.colors.neutral_1}]}>{order.customer.address}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Image source={{ uri: order.vendor.image }} style={styles.vendorImage} />
        <View>
          <Text style={[styles.sectionHeader]}>{order.vendor.name}</Text>
          <Text style={[MyTheme.typography.body.body_3, {color: MyTheme.colors.neutral_1}]}>{order.vendor.address}</Text>
        </View>
      </View>

      <View style={styles.packageContainer}>
        <Image source={{ uri: order.vendor.image }} style={styles.packageImage} />
        <View style={styles.packageDetails}>
          <Text style={MyTheme.typography.subtitle.sub_3}>{order.package.name}</Text>
          <Text style={[MyTheme.typography.body.body_2, {color:MyTheme.colors.neutral_2p}]}>by <Text style={{color:MyTheme.colors.pink_2}}>{order.vendor.name}</Text></Text>
          <View style={styles.vendorPriceDetail}>
            <Text style={[MyTheme.typography.subtitle.sub_3, {color:MyTheme.colors.brown_3}]}>{order.package.price}</Text>
            <Text style={MyTheme.typography.body.body_2}> • {order.package.pax}</Text>
          </View>
          <Text style={[MyTheme.typography.body.body_2, {color:MyTheme.colors.neutral_2p}]}>Date: {order.package.date}</Text>
        </View>
      </View>

      <View style={styles.statusContainer}>
        <Text style={styles.statusLabel}>Status :</Text>
        <Text style={[styles.statusValue, { backgroundColor: '#FFEAE7' }]}>{order.status}</Text>
      </View>
      <Text style={[MyTheme.typography.body.body_2, {color:MyTheme.colors.neutral_1}]}>{order.statusMessage}</Text>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.chatButton} onPress={() => console.log('Chat Pressed')}>
          <Text style={[MyTheme.typography.subtitle.sub_3, {color:MyTheme.colors.brown_2}]}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={() => console.log('Cancel Pressed')}>
          <Text style={[MyTheme.typography.subtitle.sub_3, {color:MyTheme.colors.white}]}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  backButton: {
    marginBottom: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    flexDirection: 'row',
    marginBottom: 20,
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
  packageContainer: {
    flexDirection: 'row',
    borderRadius: 10,
    marginBottom: 20,
    padding: 16,
    ...MyTheme.shadows.shadow_1
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
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  statusLabel: {
    fontFamily: 'poppinsMedium',
    fontSize: 14,
    color: MyTheme.colors.brown_2,
  },
  statusValue: {
    paddingVertical: 1,
    paddingHorizontal: 5,
    borderRadius: 5,
    color: '#E2796B',
    marginLeft: 12,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding:20,
  },
  chatButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: MyTheme.colors.brown_2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: MyTheme.colors.danger,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
});

export default OrderDetail;
