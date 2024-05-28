import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { SCREEN_WIDTH } from '../../../utils/deviceDimensions';
import MyTheme from '../../../config/theme';

export const CustomButton = (props) => {
    const blockWidth = SCREEN_WIDTH * 0.87;
    const largeWidth = SCREEN_WIDTH * 0.4;
    const smallWidth = SCREEN_WIDTH * 0.25;

    const getButtonStyle = () => {
        switch (props.size) {
            case "block-round":
                return { width: blockWidth, height: 44, borderRadius: 48 };
            case "block-square":
                return { width: blockWidth, height: 44, borderRadius: 10 };
            case "large-round":
                return { width: largeWidth, height: 44, borderRadius: 48 };
            case "large-square":
                return { width: largeWidth, height: 44, borderRadius: 10 };
            case "small-square":
                return { width: smallWidth, height: 37, borderRadius: 10 };
            default:
                return { width: smallWidth, height: 37, borderRadius: 48 };
        }
    };

    const mode = props.type === "outline" ? "outlined" : "contained";
    const buttonStyles = [
        getButtonStyle(),
        mode === "outlined" ? {
            borderWidth: 2,
            borderColor: props.outlineColor || MyTheme.colors.brown_2
        } : {},
        { backgroundColor: props.buttonColor }
    ];

    return (
        <View style={styles.buttonContainer}>
            <Button
                icon={props.iconSource ? () => <props.iconSource {...props.iconProps} /> : null}
                mode={mode}
                style={buttonStyles}
                labelStyle={[styles.textContainer, { color: props.textColor, fontFamily: 'poppinsSemiBold', fontSize: props.fontSize }]}
                onPress={props.onPress}
            >
                {props.title}
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    textContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        textAlign: 'center'
    }
});
