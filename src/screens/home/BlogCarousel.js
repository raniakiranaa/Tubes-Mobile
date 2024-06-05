import React, {useEffect, useState} from 'react';
import { FlatList, View, StyleSheet, ActivityIndicator } from 'react-native';
import { BigHomeCard } from '../../components/shares/Card';
import { useNavigation } from '@react-navigation/native';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import MyTheme from '../../config/theme';

const BlogCarousel = ({ orientation = 'horizontal' }) => {
  const navigation = useNavigation();
  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const blogCollection = collection(db, 'blog');
        const blogSnap = await getDocs(blogCollection);

        const data = blogSnap.docs.map(doc => {
          const blog = doc.data();
          const createdDate = new Date(blog.created_at.seconds * 1000);
          const options = { month: 'long', day: 'numeric', year: 'numeric' };
          const formattedDate = createdDate.toLocaleDateString('en-US', options);

          return {
            id: doc.id,
            img: blog.blog_img,
            title: blog.title,
            subtitle: blog.description,
            foot: formattedDate,
          };
        });
        setBlogData(data);
      } catch(error){
        console.error('Error fetching blog data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, []);

  const handleCardPress = (id) => {
    navigation.navigate('DetailBlog', { id });
  };

  if (loading) {
    return (
      <View style={styles.loadingOverlay}>
        <ActivityIndicator size="large" color={MyTheme.colors.neutral_2p} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.cardContainer}
        data={blogData}
        renderItem={({ item }) => (
          <BigHomeCard 
            image={item.img}
            title={item.title}
            subtitle={item.subtitle}
            foot={item.foot}
            onPress={() => handleCardPress(item.id)}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        horizontal={orientation === 'horizontal'}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  cardContainer: {
    paddingHorizontal: 10,
  },
  contentContainer: {
    // paddingHorizontal: 10,
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

export default BlogCarousel;
