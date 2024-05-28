import { StyleSheet, View, Text, Image, Dimensions } from 'react-native';
import * as React from 'react';
import MyTheme from '../../../config/theme';
import { TextInputIcon } from '../../shares/TextInput/TextInputIcon';
import { SCREEN_WIDTH } from '../../../utils/deviceDimensions';

const { width: screenWidth } = Dimensions.get('window');
const aspectRatio = 288 / 193; // original dimensions
const containerWidth = screenWidth * 0.8; 
const containerHeight = containerWidth / aspectRatio;
const scalePadding = screenWidth * 0.03; 
const scaleFontSize = screenWidth * 0.04; 
const blockWidth = SCREEN_WIDTH * 0.87;

const checkBox = (props) => {
    <View>
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.75" y="0.75" width="13.5" height="13.5" rx="0.75" stroke={props.strokeClassName} stroke-width="1.5"/>
        </svg>
    </View>
}

export const ToDo = () => {
    return (
        <View style={styles.container}>
            <TextInputIcon
                // iconSource={}
                placeHolder = "Add To-Do"
                type=""
                mode=""
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: blockWidth,
        borderRadius: 10, 
        backgroundColor: MyTheme.colors.cream_2,
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 20,
        paddingTop: 20,
        paddingLeft: 10,
        paddingRight: 10
    },
    toDoContainer: {
        overflow: 'hidden',
        flexDirection: 'row', 
    }
});

