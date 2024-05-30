import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import MyTheme from '../../config/theme.js';
import { useNavigation } from '@react-navigation/native';
import { TextInputIcon } from '../../components/shares/TextInput/TextInputIcon.js';
import SearchIcon from '../../../assets/icons/Search/index.js';
import { HeaderHome } from '../../components/shares/Nav/HeaderHome.js';
import NotifIcon from '../../../assets/icons/NotifIcon/index.js'; 
import PromoCarousel from './PromoCarousel.js';

const HomeScreen = () => {
  const navi = useNavigation();
  const handlePress = () => {
    console.log("Button Pressed");
    navi.navigate("Login");
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      scrollEnabled={true}
    >
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.notifContainer}>
            <NotifIcon width={28} height={28} fillColor={MyTheme.colors.white} />
          </View>
          <View style={styles.userContainer}>
            <Text style={[styles.userText, MyTheme.typography.subtitle.sub_name]}>Hello, Eveey!</Text>
          </View>
          <View style={styles.sCardContainer}>
            <View style={[styles.searchCard, MyTheme.shadows.shadow_1]}>
              <Text style={[styles.outerText, MyTheme.typography.medium.medium_1]}>Ready to 
                <Text style={styles.innerText}> uncover </Text> 
                your 
                <Text style={styles.innerText}> ideal vendors </Text>
                ?
              </Text>
              <Text style={[styles.subCardText, MyTheme.typography.body.body_2]}>
                Explore top-quality vendors that match your preferences!
              </Text>
              <View style={styles.searchBarContainer}>
                <TextInputIcon 
                    iconSource={SearchIcon}
                    placeholder="Search"
                    type="search"
                    mode="text"
                    fontSize={MyTheme.typography.body.body_1}
                    iconProps={{ width: 20, height: 20}}
                  />
              </View>
            </View>
          </View>
        </View>
        <HeaderHome />
        <View style={styles.contentContainer}>
          <View style={styles.promoContainer}>
            <PromoCarousel />
          </View>
          <View style={styles.blogContainer}>
            <View style={styles.blogTitleContainer}>
              <Text style={[styles.blogTitle, MyTheme.typography.subtitle.sub_2]}>Highlights For You</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  headerContainer: {
    width: '100%',
    position: 'relative',
    alignItems: 'center',
    zIndex: 2,
  },
  notifContainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  userContainer: {
    position: 'absolute',
    top: 70,
    width: '100%',
    paddingHorizontal: 20,
  },
  userText: {
    color: MyTheme.colors.white,
    marginTop: 10,
    textAlign: 'left',
  },
  sCardContainer: {
    position: 'absolute',
    top: 110,
    width: '100%',
    paddingHorizontal: 20,
  },
  searchCard: {
    backgroundColor: MyTheme.colors.white,
    borderRadius: 15,
    marginTop: 30,
    width: '100%',
    padding: 15,
  },
  innerText: {
    color: MyTheme.colors.pink_1,
  },
  subCardText: {
    color: MyTheme.colors.neutral_2p,
  },
  searchBarContainer: {
    marginTop: 15,
  },
  contentContainer: {
    
  },
  promoContainer: {
    marginTop: 10,
  },
  blogContainer: {
    marginTop: 10,
    backgroundColor: MyTheme.colors.danger,
  },  
  blogTitle: {
    color: MyTheme.colors.neutral_1,
  },
});

export default HomeScreen;
