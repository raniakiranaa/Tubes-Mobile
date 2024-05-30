import { StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';
import React, { useState } from 'react';
import MyTheme from '../../../config/theme';
import CheckBox from '../../../../assets/icons/myplan/Checkbox.js'; 
import Checked from '../../../../assets/icons/myplan/Checked.js';
import { Swipeable } from 'react-native-gesture-handler';
import { Trash } from '../../../../assets/icons/budget/index.js'

export const ToDoInput = (props) => {
    const [inputValue, setInputValue] = useState(props.value);
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

    const renderRightActions = () => {
        return (
            <TouchableOpacity 
                style={[styles.deleteButton, { height: Math.max(42, inputHeight) }]} 
                onPress={() => props.onDelete(props.id)}
            >
                <Trash width={20} height={20} strokeClassName={MyTheme.colors.white}/>
            </TouchableOpacity>
        );
    };

    return (
        <Swipeable renderRightActions={renderRightActions}>
            <View style={containerStyle}>
                <TouchableOpacity onPress={handleIconPress}>
                    <IconComponent />
                </TouchableOpacity>
                <TextInput
                    style={styles.input}
                    placeholder="Add to-do"
                    placeholderTextColor={MyTheme.colors.neutral_2p}
                    value={inputValue}
                    onChangeText={(text) => {
                        setInputValue(text);
                        props.onChangeText(text);
                    }}
                    onContentSizeChange={handleContentSizeChange}
                    textAlignVertical="center"
                />
            </View>
        </Swipeable>
    );
}

const styles = StyleSheet.create({
    input: {
        flex: 1,
        marginRight: 12,
        marginLeft: 12,
    },
    deleteButton: {
        backgroundColor: '#FF3B30',
        justifyContent: 'center',
        alignItems: 'center',
        width: 65,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        marginRight: 10
    }
});
