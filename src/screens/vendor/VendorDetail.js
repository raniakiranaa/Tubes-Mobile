import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, FlatList, Platform, ActivityIndicator } from 'react-native';
import MyTheme from '../../config/theme';
import { BigVendorCard } from '../../components/shares/Card';
import BlogItem from '../../components/shares/Item/BlogItem';
import ReviewItem from '../../components/shares/Item/ReviewItem';
import ChatIcon from '../../../assets/icons/Vendor-chat.svg';
import SaveIcon from '../../../assets/icons/Vendor-save.svg';
import { db } from '../../firebase';
import { collection, getDoc, getDocs, doc, query, where } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const { width: screenWidth } = Dimensions.get('window');

const VendorDetailPage = ({ route }) => {  
  const { id } = route.params;
  const vendorID = `${id}`

  const navigation = useNavigation();

  const [loading, setLoading] = useState(true);
  const [vendorData, setVendorData] = useState([]);
  const [blogData, setBlogData] = useState([]);
  const [catalogData, setCatalogData] = useState([]);
  const [reviewData, setReviewData] = useState([]);

  const getVendorData = async () => {
    setLoading(true);
    try {
      const docRef = doc(db, 'vendor', vendorID);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        setVendorData(docSnap.data());

        const catalogRef = collection(db, 'vendor', vendorID, 'catalog');
        const catalogSnap = await getDocs(catalogRef); // Use getDocs to get all documents in the collection

        if (catalogSnap.empty) {
          console.log('No matching documents.');
          return [];
        }

        const catalogData = catalogSnap.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCatalogData(catalogData);

        const reviewRef = collection(db, 'vendor', vendorID, 'review');
        const reviewSnap = await getDocs(reviewRef); // Use getDocs to get all documents in the collection

        if (reviewSnap.empty) {
          console.log('No matching documents.');
          return [];
        }

        const reviewData = reviewSnap.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReviewData(reviewData);

      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Error getting document: ', error);
    }
    setLoading(false);
  };

  const getBlogDataByVendor = async () => {
    try {
      const vendorRef = doc(db, 'vendor', vendorID);
      const vendorSnap = await getDoc(vendorRef);

      if (!vendorSnap.exists()) {
        console.log('No such document!');
        return [];
      }

      const blogRef = collection(db, 'blog');
      const q = query(blogRef, where('vendorID', '==', vendorRef));
      const blogSnap = await getDocs(q);

      if (blogSnap.empty) {
        console.log('No matching documents.');
        return [];
      }

      const blogData = blogSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBlogData(blogData);

    } catch (error) {
      console.error('Error getting documents: ', error);
    }
  };

  useEffect(() => {
    getVendorData();
    getBlogDataByVendor();
  }, [id]);

  const totalRating = reviewData.reduce((acc, review) => acc + parseFloat(review.rating), 0);
  const averageRating = totalRating / reviewData.length;
  const totalReviews = reviewData.length;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value);
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const renderHeader = () => {
    return (
      <View className='mt-12'>
        <View style={styles.vendorInfo}>
          <Image source={{ uri: vendorData.image }} style={styles.vendorImage} />
          <Text style={[MyTheme.typography.subtitle.sub_2, { color: MyTheme.colors.black }]}>{vendorData.name}</Text>
          <Text style={[MyTheme.typography.body.body_2, { color: MyTheme.colors.pink_2 }]} className='mb-2'>
            {vendorData.category[0]}<Text style={{ color: MyTheme.colors.black }}> • {vendorData.location}</Text>
          </Text>
          <View style={styles.ratingContainer}>
            <Image source={require('../../../assets/icons/star.png')} style={{ height: 11, width: 11, marginLeft: 8 }} />
            <Text style={MyTheme.typography.body.body_3} className='pl-0.5 pr-2 pt-0.5'>{vendorData.rating}</Text>
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
          data={catalogData}
          renderItem={({ item }) => (
            <BigVendorCard
              image={{ uri: item.catalog_img }}
              title={item.name}
              subtitle={formatCurrency(item.price)}
              pax={item.pax + ' pax'}
              onPress={() => navigation.navigate('ProductDetail', { id: item.catalog_id, vendor_name: vendorData.name, vendor_id: vendorID, vendor_image: vendorData.image})}
            />
          )}
          keyExtractor={item => item.catalog_id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 20, paddingRight: 8 }}
        />
        <View style={styles.aboutSection}>
          <Text style={[MyTheme.typography.subtitle.sub_2, { color: MyTheme.colors.neutral_1 }]}>About</Text>
          <Text style={[MyTheme.typography.medium.medium_1, { color: MyTheme.colors.brown_2 }]} className='mb-2.5'>Services</Text>
          <View style={styles.servicesContainer}>
            {vendorData.category?.map((service, index) => (
              <View key={index} style={styles.serviceTag}>
                <Text style={[MyTheme.typography.body.body_3, { color: MyTheme.colors.brown_2 }]}>{service}</Text>
              </View>
            ))}
          </View>
          <Text style={[MyTheme.typography.body.body_2, { color: MyTheme.colors.neutral_1 }]}>
            {vendorData.about}
          </Text>
        </View>
        <View style={styles.blogSection}>
          <Text style={[MyTheme.typography.medium.medium_1, { color: MyTheme.colors.brown_2 }]} className='mb-2.5 px-5'>Blog</Text>
          <FlatList
              horizontal
              data={blogData}
              renderItem={({ item }) => (
                <BlogItem
                  image={item.blog_img}
                  title={item.title}
                  description={item.description}
                  date={formatDate(item.created_at)}
                  vendor_name={vendorData.name}
                  onPress={() => navigation.navigate('DetailBlog', { id: item.blog_id })}
                />
              )}
              keyExtractor={item => item.blog_id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingLeft: 20, paddingRight: 8 }}
            />
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
  };

  if (loading) {
    return (
      <View style={styles.loadingOverlay}>
        <ActivityIndicator size="large" color={MyTheme.colors.brown_2} />
      </View>
    );
  }

  return (
    <FlatList
      style={styles.list}
      ListHeaderComponent={renderHeader}
      data={reviewData}
      renderItem={({ item }) => <ReviewItem name={item.name} date={formatDate(item.created_at)} score={item.rating} comment={item.comment} />}
      keyExtractor={item => item.review_id}
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
    marginBottom: 24,
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

export default VendorDetailPage;
