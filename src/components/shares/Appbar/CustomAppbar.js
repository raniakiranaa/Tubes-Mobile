import React from 'react';
import { Appbar, Text } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import BackButton from "../../../../assets/icons/BackButton.svg";
import { useNavigation } from '@react-navigation/native';
import MyTheme from '../../../config/theme';

const CustomAppbar = ({ title, isBackButton, isAction, ActionIcon, isTransparent }) => {
  const navigation = useNavigation();

  return (
    <Appbar.Header style={[isTransparent ? styles.transparentHeader : styles.header]}>
      <View style={styles.leftIconsContainer}>
        {isBackButton && (
          <Appbar.Action
            icon={() => <BackButton />}
            onPress={() => navigation.goBack()}
          />
        )}
      </View>
      <View style={styles.titleContainer}>
        {isTransparent && <Text style={[MyTheme.typography.subtitle.sub_2, { color: MyTheme.colors.white }]}>{title}</Text>}
        {!isTransparent && <Text style={[MyTheme.typography.subtitle.sub_2]}>{title}</Text>}
      </View>
      <View style={styles.rightIconsContainer}>
        {isAction && (
          <Appbar.Action
            icon={ActionIcon}
            onPress={() => console.log('Pressed')}
          />
        )}
      </View>
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: MyTheme.colors.white,
    elevation: 0, // removes the shadow on Android
    shadowOpacity: 0, // removes the shadow on iOS
    height: 48,
    flexDirection: 'row',
    alignItems: 'center', // vertically center the children
  },
  transparentHeader: {
    backgroundColor: 'transparent',
    elevation: 0, // removes the shadow on Android
    shadowOpacity: 0, // removes the shadow on iOS
    height: 48,
    flexDirection: 'row',
    alignItems: 'center', // vertically center the children
  },
  titleContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    height: 48, // ensure the title container also has the same height
    flexDirection: 'row',
  },
  leftIconsContainer: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center', // vertically center the back button
    height: 48, // ensure the container is also 48 height
  },
  rightIconsContainer: {
    position: 'absolute',
    right: 24,
    flexDirection: 'row',
    alignItems: 'center', // vertically center the action icon
    height: 48, // ensure the container is also 48 height
  },
});

export default CustomAppbar;
