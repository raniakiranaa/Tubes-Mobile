import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import MyTheme from '../../../config/theme';
import CheckBox from '../../../../assets/icons/myplan/Checkbox.js'; 
import Checked from '../../../../assets/icons/myplan/Checked.js';

export const ToDoInput = (props) => {
    const [inputValue, setInputValue] = useState('');
    const [inputHeight, setInputHeight] = useState(42);
    const [isIconPressed, setIsIconPressed] = useState(false);

    const handleContentSizeChange = (e) => {
        const newHeight = e.nativeEvent.contentSize.height + 10;
        setInputHeight(newHeight);
    };

    const handleIconPress = () => {
        setIsIconPressed(!isIconPressed);
    };

    const IconComponent = isIconPressed ? () => <Checked /> : () => <CheckBox /> ;

    const containerStyle = {
        flexDirection: "row",
        alignItems: "center",
        height: Math.max(42, inputHeight),
        marginHorizontal: 10,
        backgroundColor: MyTheme.colors.white,
        ...MyTheme.shadows.shadow_1,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginBottom: 10,
    };

    return (
        <View style={containerStyle}>
            <TouchableOpacity onPress={handleIconPress}>
                <IconComponent />
            </TouchableOpacity>
            <TextInput
                style={styles.input}
                placeholder="Add to-do"
                placeholderTextColor={MyTheme.colors.neutral_2p}
                value={inputValue}
                onChangeText={(text) => setInputValue(text)}
                onContentSizeChange={handleContentSizeChange}
                textAlignVertical="center"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        flex: 1,
        marginRight: 12,
        marginLeft: 12,
    }
});