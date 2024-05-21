import { StyleSheet, View, Text, Image, Dimensions } from 'react-native';
import * as React from 'react';
import MyTheme from '../../../config/theme';

const { width: screenWidth } = Dimensions.get('window');
const aspectRatio = 288 / 193; // original dimensions
const containerWidth = screenWidth * 0.8; 
const containerHeight = containerWidth / aspectRatio;

const aspectRatioSearch = 330 / 182;
const containerHeightSearch = containerWidth / aspectRatioSearch;

const scalePadding = screenWidth * 0.03; 
const scaleFontSize = screenWidth * 0.04; 


export const CarouselCard = ({ image }) => {
    return (
        <View style={styles.carouselContainer}>
            <Image source={ image } style={styles.carouselImage} />
        </View>
    );
}

export const BigHomeCard = ({ image, title, subtitle, foot }) => {
    return (
        <View style={styles.bigHomeContainer}>
            <Image source={image} style={styles.bigHomeImage} />
            <Text style={[styles.title, MyTheme.typography.subtitle.sub_3]}>{ title }</Text>
            <Text style={[styles.subtitle, MyTheme.typography.subtitle.body_3]}>{ subtitle }</Text>
            <Text style={[styles.foot, MyTheme.typography.subtitle.body_3]}>{ foot }</Text>
        </View>
    );
}

export const BigSearchCard = ({ image, title, type, location, price }) => {
    return (
        <View style={styles.bigSearchContainer}>
            <Image source={image} style={styles.bigSearchImage} />
            <Text style={[styles.title,MyTheme.typography.subtitle.sub_3]}>{title}</Text>
            <Text style={[styles.detailsText, MyTheme.typography.subtitle.body_3]}>
                <Text style={styles.typeText}>{type}</Text>
                <Text> • {location} • {price}</Text>
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    carouselContainer: {
        width: 375,
        height: 90,
        borderRadius: 10, 
        overflow: 'hidden',
    },
    carouselImage: {
        width: '100%',
        height: '100%',
    },
    bigHomeContainer: {
        width: containerWidth,
        height: containerHeight,
        flexDirection: 'column',
        alignItems: 'center',
        ...MyTheme.shadows.shadow_1,
        borderRadius: 10,
        backgroundColor: MyTheme.colors.white
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
        paddingLeft: scalePadding,
        paddingTop: scalePadding * 0.8, 
        fontSize: scaleFontSize * 1.4,
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
    detailsText: {
        textAlign: 'left',
        alignSelf: 'stretch',
        paddingLeft: scalePadding,
        paddingTop: scalePadding * 0.4,
        color: MyTheme.colors.black,
        fontSize: scaleFontSize * 0.7, 
    },
    typeText: {
        color: MyTheme.colors.pink_2
    },
});

