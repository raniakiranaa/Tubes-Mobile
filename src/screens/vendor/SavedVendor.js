import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import MyTheme from '../../config/theme';
// import ChatIcon from '../../../assets/icons/Chat.svg';
// import OrderIcon from '../../../assets/icons/Order.svg';

const { width: screenWidth } = Dimensions.get('window');

const PackageDetailPage = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          {/* Replace this with your back arrow icon */}
          <Text style={styles.backText}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Package Detail</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.packageInfo}>
          <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.vendorImage} />
          <Text style={[MyTheme.typography.subtitle.sub_2, styles.packageTitle]}>Royal Ballroom Package</Text>
          <Text style={[MyTheme.typography.body.body_2, styles.packageVendor]}>
            by JW Marriott Hotel Surabaya
          </Text>
          <Image source={{ uri: 'https://via.placeholder.com/400' }} style={styles.packageImage} />
          <Text style={[MyTheme.typography.subtitle.sub_2, styles.packagePrice]}>
            IDR 300,000,000 • 330 pax
          </Text>
        </View>

        <Text style={[MyTheme.typography.subtitle.sub_2, styles.sectionTitle]}>Description</Text>
        <View style={styles.sectionContent}>
          <Text style={[MyTheme.typography.body.body_2, styles.sectionHeader]}>Location</Text>
          <Text style={[MyTheme.typography.body.body_2, styles.sectionText]}>
            JW Marriott Hotel Surabaya, Jalan Embong Malang, Kedungdoro, Surabaya City, East Java, Indonesia
            Royal Ballroom, 2nd Floor
          </Text>
        </View>

        <View style={styles.sectionContent}>
          <Text style={[MyTheme.typography.body.body_2, styles.sectionHeader]}>Facilities</Text>
          <Text style={[MyTheme.typography.body.body_2, styles.sectionText]}>
            • Wedding event at the Royal Ballroom JW Marriott Hotel Surabaya{"\n"}
            • 1 Bridal Suite including breakfast for 2 (two) persons{"\n"}
            • 2 Deluxe Premium rooms including breakfast for 2 (two) persons{"\n"}
            • Includes buffet menu or set menu per person{"\n"}
            • Unique pillar-less high ceiling that can host up to 60 tables
          </Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.chatButton}>
          {/* <ChatIcon width={20} height={20} /> */}
          <Text style={[MyTheme.typography.subtitle.sub_3, { color: MyTheme.colors.brown_2 }]}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.orderButton}>
          {/* <OrderIcon width={20} height={20} /> */}
          <Text style={[MyTheme.typography.subtitle.sub_3, { color: MyTheme.colors.white }]}>Order</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: MyTheme.colors.pink_2,
  },
  backButton: {
    marginRight: 16,
  },
  backText: {
    fontSize: 18,
    color: '#fff',
  },
  headerTitle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
  },
  packageInfo: {
    alignItems: 'center',
  },
  vendorImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  packageTitle: {
    color: MyTheme.colors.black,
    marginTop: 10,
  },
  packageVendor: {
    color: MyTheme.colors.neutral_1,
  },
  packageImage: {
    width: screenWidth - 40,
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
  packagePrice: {
    color: MyTheme.colors.neutral_1,
    marginTop: 10,
  },
  sectionTitle: {
    color: MyTheme.colors.neutral_1,
    marginTop: 20,
  },
  sectionContent: {
    marginTop: 10,
  },
  sectionHeader: {
    color: MyTheme.colors.brown_2,
  },
  sectionText: {
    color: MyTheme.colors.neutral_1,
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  chatButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: MyTheme.colors.white,
    borderWidth: 1,
    borderColor: MyTheme.colors.brown_2,
    borderRadius: 20,
    marginRight: 10,
  },
  orderButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: MyTheme.colors.brown_2,
    borderRadius: 20,
    marginLeft: 10,
  },
});

export default PackageDetailPage;
