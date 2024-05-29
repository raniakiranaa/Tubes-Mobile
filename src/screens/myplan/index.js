import React from 'react';
import { View, Text, StyleSheet,  ScrollView, Touchable, TouchableOpacity, Dimensions } from 'react-native';
// import { OutlineButton, IconButton } from '../../components/shares/Buttons/index.js';
import { CustomButton } from '../../components/shares/Buttons';
import {Link, Redirect, router} from "expo-router";
import MyTheme from '../../config/theme.js';
import { TextInputIcon } from '../../components/shares/TextInput/TextInputIcon.js';
import { useNavigation } from 'expo-router';
import PlusCircle from "../../../assets/icons/plus-circle.svg";
import { ToDo } from '../../components/private/myplan/index.js';

const { width: screenWidth } = Dimensions.get('window');
const scaleFontSize = screenWidth * 0.04; 

const MyPlan = () => {
  const handlePress = () => {
    console.log("Button Pressed");
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.listContainer}>
        <View>
            <CustomButton
                title="To-Do"
                textColor={MyTheme.colors.brown_2}
                onPress={handlePress}
                type="outline"
                buttonColor={MyTheme.colors.cream_2}
                outlineColor={MyTheme.colors.brown_2}
                fontSize={scaleFontSize}
                style={styles.button} 
            />
        </View>
        <View style={styles.buttonContainer}>
            <CustomButton
                title="Done"
                textColor={MyTheme.colors.neutral_3}
                onPress={handlePress}
                type="outline"
                buttonColor={MyTheme.colors.neutral_300}
                outlineColor={MyTheme.colors.neutral_3}
                fontSize={scaleFontSize}
            />
        </View>
      </View>
      <View style={styles.pad}>
        <ToDo category="Pre-Wedding"/>
      </View>
      <View style={styles.padTask}>
        <CustomButton
            title="Add Category"
            type="icon"
            iconSource={PlusCircle}
            textColor={MyTheme.colors.brown_2}
            onPress={handlePress}
            size="block-square"
            buttonColor={MyTheme.colors.cream_2}
            fontSize={scaleFontSize}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  listContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start', 
    backgroundColor: '#ffffff',
    marginTop: 25,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    marginLeft: 10,
  },
  pad: {
    paddingTop: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  padTask: {
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  }
});

export default MyPlan;
