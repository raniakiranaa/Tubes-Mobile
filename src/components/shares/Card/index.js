import { StyleSheet, View, Text, Image, Dimensions } from 'react-native';
import * as React from 'react';
import MyTheme from '../../../config/theme';
import { shadow } from 'react-native-paper';

const star = require('../../../../assets/icons/star.png');

export const CarouselCard = ({ image }) => {
    return (
        <View className='h-24 w-96 rounded-lg overflow-hidden'>
            <Image source={ image } className='h-full w-full' />
        </View>
    );
}

export const BigHomeCard = ({ image, title, subtitle, foot }) => {
    return (
        <View className='h-52 w-72 flex-column items-center border-lg bg-white' style={{shadow: MyTheme.shadows.shadow_1}}>
            <Image source={image} className='h-2/3 w-full rounded-t-lg' />
            <Text style={[MyTheme.typography.subtitle.sub_3]} className='text-left self-stretch px-2 pt-2'>{ title }</Text>
            <Text style={[MyTheme.typography.body.body_3, { color: MyTheme.colors.brown_3 }]} className='text-left self-stretch px-2 mb-1'>{ subtitle }</Text>
            <Text style={[MyTheme.typography.body.body_3, { color: MyTheme.colors.neutral_2p }]} className='text-left self-stretch px-2 mb-3'>{ foot }</Text>
        </View>
    );
}

export const BigSearchCard = ({ image, title, type, location, price, rating }) => {
    return (
        <View className='h-52 w-72 flex-column items-center border-lg bg-white' style={{shadow: MyTheme.shadows.shadow_1}}>
            <Image source={image} className='h-2/3 w-full rounded-t-lg' />
            <View className='flex-row justify-between items-center px-2 pt-2 pb-0.5'>
                <Text style={[MyTheme.typography.subtitle.sub_3]} className='text-left self-stretch flex-1'>{title}</Text>
                <View className='flex-row items-center border rounded-sm py-0.5 px-1' style={{borderColor: MyTheme.colors.neutral_300}}>
                    <Image className='h-3 w-3' source={star} />
                    <Text style={[MyTheme.typography.body.body_3, {color: MyTheme.colors.black}]} className='ml-0.5' >{rating}</Text>
                </View>
            </View>
            <View className='px-2 mb-3'>
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
    return (
        <View className='h-52 w-72 flex-column items-center border-lg bg-white mr-3' style={{shadow: MyTheme.shadows.shadow_1}}>
            <Image source={image} className='h-2/3 w-full rounded-t-lg' />
            <Text style={[MyTheme.typography.subtitle.sub_3]} className='text-left self-stretch px-2 pt-2 pb-1'>{ title }</Text>
            <Text style={[MyTheme.typography.body.body_3, { color: MyTheme.colors.brown_3 }]} className='text-left self-stretch px-2 mb-3'>
                <Text>{ subtitle }</Text>
                <Text style={{color:MyTheme.colors.pink_2}}>        { pax }</Text>
            </Text>
        </View>
    );
}

export const SmallCard = ({ image, title, rating }) => {
    return (
        <View className='h-44 w-44 flex-column items-left border-lg bg-white mr-3' style={{shadow: MyTheme.shadows.shadow_1}}>
            <Image source={image} className='h-2/3 w-full rounded-t-lg' />
            <Text style={[MyTheme.typography.subtitle.sub_3]} className='text-left self-stretch px-2 pt-2 pb-0.5'>{title}</Text>
            <View className='flex-row items-center border rounded-full py-0.5 px-2 mx-2' style={{borderColor: MyTheme.colors.neutral_300}}>
                <Image className='h-3 w-3' source={star}/>
                <Text style={[MyTheme.typography.body.body_3, {color: MyTheme.colors.black}]} className='ml-0.5' >{rating}</Text>
            </View>
        </View>
    );
}

// const styles = StyleSheet.create({
    // carouselContainer: {
    //     width: 375,
    //     height: 90,
    //     borderRadius: 10, 
    //     overflow: 'hidden',
    // },
    // carouselImage: {
    //     width: '100%',
    //     height: '100%',
    // },
    // bigHomeContainer: {
    //     width: containerWidth,
    //     height: containerHeight,
    //     flexDirection: 'column',
    //     alignItems: 'center',
    //     ...MyTheme.shadows.shadow_1,
    //     borderRadius: 10,
    //     backgroundColor: MyTheme.colors.white
    // },
    // bigHomeImage: {
    //     width: '100%',
    //     height: '65%',
    //     borderTopLeftRadius: 10,
    //     borderTopRightRadius: 10,
    // },
    // title: {
    //     textAlign: 'left',
    //     alignSelf: 'stretch',
    //     paddingLeft: scalePadding,
    //     paddingTop: scalePadding * 0.8, 
    //     fontSize: scaleFontSize * 1.4,
    // },
    // subtitle: {
    //     textAlign: 'left',
    //     alignSelf: 'stretch',
    //     paddingLeft: scalePadding,
    //     paddingTop: scalePadding * 0.4,
    //     color: MyTheme.colors.brown_3,
    //     fontSize: scaleFontSize * 0.7, 
    // },
    // foot: {
    //     textAlign: 'left',
    //     alignSelf: 'stretch',
    //     paddingLeft: scalePadding,
    //     paddingTop: scalePadding * 0.4,
    //     color: MyTheme.colors.neutral_2p,
    //     fontSize: scaleFontSize * 0.7,
    // },
    // bigSearchContainer: {
    //     width: containerWidth,
    //     height: containerHeightSearch,
    //     flexDirection: 'column',
    //     alignItems: 'center',
    //     ...MyTheme.shadows.shadow_1,
    //     borderRadius: 10,
    //     backgroundColor: MyTheme.colors.white
    // },
    // bigSearchImage: {
    //     width: '100%',
    //     height: '68%',
    //     borderTopLeftRadius: 10,
    //     borderTopRightRadius: 10,
    // },
    // titleContainer: {
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    //     alignItems: 'center',
    //     paddingRight: scalePadding,
    // },
    // titleSearch: {
    //     textAlign: 'left',
    //     alignSelf: 'stretch',
    //     paddingLeft: scalePadding,
    //     paddingTop: scalePadding * 0.8, 
    //     fontSize: scaleFontSize * 1.4,
    //     flex: 1,
    // },
    // star: {
    //     width: 11,
    //     height: 11
    // },
    // ratingContainer: {
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     borderWidth: 0.22,
    //     borderColor: MyTheme.colors.neutral_300,
    //     paddingTop: scalePadding * 0.2,
    //     paddingBottom: scalePadding * 0.2,
    //     paddingLeft: scalePadding * 0.4,
    //     paddingRight: scalePadding * 0.4,
    //     borderRadius: 12,
    // },
    // ratingText: {
    //     paddingLeft: scalePadding * 0.4,
    //     color: MyTheme.colors.black,
    // },
    // detailsText: {
    //     textAlign: 'left',
    //     alignSelf: 'stretch',
    //     paddingLeft: scalePadding,
    //     paddingTop: scalePadding * 0.2,
    //     color: MyTheme.colors.black,
    //     fontSize: scaleFontSize * 0.7, 
    // },
    // typeText: {
    //     color: MyTheme.colors.pink_2
    // },
    // smallContainer: {
    //     width: containerWidth,
    //     height: containerHeightSmall,
    //     flexDirection: 'column',
    //     alignItems: 'left',
    //     ...MyTheme.shadows.shadow_1,
    //     borderRadius: 10,
    //     backgroundColor: MyTheme.colors.white
    // },
    // ratingSmallContainer: {
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     borderWidth: 0.22,
    //     borderColor: MyTheme.colors.neutral_300,
    //     paddingTop: scalePadding * 0.2,
    //     paddingBottom: scalePadding * 0.2,
    //     paddingLeft: scalePadding * 0.4,
    //     paddingRight: scalePadding * 0.4,
    //     borderRadius: 12,
    //     marginLeft: scalePadding,
    // },
    // titleSmall: {
    //     textAlign: 'left',
    //     alignSelf: 'stretch',
    //     paddingLeft: scalePadding,
    //     paddingTop: scalePadding * 0.8, 
    //     paddingBottom: scalePadding * 0.2,
    //     fontSize: scaleFontSize * 1.4,
    // },
// });

