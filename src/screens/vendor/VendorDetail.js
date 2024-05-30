import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, FlatList, Platform } from 'react-native';
import MyTheme from '../../config/theme';
import { BigVendorCard } from '../../components/shares/Card';
import ReviewItem from '../../components/shares/Item/ReviewItem';
import ChatIcon from '../../../assets/icons/Vendor-chat.svg';
import SaveIcon from '../../../assets/icons/Vendor-save.svg';

const { width: screenWidth } = Dimensions.get('window');

const VendorDetailPage = () => {
  const data = [
    {
      id: '1',
      image: 'https://via.placeholder.com/150',
      name: 'JW Marriott Surabaya',
      type: 'Venue',
      location: 'Surabaya, Jawa Timur',
      rating: '4.8',
      product: [
        {
          id: '1',
          image: 'https://via.placeholder.com/150',
          title: 'Royal Ballroom Package',
          subtitle: 'IDR 300,000,000',
          pax: '330 pax',
        },
        {
          id: '2',
          image: 'https://via.placeholder.com/150',
          title: 'Nusantara Package',
          subtitle: 'IDR 88,800,000',
          pax: '200 pax',
        },
      ],
      about: 'JW Marriott Surabaya\'s wedding package will have it all covered for you, to ensure that your once-in-a-lifetime dream comes true. Leave it to our team of dedicated and experienced wedding planners to make your special day memorable for you and your guests. The Royal Ballroom offers a unique pillar-less high ceiling that can host up to 60 tables.',
      services: ['Venue', 'Catering'],
      blog: [
        {
          id: '1',
          image: 'https://via.placeholder.com/150',
          title: 'Top 3 Honeymoon Destination',
          subtitle: 'Explore our top 3 honeymoon picks!',
          date: '14 Feb 2024',
          location: 'JW Marriott Surabaya',
        },
      ],
      review: [
        {
          id: '1',
          name: 'John Doe',
          date: '31 Mar 2024',
          score: '4.5',
          comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at odio nec ex ultricies interdum.',
        },
        {
          id: '2',
          name: 'Jane Doe',
          date: '31 Mar 2024',
          score: '4.5',
          comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at odio nec ex ultricies interdum.',
        },
        {
          id: '3',
          name: 'John Doe',
          date: '31 Mar 2024',
          score: '4.5',
          comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at odio nec ex ultricies interdum.',
        },
        {
          id: '4',
          name: 'Jane Doe',
          date: '31 Mar 2024',
          score: '4.5',
          comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at odio nec ex ultricies interdum.',
        },
        {
          id: '5',
          name: 'John Doe',
          date: '31 Mar 2024',
          score: '4.5',
          comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at odio nec ex ultricies interdum.',
        },
      ],
    },
  ];

  const totalRating = data[0].review.reduce((acc, review) => acc + parseFloat(review.score), 0);
  const averageRating = totalRating / data[0].review.length;
  const totalReviews = data[0].review.length;

  const renderHeader = () => (
    <View className='mt-12'>
      <View style={styles.vendorInfo}>
        <Image source={{ uri: data[0].image }} style={styles.vendorImage} />
        <Text style={[MyTheme.typography.subtitle.sub_2, { color: MyTheme.colors.black }]}>{data[0].name}</Text>
        <Text style={[MyTheme.typography.body.body_2, { color: MyTheme.colors.pink_2 }]} className='mb-2'>Venue<Text style={{ color: MyTheme.colors.black }}> • {data[0].location}</Text></Text>
        <View style={styles.ratingContainer}>
          <Image source={require('../../../assets/icons/star.png')} style={{ height: 11, width: 11, marginLeft: 8 }} />
          <Text style={MyTheme.typography.body.body_3} className='pl-0.5 pr-2 pt-0.5'>{data[0].rating}</Text>
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.saveButton}>
            <SaveIcon width={20} height={20} />
            <Text style={[MyTheme.typography.subtitle.sub_3, { color: MyTheme.colors.brown_2 }]} className='ml-1'>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.chatButton}>
            <ChatIcon width={20} height={20} />
            <Text style={[MyTheme.typography.subtitle.sub_3, { color: MyTheme.colors.white }]} className='ml-1'>Chat</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className='mx-5 flex-row items-center justify-between'>
        <Text style={[MyTheme.typography.subtitle.sub_2, { color: MyTheme.colors.neutral_1, marginRight: 10 }]}>All Products</Text>
        <TouchableOpacity>
          <Text style={[MyTheme.typography.body.body_2, { color: MyTheme.colors.brown_3 }]}>View All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        horizontal
        data={data[0].product}
        renderItem={({ item }) => (
          <BigVendorCard
            image={{ uri: item.image }}
            title={item.title}
            subtitle={item.subtitle}
            pax={item.pax}
          />
        )}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 20, paddingRight: 8 }}
      />
      <View style={styles.aboutSection}>
        <Text style={[MyTheme.typography.subtitle.sub_2, { color: MyTheme.colors.neutral_1 }]}>About</Text>
        <Text style={[MyTheme.typography.medium.medium_1, { color: MyTheme.colors.brown_2 }]} className='mb-2.5'>Services</Text>
        <View style={styles.servicesContainer}>
          {data[0].services.map((service, index) => (
            <View key={index} style={styles.serviceTag}>
              <Text style={[MyTheme.typography.body.body_3, { color: MyTheme.colors.brown_2 }]}>{service}</Text>
            </View>
          ))}
        </View>
        <Text style={[MyTheme.typography.body.body_2, { color: MyTheme.colors.neutral_1 }]}>
          {data[0].about}
        </Text>
      </View>
      <View style={styles.blogSection}>
        <Text style={[MyTheme.typography.medium.medium_1, { color: MyTheme.colors.brown_2 }]} className='mb-2.5'>Blog</Text>
        <View className='flex-row items-center p-2' style={ MyTheme.shadows.shadow_1 }>
          <Image source={{ uri: data[0].blog[0].image }} style={{ height: 50, width: 50 }} />
          <View style={styles.blogCard}>
            <Text style={[MyTheme.typography.subtitle.sub_4, { color: MyTheme.colors.black }]}>{data[0].blog[0].title}</Text>
            <Text style={[MyTheme.typography.body.body_3, { color: MyTheme.colors.brown_3 }]}>{data[0].blog[0].subtitle}</Text>
            <Text style={[MyTheme.typography.body.body_3, { color: MyTheme.colors.neutral_1, marginTop: 3 }]}>
              {data[0].blog[0].date}  —  {data[0].blog[0].location}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.reviewsSection}>
        <Text style={[MyTheme.typography.medium.medium_1, {color:MyTheme.colors.brown_2}]} className='mb-2.5'>Reviews</Text>
        <View className='flex-column items-center justify-center mb-3' style={[MyTheme.shadows.shadow_1, { width: 78, height:58 }]}>
          <Text style={[MyTheme.typography.subtitle.sub_3, { color: MyTheme.colors.black }]}>{averageRating}</Text>
          <View className='flex-row items-center justify-center'>
            {Array.from({ length: 5 }, (_, index) => {
              if (index <= Math.floor(averageRating) - 1) {
                return <Image key={index} source={require('../../../assets/icons/Star-filled.png')} style={{ height: 12, width: 12 }} />
              }
              return <Image key={index} source={require('../../../assets/icons/Star-unfilled.png')} style={{ height: 12, width: 12 }} />
            })}
          </View>
          <Text style={[MyTheme.typography.body.body_3, {color:MyTheme.colors.black}]} className='mt-0.5'>{totalReviews} Ratings</Text>
        </View>
      </View>
    </View>
  );

  return (
    <FlatList
      style={styles.list}
      ListHeaderComponent={renderHeader}
      data={data[0].review}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={item => item.id}
      contentContainerStyle={{ paddingBottom: Platform.OS === 'ios' ? 36 : 4 }}
    />
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
  vendorInfo: {
    alignItems: 'center',
    padding: 20,
  },
  vendorImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.25,
    borderColor: '#E1E1E1',
    borderRadius: 20,
    marginBottom: 12,
  },
  ratingText: {
    fontSize: 16,
    marginLeft: 5,
  },
  actionButtons: {
    flexDirection: 'row',
    marginTop: 16,
  },
  saveButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: MyTheme.colors.white,
    borderWidth: 1,
    borderColor: MyTheme.colors.brown_2,
    borderRadius: 20,
    marginRight: 5,
  },
  chatButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: MyTheme.colors.brown_2,
    borderRadius: 20,
    marginLeft: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  viewAllText: {
    color: MyTheme.colors.brown_2,
  },
  aboutSection: {
    paddingHorizontal: 20,
    marginVertical: 24,
  },
  servicesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  serviceTag: {
    backgroundColor: MyTheme.colors.white,
    borderWidth: 0.5,
    borderColor: MyTheme.colors.brown_2,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 20,
    marginRight: 4,
  },
  aboutText: {
    fontSize: 14,
    color: MyTheme.colors.neutral_1,
  },
  blogSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  blogCard: {
    padding: 8,
  },
  reviewsSection: {
    paddingHorizontal: 20,
  },
  ratingCount: {
    fontSize: 14,
    marginLeft: 5,
    color: MyTheme.colors.neutral_3,
  },
  reviewCard: {
    borderRadius: 10,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  reviewDate: {
    fontSize: 12,
    color: MyTheme.colors.neutral_3,
  },
  reviewRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  reviewText: {
    fontSize: 14,
    color: MyTheme.colors.neutral_1,
  },
  list: {
    flex: 1,
    backgroundColor: MyTheme.colors.white,
  },
});

export default VendorDetailPage;
