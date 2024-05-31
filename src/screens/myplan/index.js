import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { CustomButton } from '../../components/shares/Buttons';
import MyTheme from '../../config/theme.js';
import PlusCircle from "../../../assets/icons/plus-circle.svg";
import { ToDo } from '../../components/private/myplan/index.js';
import ModalCategory from '../../components/private/myplan/ModalCategory.js';

const { width: screenWidth } = Dimensions.get('window');
const scaleFontSize = screenWidth * 0.04;

const MyPlan = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [categories, setCategories] = useState([{ id: 1, name: 'Pre-Wedding' }]);

  const navi = useNavigation();
  const handleButtonPress = () => {
    console.log("Button Pressed");
    navi.navigate("done");
  };

  const handlePress = () => {
    setModalVisible(true);
  };

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      setCategories([...categories, { id: categories.length + 1, name: newCategory }]);
      setNewCategory('');
      setModalVisible(false);
    }
  };

  const handleCategoryDelete = (categoryId) => {
    setCategories(categories.filter(category => category.id !== categoryId));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.listContainer}>
        <View>
          <CustomButton
            title="To-Do"
            textColor={MyTheme.colors.brown_2}
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
            onPress={handleButtonPress}
            type="outline"
            buttonColor={MyTheme.colors.neutral_300}
            outlineColor={MyTheme.colors.neutral_3}
            fontSize={scaleFontSize}
          />
        </View>
      </View>
      <View style={styles.pad}>
        {categories.map(category => (
          <ToDo key={category.id} category={category.name} onCategoryDelete={() => handleCategoryDelete(category.id)}/>
        ))}
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

      <ModalCategory
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAddCategory={handleAddCategory}
        newCategory={newCategory}
        setNewCategory={setNewCategory}
      />
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
  },
});

export default MyPlan;
