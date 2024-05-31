import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { CustomButton } from '../../components/shares/Buttons';
import MyTheme from '../../config/theme.js';

const { width: screenWidth } = Dimensions.get('window');
const scaleFontSize = screenWidth * 0.04;

const Done = () => {
  const navi = useNavigation();
  const handleButtonPress = () => {
    console.log("Button Pressed");
    navi.navigate("MyPlan");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.listContainer}>
        <View>
          <CustomButton
            title="To-Do"
            textColor={MyTheme.colors.neutral_3}
            onPress={handleButtonPress}
            type="outline"
            buttonColor={MyTheme.colors.neutral_300}
            outlineColor={MyTheme.colors.neutral_3}
            fontSize={scaleFontSize}
          />
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton
            title="Done"
            textColor={MyTheme.colors.brown_2}
            type="outline"
            buttonColor={MyTheme.colors.cream_2}
            outlineColor={MyTheme.colors.brown_2}
            fontSize={scaleFontSize}
            style={styles.button}
          />
        </View>
      </View>
      <View style={styles.pad}>
        {/* {categories.map(category => (
          <ToDo key={category.id} category={category.name} />
        ))} */}
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
});

export default Done;
