import { StyleSheet, View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import * as React from 'react';
import MyTheme from '../../../config/theme';
import { shadow } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';


const { width: screenWidth } = Dimensions.get('window');
const aspectRatio = 288 / 193; // original dimensions
const containerWidth = screenWidth * 0.8; 
const containerHeight = containerWidth / aspectRatio;

const aspectRatioSearch = 330 / 182;
const containerHeightSearch = containerWidth / aspectRatioSearch;

const aspectRatioSmall = 175 / 182;
const containerHeightSmall = containerWidth / aspectRatioSmall;

const scalePadding = screenWidth * 0.03; 
const scaleFontSize = screenWidth * 0.04; 
const star = require('../../../../assets/icons/star.png');

export const CarouselCard = ({ image,onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.carouselContainer}>
            <Image source={ image } style={styles.carouselImage} />
        </TouchableOpacity>
    );
}

export const BigHomeCard = ({ image, title, subtitle, foot, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.bigHomeContainer}>
            <Image source={image} style={styles.bigHomeImage} />
            <Text style={[styles.title, MyTheme.typography.subtitle.sub_3]}
                numberOfLines={1}
                ellipsizeMode='tail'
            >{ title }</Text>
            <Text style={[styles.subtitle, MyTheme.typography.subtitle.body_3]}
                numberOfLines={1}
                ellipsizeMode='tail'
            >{ subtitle }</Text>
            <Text style={[styles.foot, MyTheme.typography.subtitle.body_3]}>{ foot }</Text>
        </TouchableOpacity>
    );
}

export const BigSearchCard = ({ image, title, type, location, price, rating }) => {
    return (
        <View className='flex-column items-center rounded-xl bg-white' style={[MyTheme.shadows.shadow_1, {width: 330, height: 182}]}>
            <Image source={image} className='h-2/3 w-full rounded-t-lg' />
            <View className='flex-row justify-between items-center px-2 pt-2 pb-0.5'>
                <Text style={[MyTheme.typography.subtitle.sub_3]} className='text-left self-stretch flex-1'>{title}</Text>
                <View className='flex-row items-center border rounded-full py-0.5 px-1.5' style={{borderColor: MyTheme.colors.neutral_300}}>
                    <Image className='h-3 w-3' source={star} />
                    {rating % 1 === 0 ? <Text style={[MyTheme.typography.body.body_3, {color: MyTheme.colors.black}]}> {rating}.0</Text> : <Text style={[MyTheme.typography.body.body_3, {color: MyTheme.colors.black}]}> {rating}</Text>}
                </View>
            </View>
            <View className='px-2 mb-3 text-left self-stretch'>
                <Text style={[MyTheme.typography.body.body_3]}>
                    <Text style={{color: MyTheme.colors.pink_2}}>{type}</Text>
                    <Text> • {location}</Text>
                    {price && <Text> • {price}</Text>}
                </Text>
            </View>
        </View>
    );
}

export const BigVendorCard = ({ image, title, subtitle, pax }) => {
    const navigation = useNavigation();
    const handlePress = () => {
        navigation.navigate('ProductDetail');
    }
    return (
        <TouchableOpacity onPress={handlePress}>
            <View className='h-52 w-72 flex-column items-center border-lg bg-white mr-3' style={MyTheme.shadows.shadow_1}>
                <Image source={image} className='h-2/3 w-full rounded-t-lg' />
                <Text style={[MyTheme.typography.subtitle.sub_3]} className='text-left self-stretch px-2 pt-2 pb-1'>{ title }</Text>
                <Text style={[MyTheme.typography.body.body_3, { color: MyTheme.colors.brown_3 }]} className='text-left self-stretch px-2 mb-3'>
                    <Text>{ subtitle }</Text>
                    <Text style={{color:MyTheme.colors.pink_2}}>        { pax }</Text>
                </Text>
            </View>
        </TouchableOpacity>
    );
}

export const SmallCard = ({ image, title, rating }) => {
    const navigation = useNavigation();
    const handleCardPress = () => {
        navigation.navigate('VendorDetail');
      };

    return (
        <TouchableOpacity onPress={handleCardPress} style={styles.smallContainer}>
            <Image source={image} style={styles.bigSearchImage} />
            <Text style={[styles.titleSmall, MyTheme.typography.subtitle.sub_3]}
                numberOfLines={1}
                ellipsizeMode='tail'
            >{title}</Text>
            <View style={styles.ratingSmallContainer}>
                <Image style={styles.star} source={star}/>
                <Text style={[styles.ratingText, MyTheme.typography.subtitle.body_3,]}>{rating}</Text>
            </View>
        </TouchableOpacity>
    );
}

// export const SmallCard = ({ image, title, rating }) => {
//     const navigation = useNavigation();
//     const handlePress = () => {
//         navigation.navigate('VendorDetail');
//     }
//     return (
//         <TouchableOpacity onPress={handlePress}>
//             <View className='h-44 w-44 flex-column items-left border-lg bg-white mr-3' style={ MyTheme.shadows.shadow_1}>
//                 <Image source={image} className='h-2/3 w-full rounded-t-lg' />
//                 <Text style={[MyTheme.typography.subtitle.sub_3]} className='text-left self-stretch px-2 pt-2 pb-0.5'>{title}</Text>
//                 <View className='w-11 flex-row items-center border rounded-full py-0.5 px-1.5 mx-2' style={{borderColor: MyTheme.colors.neutral_300}}>
//                     <Image className='h-3 w-3' source={star}/>
//                     <Text style={[MyTheme.typography.body.body_3, {color: MyTheme.colors.black}]} className='ml-0.5' >{rating}</Text>
//                 </View>
//             </View>
//         </TouchableOpacity>
//     );
// }

const styles = StyleSheet.create({
    carouselContainer: {
        width: 375,
        height: 90,
        borderRadius: 10, 
        overflow: 'hidden',
        marginRight: 10,
    },
    carouselImage: {
        width: '100%',
        height: '100%',
        // marginHorizontal: 10,
    },
    bigHomeContainer: {
        width: containerWidth,
        height: containerHeight,
        flexDirection: 'column',
        alignItems: 'center',
        ...MyTheme.shadows.shadow_1,
        borderRadius: 10,
        backgroundColor: MyTheme.colors.white,
        paddingBottom: 5,
        marginRight: 20,
    },
    bigHomeImage: {
        width: '100%',
        height: '65%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    title: {
        textAlign: 'left',
        alignSelf: 'stretch',
        paddingHorizontal: scalePadding,
        paddingTop: scalePadding * 0.8, 
        fontSize: scaleFontSize * 1.4,
        overflow: 'hidden',
    },
    subtitle: {
        textAlign: 'left',
        alignSelf: 'stretch',
        paddingLeft: scalePadding,
        paddingTop: scalePadding * 0.4,
        color: MyTheme.colors.brown_3,
        fontSize: scaleFontSize * 0.7, 
    },
    foot: {
        textAlign: 'left',
        alignSelf: 'stretch',
        paddingLeft: scalePadding,
        paddingTop: scalePadding * 0.4,
        color: MyTheme.colors.neutral_2p,
        fontSize: scaleFontSize * 0.7,
    },
    bigSearchContainer: {
        width: containerWidth,
        height: containerHeightSearch,
        flexDirection: 'column',
        alignItems: 'center',
        ...MyTheme.shadows.shadow_1,
        borderRadius: 10,
        backgroundColor: MyTheme.colors.white
    },
    bigSearchImage: {
        width: '100%',
        height: '68%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: scalePadding,
    },
    titleSearch: {
        textAlign: 'left',
        alignSelf: 'stretch',
        paddingLeft: scalePadding,
        paddingTop: scalePadding * 0.8, 
        fontSize: scaleFontSize * 1.4,
        flex: 1,
    },
    star: {
        width: 11,
        height: 11
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 0.22,
        borderColor: MyTheme.colors.neutral_300,
        paddingTop: scalePadding * 0.2,
        paddingBottom: scalePadding * 0.2,
        paddingLeft: scalePadding * 0.4,
        paddingRight: scalePadding * 0.4,
        borderRadius: 12,
    },
    ratingText: {
        paddingLeft: scalePadding * 0.4,
        color: MyTheme.colors.black,
    },
    detailsText: {
        textAlign: 'left',
        alignSelf: 'stretch',
        paddingLeft: scalePadding,
        paddingTop: scalePadding * 0.2,
        color: MyTheme.colors.black,
        fontSize: scaleFontSize * 0.7, 
    },
    typeText: {
        color: MyTheme.colors.pink_2
    },
    smallContainer: {
        width: containerWidth * 0.6,
        height: containerHeightSmall * 0.6,
        flexDirection: 'column',
        alignItems: 'left',
        ...MyTheme.shadows.shadow_1,
        borderRadius: 10,
        backgroundColor: MyTheme.colors.white,
        marginRight: 20,
    },
    ratingSmallContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 0.4,
        borderColor: MyTheme.colors.neutral_300,
        paddingVertical: scalePadding * 0.2,  // Hanya padding vertikal
        paddingHorizontal: scalePadding * 0.4,
        borderRadius: 12,
        marginHorizontal: scalePadding,
        alignSelf: 'flex-start',  // Menyesuaikan lebar container berdasarkan konten
        width: 'auto',
    },
    titleSmall: {
        textAlign: 'left',
        alignSelf: 'stretch',
        paddingLeft: scalePadding,
        paddingTop: scalePadding * 0.8, 
        paddingBottom: scalePadding * 0.2,
        fontSize: scaleFontSize * 1.4,
        overflow: 'hidden',
    },
});

