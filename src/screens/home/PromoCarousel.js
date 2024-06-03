import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { CarouselCard } from '../../components/shares/Card';
import { useNavigation } from '@react-navigation/native';

const data = [
  { id: 1, img: require('../../../assets/images/promo_1.png') },
  { id: 2, img: require('../../../assets/images/promo_2.png') },
  { id: 3, img: require('../../../assets/images/promo_3.png') },
];

const PromoCarousel = () => {
  const navigation = useNavigation();

  const handleCardPress = (id) => {
    navigation.navigate('DetailPromo', { id });
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.cardContainer}
        data={data}
        renderItem={({ item }) => (
          <CarouselCard 
            image={item.img}
            onPress={() => handleCardPress(item.id)}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  cardContainer: {
    // paddingHorizontal: 10,
  },
  contentContainer: {
    // paddingHorizontal: 10,
  },
});

export default PromoCarousel;
