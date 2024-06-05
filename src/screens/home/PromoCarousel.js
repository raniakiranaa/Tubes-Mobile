import React, { useState, useEffect } from 'react';
import { FlatList, View, StyleSheet, ActivityIndicator } from 'react-native';
import { CarouselCard } from '../../components/shares/Card';
import { useNavigation } from '@react-navigation/native';
import { db } from '../../firebase';  // Ensure you import the initialized Firestore
import { collection, onSnapshot } from 'firebase/firestore'; // Import Firestore methods
import MyTheme from '../../config/theme';

// const data = [
//   { id: 1, img: require('../../../assets/images/promo_1.png') },
//   { id: 2, img: require('../../../assets/images/promo_2.png') },
//   { id: 3, img: require('../../../assets/images/promo_3.png') },
// ];

const PromoCarousel = () => {
  const [promo, setPromo] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  const handleCardPress = (id) => {
    navigation.navigate('DetailPromo', { id });
  };

useEffect(() => {
    const subscriber = onSnapshot(collection(db, 'promo'), querySnapshot => {
      const promo = [];
      querySnapshot.forEach(documentSnapshot => {
        promo.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
        });
      });
      setPromo(promo);
      setLoading(false);
    });

    return () => {
      subscriber(); 
    };

}, []);

  if (loading) {
    return <ActivityIndicator color={MyTheme.colors.brown_2} />
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.cardContainer}
        data={promo}
        renderItem={({ item }) => (
          <CarouselCard 
            image={item.promo_img}
            // onPress={() => handleCardPress(item.promo_id)}
          />
        )}
        keyExtractor={(item) => item.key.toString()}
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
