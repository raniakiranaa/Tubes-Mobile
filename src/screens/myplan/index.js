import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import { CustomButton } from '../../components/shares/Buttons';
import MyTheme from '../../config/theme.js';
import PlusCircle from "../../../assets/icons/plus-circle.svg";
import { ToDo } from '../../components/private/myplan/index.js';
import ModalCategory from '../../components/private/myplan/ModalCategory.js';
import { db } from '../../firebase';
import { collection, getDoc, getDocs, updateDoc, addDoc, deleteDoc, doc, Timestamp } from 'firebase/firestore';

const { width: screenWidth } = Dimensions.get('window');
const scaleFontSize = screenWidth * 0.04;

const MyPlan = () => {
  // user
  const [customerID, setCustomerID] = useState('1');

  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [categories, setCategories] = useState([])

  // default category - Pre Wedding
  const getCategories = async () => {
    setLoading(true)
    try {
      // initialize MyPlan
      const customerDocRef = doc(db, 'customer', customerID);
      const customerDocSnapshot = await getDoc(customerDocRef);
      const customerData = customerDocSnapshot.data();
      const initMyPlan = customerData.initMyPlan;

      if (!initMyPlan) {
        const categoriesCollectionRef = collection(db, 'customer', customerID, 'categories');
        const preWeddingDocRef = await addDoc(categoriesCollectionRef, { createdAt: Timestamp.now(), name: 'Pre-Wedding' });
        
        const nestedCollectionRef = collection(db, 'customer', customerID, 'categories', preWeddingDocRef.id, 'todos');
        await addDoc(nestedCollectionRef, { createdAt: Timestamp.now(), value: '', status: false });

        await updateDoc(customerDocRef, { initMyPlan: true });
      }

      const categoriesSnapshot = await getDocs(collection(db, 'customer', customerID, 'categories'));
      const fetchedCategories = categoriesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      fetchedCategories.sort((a, b) => a.createdAt - b.createdAt);
      setCategories(fetchedCategories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
    setLoading(false)
  };

  useEffect(() => {
    getCategories();
  }, [customerID]);

  const navigation = useNavigation();

  const handlePress = () => {
    setModalVisible(true);
  };

  const handleAddCategory = async () => {
    try {
      if (newCategory.trim()) {
        const categoryRef = collection(db, 'customer', customerID, 'categories');
        const newCategoryRef = await addDoc(categoryRef, { createdAt: Timestamp.now(), name: newCategory });
        const nestedCollectionRef = collection(db, 'customer', customerID, 'categories', newCategoryRef.id, 'todos');
        await addDoc(nestedCollectionRef, { createdAt: Timestamp.now(), value: '', status: false });

        setCategories([...categories, { id: newCategoryRef.id, name: newCategory }]);
        setNewCategory('');
        setModalVisible(false);
      }
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const handleCategoryDelete = async (categoryId) => {
    try {
      setCategories(categories.filter(category => category.id !== categoryId));

      await deleteDoc(doc(db, 'customer', customerID, 'categories', categoryId));

    } catch (error) {
      console.error('Error deleting category:', error);
    }
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

        <ScrollView contentContainerStyle={{ paddingBottom: 250, justifyContent: 'center', alignItems: 'center' }}>
          {categories.map(category => (
            <ToDo 
              key={category.id} 
              customerID={customerID} 
              categoryID={category.id} 
              category={category.name} 
              onCategoryDelete={() => handleCategoryDelete(category.id)}
              setLoading={setLoading}  
            />
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
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={MyTheme.colors.neutral_2p} />
        </View>
      )}
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
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },

});

export default MyPlan;
