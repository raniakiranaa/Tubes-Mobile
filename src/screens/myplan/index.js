import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { CustomButton } from '../../components/shares/Buttons';
import MyTheme from '../../config/theme.js';
import PlusCircle from "../../../assets/icons/plus-circle.svg";
import { ToDo } from '../../components/private/myplan/index.js';
import ModalCategory from '../../components/private/myplan/ModalCategory.js';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';

const { width: screenWidth } = Dimensions.get('window');
const scaleFontSize = screenWidth * 0.04;

const MyPlan = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [categories, setCategories] = useState([{ id: 1, name: 'Pre-Wedding' }]); // default

  const navigation = useNavigation();

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
    <View style={styles.container}>
      <View className='mt-12'>
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
              onPress={() => navigation.navigate('DoneList')}
              type="outline"
              buttonColor={MyTheme.colors.neutral_300}
              outlineColor={MyTheme.colors.neutral_3}
              fontSize={scaleFontSize}
            />
          </View>
        </View>

        {/* temporary routing */}
        <View style={styles.listContainer}>
          <View>
            <CustomButton
              title="Budget Planner"
              textColor={MyTheme.colors.brown_2}
              onPress={() => navigation.navigate('BudgetPlanner')}
              type="outline"
              buttonColor={MyTheme.colors.cream_2}
              outlineColor={MyTheme.colors.brown_2}
              fontSize={scaleFontSize}
              style={styles.button}
            />
          </View>
          <View style={styles.buttonContainer}>
            <CustomButton
              title="Guest Manager"
              textColor={MyTheme.colors.neutral_3}
              onPress={() => navigation.navigate('GuestManager')}
              type="outline"
              buttonColor={MyTheme.colors.neutral_300}
              outlineColor={MyTheme.colors.neutral_3}
              fontSize={scaleFontSize}
            />
          </View>
        </View>

        <ScrollView contentContainerStyle={{ paddingBottom: 250, justifyContent: 'center', alignItems: 'center' }}>
          {categories.map(category => (
            <ToDo key={category.id} category={category.name} onCategoryDelete={() => handleCategoryDelete(category.id)}/>
          ))}

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

        <ModalCategory
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onAddCategory={handleAddCategory}
          newCategory={newCategory}
          setNewCategory={setNewCategory}
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
    marginTop: 20,
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default MyPlan;
