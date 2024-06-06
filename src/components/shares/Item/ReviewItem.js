import React from 'react';
import { View, Text, Image } from 'react-native';
import MyTheme from '../../../config/theme';

const ReviewItem = ({ name, date, score, comment }) => {
return (
    <View className='px-5 mb-3 radius-sm'>
        <View className='flex-row items-center justify-between'>
            <View className='flex-row items-center'>
                <Image source={{ uri: 'https://via.placeholder.com/50' }} style={{height: 30, width: 30, borderRadius: 25}} />
                <View className='flex-column items-start ml-3'>
                <Text style={[MyTheme.typography.medium.medium_2, {color:MyTheme.colors.black}]}>{name}</Text>
                <Text style={[MyTheme.typography.body.body_2, {color:MyTheme.colors.neutral_2p}]}>{date}</Text>
                </View>
            </View>
            <View style={styles.ratingContainer}>
                <Image source={require('../../../../assets/icons/star.png')} style={{height: 15, width: 15, marginLeft:8 }} />
                <Text style={{fontFamily: 'poppinsSemiBold', fontSize: 12, color: MyTheme.colors.black}} className='pl-0.5 pr-2 pt-0.5'>{score}</Text>
            </View>
        </View>
        <Text style={[MyTheme.typography.body.body_2, {color:MyTheme.colors.neutral_1, marginTop:8 }]}>
            {comment}
        </Text>
    </View>
    );
}

const styles = {
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 0.25,
        borderColor: '#E1E1E1',
        borderRadius: 20,
        marginBottom: 12,
    },
};

export default ReviewItem;