import React from 'react';
import { Appbar, Text } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import BackIcon from '../../../../assets/icons/Back';
import SaveIcon from '../../../../assets/icons/Save';
import DotsIcon from '../../../../assets/icons/Dots';
import { useNavigation } from '@react-navigation/native';
import MyTheme from '../../../config/theme';

const CustomAppbar = ({ title, isBackButton, isAction, ActionIcon, isTransparent }) => {
  const navigation = useNavigation();

  return (
    <Appbar.Header style={[isTransparent ? styles.transparentHeader : styles.header]}>
      <View style={styles.leftIconsContainer}>
        {isBackButton && (
          <Appbar.Action
            icon={
              isTransparent
                ? () => <BackIcon strokeColor={MyTheme.colors.white} />
                : () => <BackIcon strokeColor={MyTheme.colors.black} />
            }
            onPress={() => navigation.goBack()}
          />
        )}
      </View>
      <View style={styles.titleContainer}>
        {isTransparent ? (
          <Text style={[MyTheme.typography.subtitle.sub_2, { color: MyTheme.colors.white }]}>{title}</Text>
        ) : (
          <Text style={[MyTheme.typography.subtitle.sub_2]}>{title}</Text>
        )}
      </View>
      <View style={styles.rightIconsContainer}>
      {isAction && (
        <Appbar.Action
          icon={
            ActionIcon === 'Save' && isTransparent
              ? () => <SaveIcon strokeColor={MyTheme.colors.white} />
              : ActionIcon === 'Save' && !isTransparent
              ? () => <SaveIcon strokeColor={MyTheme.colors.black} />
              : ActionIcon === 'Dots' && isTransparent
              ? () => <DotsIcon strokeColor={MyTheme.colors.white} />
              : ActionIcon === 'Dots' && !isTransparent
              ? () => <DotsIcon strokeColor={MyTheme.colors.black} />
              : null
          }
          onPress={
            ActionIcon === 'Save'
              ? () => navigation.navigate('SavedVendor')
              : ActionIcon === 'Dots'
              ? () => console.log('Dots Pressed')
              : () => console.log('Action Pressed')
          }
        />
      )}
    </View>
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: MyTheme.colors.white,
    elevation: 0,
    shadowOpacity: 0,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
  },
  transparentHeader: {
    backgroundColor: 'transparent',
    elevation: 0,
    shadowOpacity: 0,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    flexDirection: 'row',
  },
  leftIconsContainer: {
    position: 'absolute',
    left: 0,
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
  },
  rightIconsContainer: {
    position: 'absolute',
    right: 24,
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
  },
});

export default CustomAppbar;
