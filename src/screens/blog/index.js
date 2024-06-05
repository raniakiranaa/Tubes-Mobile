import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import BlogCarousel from '../home/BlogCarousel';

const Blog = () => {
  // const [loading, setLoading] = useState(true);

  // const handleLoadingChange = (isLoading) => {
  //   setLoading(isLoading);
  // };

  // if (loading) {
  //   return (
  //     <View style={styles.loadingContainer}>
  //       <ActivityIndicator size="large" color="#0000ff" />
  //     </View>
  //   );
  // }

  const data = [{ key: 'carousel' }];

  const renderItem = ({ item }) => {
    if (item.key === 'carousel') {
      return (
        <View style={styles.carouselContainer}>
          <BlogCarousel 
            orientation='vertical' 
            // onLoadingChange={handleLoadingChange}
          />
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Blog;
