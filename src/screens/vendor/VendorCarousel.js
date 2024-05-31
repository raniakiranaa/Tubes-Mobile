import React from 'react';
import { FlatList, View, StyleSheet, Text } from 'react-native';
import { BigHomeCard, CarouselCard } from '../../components/shares/Card';
import { useNavigation } from '@react-navigation/native';
import MyTheme from '../../config/theme';
import { SmallCard } from '../../components/shares/Card';

const data = [
    {
      id: '1',
      image: 'https://via.placeholder.com/150',
      title: 'JW Marriott Surabaya',
      type: 'Venue',
      rating: '4.8',
    },
    {
      id: '2',
      image: 'https://via.placeholder.com/150',
      title: 'Vasa Hotel Surabaya',
      type: 'Venue',
      rating: '4.5',
    },
    {
      id: '3',
      image: 'https://via.placeholder.com/150',
      title: 'Novotel Surabaya',
      type: 'Venue',
      rating: '4.3',
    },
    {
      id: '4',
      image: 'https://via.placeholder.com/150',
      title: 'The Alana Surabaya',
      type: 'Venue',
      rating: '4.2',
    },
    {
      id: '5',
      image: 'https://via.placeholder.com/150',
      title: 'Sonokembang',
      type: 'Catering',
      rating: '5.0',
    },
    {
      id: '6',
      image: 'https://via.placeholder.com/150',
      title: 'Jatiroso',
      type: 'Catering',
      rating: '4.6',
    },
    {
      id: '7',
      image: 'https://via.placeholder.com/150',
      title: 'Katering Surya',
      type: 'Catering',
      rating: '4.5',
    }
  ];

const VendorCarousel = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={[MyTheme.typography.subtitle.sub_3, styles.catTitle]}>
        Venue
      </Text>
      <FlatList
        data={data.filter(item => item.type === 'Venue')}
        renderItem={({ item }) => <SmallCard image={{ uri: item.image }} title={item.title} rating={item.rating} />}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.cardsContainer}
        contentContainerStyle={{ paddingLeft: 20, paddingRight: 8 }}
      />

      <Text style={[MyTheme.typography.subtitle.sub_3, , styles.catTitle]}>
        Catering
      </Text>
      <FlatList
        data={data.filter(item => item.type === 'Catering')}
        renderItem={({ item }) => <SmallCard image={{ uri: item.image }} title={item.title} rating={item.rating} />}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.cardsContainer}
        contentContainerStyle={{ paddingLeft: 20, paddingRight: 8 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  cardsContainer: {
    paddingBottom: 20,
  },
  catTitle: {
    color: MyTheme.colors.brown_2,
    marginVertical: 5,
    paddingHorizontal: 10,
  }
});

export default VendorCarousel;
