import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import MyTheme from '../../../config/theme.js';
import { Trash } from '../../../../assets/icons/budget/index.js'
import Pencil from '../../../../assets/icons/Pencil/index.js'

export const Budget = (props) => {
    const [totalTransaction, setTotalTransaction] = useState(0)
    const [actualSpend, setActualSpend] = useState(0)

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);
    };
 
    return (
        <View style={styles.container}>
            <View style={styles.detail}>
                <Text style={[MyTheme.typography.medium.medium_1]}>{props.name}</Text>
                <Text style={[MyTheme.typography.medium.medium_2, { color: MyTheme.colors.peach_2, marginTop: 4 }]}>{props.target_category}</Text>
                <Text style={[MyTheme.typography.body.body_2, { color: MyTheme.colors.neutral_2p, marginTop: 4 }]}>
                    {totalTransaction}
                    {totalTransaction > 1 ? ' transactions' : ' transaction'}
                </Text>
            </View>
            <View style={styles.spend}>
                <Text style={[MyTheme.typography.body.body_2, { color: MyTheme.colors.brown_2, marginTop: 21, textAlign: 'center' }]}>{formatCurrency(actualSpend)}</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 19 }}>
                <TouchableOpacity style={{ marginRight: 8, marginLeft: 12 }} onPress={props.onEdit}>
                    <Pencil width={20} height={20} />
                </TouchableOpacity>
                <TouchableOpacity onPress={props.onDelete}>
                    <Trash width={20} height={20} strokeClassName='#E04B4B' />
                </TouchableOpacity>
            </View>
        </View>
    );
};

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
    detail: {
        width: 150,
        flexDirection: 'column',
        marginLeft: 16,
    },
    spend: {
        width: 150
    }
});
