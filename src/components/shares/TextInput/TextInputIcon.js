import { StyleSheet, Image, View } from 'react-native';
import * as React from 'react';
import { Icon, TextInput } from 'react-native-paper';
import { SCREEN_WIDTH } from '../../../utils/deviceDimensions';
import { useState } from 'react';
import MyTheme from '../../../config/theme';
// import { transparent } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

export const TextInputIcon = (props) => {
    const primaryWidth = SCREEN_WIDTH * 0.872;
    const largeWidth = SCREEN_WIDTH * 0.3;

    const [text, setText] = useState("");

    return (
        <View style={styles.container}>
            {/* <Image source={props.iconSource} style={styles.ImageStyle}/> */}
            <TextInput 
                style={styles.input}

                placeholder={props.placeholder}
                placeholderTextColor={MyTheme.colors.neutral_2p}
                // underlineColorAndroid={transparent}
                mode="outlined" 

                onChangeText={(text) => {
                    setText(text)
                    // setErrors(errors => ({...errors, text: ""}))
                }}
                value={text}
            />
      </View>
    );
}

const styles = StyleSheet.create({
    input : {
        height: 42,
        width: SCREEN_WIDTH * 0.872,
        backgroundColor: MyTheme.colors.white,
        borderWidth: 1,
        borderRadius: 8,
        borderTopStartRadius: 8,
        borderTopEndRadius: 8,
        borderColor: MyTheme.colors.neutral_4,
        // fontFamily: "Popp"
    }
  });