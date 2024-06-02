import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { BigHomeCard, CarouselCard } from '../../components/shares/Card';
import { useNavigation } from '@react-navigation/native';

const data = [
  { id: 1, img: require('../../../assets/images/blog_1.png'), title: "Local Pride : Traditional Weddings", subtitle:"Discover 10 recommendations for traditional weddings", foot:"31 Mar 2024"},
  { id: 2, img: require('../../../assets/images/blog_2.png'), title: "Do’s and Don’ts : Wedding Makeup", subtitle:"Tips and pitfalls to ensure perfect wedding makeup", foot:"16 Feb 2024" },
  { id: 3, img: require('../../../assets/images/blog_3.png'),  title: "Top 3 Honeymoon Destination", subtitle:"Explore our top 3 honeymoon picks!", foot:"14 Feb 2024" },
];

const BlogCarousel = ({ orientation = 'horizontal' }) => {
  const navigation = useNavigation();

  const handleCardPress = (id) => {
    navigation.navigate('DetailBlog', { id });
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.cardContainer}
        data={data}
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
});

export default BlogCarousel;
