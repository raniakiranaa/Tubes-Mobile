import React, { useState } from 'react';
import { Appbar, Text, Menu, PaperProvider } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import BackIcon from '../../../../assets/icons/Back';
import SaveIcon from '../../../../assets/icons/Save';
import DotsIcon from '../../../../assets/icons/Dots';
import { useNavigation } from '@react-navigation/native';
import MyTheme from '../../../config/theme';

const CustomAppbar = ({ title, isBackButton, isAction, ActionIcon, isTransparent }) => {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  return (
    <Appbar.Header style={[isTransparent ? styles.transparentHeader : styles.header]}>
      <PaperProvider>
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
          <Text style={[
            MyTheme.typography.subtitle.sub_2,
            { color: isTransparent ? MyTheme.colors.white : MyTheme.colors.black }
          ]}>
            {title}
          </Text>
        </View>
        <View style={styles.rightIconsContainer}>
          {isAction && ActionIcon === 'Dots' && (
            <Menu
              visible={menuVisible}
              onDismiss={closeMenu}
              anchor={
                <Appbar.Action
                  icon={
                    isTransparent
                      ? () => <DotsIcon strokeColor={MyTheme.colors.white} />
                      : () => <DotsIcon strokeColor={MyTheme.colors.black} />
                  }
                  onPress={openMenu}
                />
              }
              contentStyle={styles.menuContent}
              theme={{ roundness: 10 }}
            >
              <Menu.Item onPress={() => navigation.navigate('BudgetPlanner')} title="Budget Planner" />
              <Menu.Item onPress={() => navigation.navigate('GuestManager')} title="Guest Manager" />
            </Menu>
          )}
          {isAction && ActionIcon === 'Save' && (
            <Appbar.Action
              icon={
                isTransparent
                  ? () => <SaveIcon strokeColor={MyTheme.colors.white} />
                  : () => <SaveIcon strokeColor={MyTheme.colors.black} />
              }
              onPress={() => navigation.navigate('SavedVendor')}
            />
          )}
        </View>
      </PaperProvider>
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
  menuContent: {
    backgroundColor: MyTheme.colors.white, // Set the background color of the menu to white
  },
});

export default CustomAppbar;
