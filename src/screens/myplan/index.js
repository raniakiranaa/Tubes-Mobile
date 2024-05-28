import React from 'react';
import { View, Text, StyleSheet, Touchable, TouchableOpacity, Dimensions } from 'react-native';
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
    <View style={styles.container}>
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
                style={styles.button} // Menetapkan gaya langsung ke dalam CustomButton
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
        <ToDo/>
      </View>
      <View style={styles.pad}>
        <CustomButton
            title="Add Task"
            type="icon"
            iconSource={PlusCircle}
            textColor={MyTheme.colors.brown_2}
            onPress={handlePress}
            size="block-square"
            buttonColor={MyTheme.colors.cream_2}
            fontSize={scaleFontSize}
        />
      </View>
    </View>
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
    marginTop: 200,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    marginLeft: 10, // Menambahkan jarak horizontal antara tombol
  },
  pad: {
    paddingTop: 30,
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
