import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import MyTheme from '../../../config/theme.js';
import { Trash } from '../../../../assets/icons/budget/index.js'
import { Yes, No, None } from '../../../../assets/icons/budget/index.js'

export const Guest = (props) => {
    const firstLetter = props.name.charAt(0);
    const [status, setStatus] = useState('None');
    const [dropdownVisible, setDropdownVisible] = useState(false);

    useEffect(() => {
        if (props.status !== status) {
            setStatus(props.status);
        }
    }, [props.status]);

    const handleStatusChange = (newStatus) => {
        setStatus(newStatus);
        setDropdownVisible(false);
        props.onChangeStatus(newStatus);
    };

    const renderStatusIcon = () => {
        switch (status) {
            case 'Yes':
                return <Yes width={24} height={24} />;
            case 'No':
                return <No width={24} height={24} />;
            case 'None':
            default:
                return <None width={24} height={24} />;
        }
    };

    const renderDropdownIcons = () => {
        const icons = {
            Yes: <Yes width={24} height={24} />,
            No: <No width={24} height={24} />,
            None: <None width={24} height={24} />
        };
        return Object.keys(icons).filter(key => key !== status).map(key => (
            <TouchableOpacity key={key} style={styles.dropdownItem} onPress={() => handleStatusChange(key)}>
                {icons[key]}
            </TouchableOpacity>
        ));
    };

    return (
        <View style={styles.container}>
            <View style={[styles.ava, { justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }]}>
                <Text style={[{ color: MyTheme.colors.white }, MyTheme.typography.subtitle.sub_2]}>{firstLetter}</Text>
            </View>
            <View style={styles.detail}>
                <Text style={[MyTheme.typography.medium.medium_1]}>{props.name}</Text>
                <Text style={[MyTheme.typography.body.body_2, { color: MyTheme.colors.neutral_2p, marginTop: 4 }]}>Guest of the {props.role}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {dropdownVisible && (
                    <View style={styles.dropdownMenu}>
                        {renderDropdownIcons()}
                    </View>
                )}
                <TouchableOpacity onPress={() => setDropdownVisible(!dropdownVisible)} style = {{ marginRight: 10 }}>
                    {renderStatusIcon()}
                </TouchableOpacity>
                <TouchableOpacity onPress={props.onRemove}>
                    <Trash width={27} height={27} strokeClassName='#E04B4B' />
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
    ava: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: MyTheme.colors.neutral_3
    },
    detail: {
        width: 265,
        flexDirection: 'column',
        marginLeft: 16,
        justifyContent: 'center'
    },
    dropdownMenu: {
        position: 'absolute',
        flexDirection: 'row',
        left: -95,
        zIndex: 1000,
    },
    dropdownItem: {
        padding: 10,
    }
});
