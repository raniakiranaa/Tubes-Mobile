import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import BlogCarousel from '../home/BlogCarousel';

const Blog = () => {
  const data = [
    { key: 'carousel' },
  ];

  const renderItem = ({ item }) => {
    if (item.key === 'carousel') {
      return (
        <View style={styles.carouselContainer}>
          <BlogCarousel orientation='vertical' />
        </View>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Blog;
