import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import MyTheme from '../../../config/theme';
import EyeIcon from '../../../../assets/icons/Eye/Eye';
import EyeOffIcon from '../../../../assets/icons/Eye/Eye-off';


export const TextInputIcon = (props) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const secureTextEntry = props.type === "password" && !isPasswordVisible;
    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const IconComponent = props.iconSource;

    return (
        <View style={[styles.container, { borderColor: isFocused ? MyTheme.colors.brown_3 : MyTheme.colors.neutral_4 }]}>
            {IconComponent && (
                <IconComponent {...props.iconProps} style={styles.iconStyle} />
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
                    <View style={styles.eyeIcon}>
                        {isPasswordVisible ? (
                            <EyeOffIcon width={20} height={20} />
                        ) : (
                            <EyeIcon width={20} height={20} />
                        )}
                    </View>
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        height: 42,
        backgroundColor: MyTheme.colors.white,
        borderWidth: 2,
        borderRadius: 8,
        borderColor: MyTheme.colors.neutral_4,
        paddingHorizontal: 8,
    },
    input: {
        flex: 1,
        marginRight: 12,
        marginLeft: 4,
    },
    iconStyle: {
        marginHorizontal: 8,
        width: 24,
        height: 24,
    },
    eyeIcon: {
        marginRight: 6,
    },
});
