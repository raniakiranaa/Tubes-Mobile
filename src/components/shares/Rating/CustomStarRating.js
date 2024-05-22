import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';

const CustomStarRating = ({ rating, onChange, starSize = 30 }) => {
  const stars = Array.from({ length: 5 }, (_, index) => index + 1);

  return (
    <View style={styles.starContainer}>
      {stars.map((star) => (
        <TouchableOpacity
          key={star}
          onPress={() => onChange(star)}
          activeOpacity={0.7}
        >
          <Image
            source={star <= rating ? require('../../../../assets/icons/Star-filled.png') : require('../../../../assets/icons/Star-unfilled.png')}
            style={{ width: starSize, height: starSize }}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  starContainer: {
    flexDirection: 'row',
  },
});

export default CustomStarRating;
