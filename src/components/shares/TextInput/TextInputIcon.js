import { StyleSheet, View, TextInput, Image, TouchableOpacity } from 'react-native';
import * as React from 'react';
import { SCREEN_WIDTH } from '../../../utils/deviceDimensions';
import { useState } from 'react';
import MyTheme from '../../../config/theme';

export const TextInputIcon = (props) => {
    const [isFocused, setIsFocused] = useState(false);
    const [ isPasswordVisible, setIsPasswordVisible ] = useState(false);

    const secureTextEntry = props.type === "password" && !isPasswordVisible;
    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <View style={[styles.container, {borderColor: isFocused ? MyTheme.colors.brown_3 : MyTheme.colors.neutral_4}]}>
            <Image 
                source={props.iconSource}
                style={styles.ImageStyle}
            />
            <TextInput 
                style={[styles.input, props.fontSize]}
                placeholder={props.placeholder}
                placeholderTextColor={MyTheme.colors.neutral_2p}
                onChangeText={props.onChangeText}
                selectionColor={MyTheme.colors.brown_3} 
                inputMode={props.mode}
                secureTextEntry={secureTextEntry}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
            {props.type === 'password' && (
                <TouchableOpacity onPress={togglePasswordVisibility}>
                    <Image 
                        source={isPasswordVisible? require('../../../../assets/icons/eye-off.png') : require('../../../../assets/icons/eye.png') }
                        style={styles.eyeIcon}
                    />
                </TouchableOpacity>
            )}

      </View>
    );
}

const styles = StyleSheet.create({
    container : {
        flexDirection: "row",
        alignItems: "center",
        height: 42,
        marginHorizontal: 10,
        backgroundColor: MyTheme.colors.white,
        borderWidth: 2,
        borderRadius: 8,
        borderColor: MyTheme.colors.neutral_4,
    },
    input : {
        flex: 1,
        marginRight: 12
    },
    ImageStyle : {
        padding: 10,
        height: 24,
        width: 24,
        marginHorizontal: 8
    },
    eyeIcon : {
        padding: 10,
        height: 24,
        width: 24,
        marginRight: 16
    }
  });