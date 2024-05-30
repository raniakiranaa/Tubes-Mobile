import { StyleSheet, View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import * as React from 'react';
import MyTheme from '../../../config/theme';

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
        <View style={styles.bigSearchContainer}>
            <Image source={image} style={styles.bigSearchImage} />
            <View style={styles.titleContainer}>
                <Text style={[styles.titleSearch, MyTheme.typography.subtitle.sub_3]}>{title}</Text>
                <View style={styles.ratingContainer}>
                    <Image style={styles.star} source={star}/>
                    <Text style={[styles.ratingText, MyTheme.typography.subtitle.body_3,]}>{rating}</Text>
                </View>
            </View>
            <Text style={[styles.detailsText, MyTheme.typography.subtitle.body_3]}>
                <Text style={styles.typeText}>{type}</Text>
                <Text> • {location}</Text>
                {price && <Text> • {price}</Text>}
            </Text>
        </View>
    );
}

export const BigVendorCard = ({ image, title, subtitle, pax }) => {
    return (
        <View style={styles.bigSearchContainer}>
            <Image source={image} style={styles.bigHomeImage} />
            <Text style={[styles.title, MyTheme.typography.subtitle.sub_3]}>{ title }</Text>
            <Text style={[styles.subtitle, MyTheme.typography.subtitle.body_3]}>
                <Text>{ subtitle }</Text>
                <Text style={styles.typeText}>        { pax }</Text>
            </Text>
        </View>
    );
}

export const SmallCard = ({ image, title, rating, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.smallContainer}>
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

