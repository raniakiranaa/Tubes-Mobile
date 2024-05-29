import { StyleSheet, View, Text, Dimensions, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import MyTheme from '../../../config/theme';
import { SCREEN_WIDTH } from '../../../utils/deviceDimensions';
import { Trash } from '../../../../assets/icons/budget/index.js'
import { Yes, No, None } from '../../../../assets/icons/budget'

export const Guest = (props) => {
    const [name, setName] = useState('Eveey')
    const firstLetter = name.charAt(0);
    const [role, setRole] = useState('Bride')

    return (
        <View style={styles.container}>
            <View style={[styles.ava, { justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}]}>
                <Text style={[{color: MyTheme.colors.white}, MyTheme.typography.subtitle.sub_2]}>{firstLetter}</Text>
            </View>
            <View style={styles.detail}>
                <Text style={[MyTheme.typography.medium.medium_1]}>{name}</Text>   
                <Text style={[MyTheme.typography.body.body_2, {color: MyTheme.colors.neutral_2p, marginTop: 4}]}>Guest of the {role}</Text>      
            </View>
            <View style={{ marginRight: 12}}>
                <No width={24} height={24}/>
            </View>
            <Trash width={24} height={24}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        paddingTop: 24,
        paddingBottom: 24,
        marginHorizontal: 20,
        borderBottomWidth: 0.2,
        borderBottomColor: MyTheme.colors.neutral_4, 
    },
    ava: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: MyTheme.colors.neutral_3
    },
    detail: {
        width: 265,
        flexDirection:'column', 
        marginLeft: 16, 
        justifyContent: 'center'
    }
});

