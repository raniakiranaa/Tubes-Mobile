import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import * as React from 'react';
import { useState } from 'react';
import MyTheme from '../../../config/theme';
import EyeIcon from '../../../../assets/icons/eye.svg';
import EyeOffIcon from '../../../../assets/icons/eye-off.svg';

export const TextInputIcon = (props) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const secureTextEntry = props.type === "password" && !isPasswordVisible;
    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const IconComponent = props.iconComponent;

    return (
        <View style={[styles.container, { borderColor: isFocused ? MyTheme.colors.brown_3 : MyTheme.colors.neutral_4 }]}>
            {IconComponent && (
                <IconComponent style={styles.iconStyle} />
            )}
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
                    {isPasswordVisible ? (
                        <EyeOffIcon width={24} height={24} style={styles.eyeIcon} />
                    ) : (
                        <EyeIcon width={24} height={24} style={styles.eyeIcon} />
                    )}
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
    iconStyle : {
        marginHorizontal: 8,
        width: 24,
        height: 24
    },
    eyeIcon : {
        marginRight: 16
    }
});
