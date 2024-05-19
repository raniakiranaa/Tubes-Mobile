import React from 'react';
import { Appbar, Text } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import BackButton from "../../../../assets/icons/BackButton.svg";
import { useNavigation } from '@react-navigation/native';
import MyTheme from '../../../config/theme';

const CustomAppbar = ({ title, isBackButton, isAction, ActionIcon }) => {
  const navigation = useNavigation();

  return (
    <Appbar.Header>
      {isBackButton && (
        <Appbar.Action
          icon={() => <BackButton />}
          onPress={() => navigation.goBack()}
        />
      )}
      <View style={styles.titleContainer}>
        <Text variant="titleMedium" style={[MyTheme.typography.subtitle.sub_2]}>
          {title}
        </Text>
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
  titleContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightIconsContainer: {
    position: 'absolute',
    right: 24,
    flexDirection: 'row',
  },
});

export default CustomAppbar;
