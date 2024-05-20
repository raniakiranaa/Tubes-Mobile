import { Text, StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import * as React from 'react';
import { Button } from 'react-native-paper';
import { SCREEN_WIDTH } from '../../../utils/deviceDimensions';
import MyTheme from '../../../config/theme';

export const CustomButton = (props) => {
    const blockWidth = SCREEN_WIDTH * 0.872;
    const largeWidth = SCREEN_WIDTH * 0.3;

    const getButtonStyle = () => {
        switch (props.size) {
            case "block-round":
                return {width: blockWidth, height: 44, borderRadius: 48};
            case "block-square":
                return {width: blockWidth, height: 44, borderRadius: 10};
            case "large-round":
                return {width: largeWidth, height: 44, borderRadius: 48};
            case "large-square":
                return {width: largeWidth, height: 44, borderRadius: 10};
            case "small-square":
                return {width: 12, height: 37, borderRadius: 10};
            default:
                return {width: 12, height: 37, borderRadius: 48};
        }
    }
    
    const mode = props.type === "outline" ? "outlined" : "contained";
    const buttonStyles = [
        getButtonStyle(),
        mode === "outlined" ? {
            borderWidth: 2,
            borderColor: props.outlineColor || MyTheme.colors.brown_2
        } : {},
        {backgroundColor: props.buttonColor}
    ]

    return(
        <View style={styles.buttonContainer}>
            <Button 
                icon={ props.iconSource } 
                mode={mode}
                style={buttonStyles}
                labelStyle={{color: props.textColor}}
                onPress={props.onPress}    
            >
                <Text style={{ fontFamily: 'poppinsSemiBold', fontSize: props.fontSize }}>{ props.title }</Text>
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    }
  });