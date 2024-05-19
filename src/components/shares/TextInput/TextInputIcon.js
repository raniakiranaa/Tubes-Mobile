import { StyleSheet, View, TextInput, Image } from 'react-native';
import * as React from 'react';
import { SCREEN_WIDTH } from '../../../utils/deviceDimensions';
import { useState } from 'react';
import MyTheme from '../../../config/theme';

export const TextInputIcon = (props) => {
    const [isFocused, setIsFocused] = useState(false);

    const secureTextEntry = props.type === "password" ? true : false;    

    return (
        <View style={[styles.container, {borderColor: isFocused ? MyTheme.colors.brown_3 : MyTheme.colors.neutral_4}]}>
            <Image 
                source={props.iconSource}
                style={styles.ImageStyle}
            />
            <TextInput 
                style={styles.input}
                placeholder={props.placeholder}
                placeholderTextColor={MyTheme.colors.neutral_2p}
                onChangeText={props.onChangeText}
                selectionColor={MyTheme.colors.brown_3} 
                inputMode={props.mode}
                secureTextEntry={secureTextEntry}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
      </View>
    );
}

const styles = StyleSheet.create({
    container : {
        flexDirection: "row",
        alignItems: "center",
        height: 42,
        width: SCREEN_WIDTH * 0.872,
        backgroundColor: MyTheme.colors.white,
        borderWidth: 2,
        borderRadius: 8,
        borderColor: MyTheme.colors.neutral_4,
    },
    input : {
        flex: 1,
        fontFamily:'poppinsRegular',
        fontSize:14,
    },
    ImageStyle : {
        padding: 10,
        height: 24,
        width: 24,
        marginHorizontal: 8
    }
  });