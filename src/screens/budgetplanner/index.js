import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import MyTheme from '../../config/theme.js';
import Pencil from '../../../assets/icons/Pencil/index.js';
import ModalTarget from '../../components/private/budget/ModalTarget.js';
import ModalBudget from '../../components/private/budget/ModalBudget.js';
import ModalEdit from '../../components/private/budget/ModalEdit.js';
import Toast from 'react-native-toast-message';
import { CustomButton } from '../../components/shares/Buttons/index.js';
import { Budget } from '../../components/private/budget/index.js'
import { db } from '../../firebase';
import { UserContext } from '../../contexts/UserContext.js';
import { collection, getDoc, getDocs, updateDoc, addDoc, deleteDoc, doc } from 'firebase/firestore';

const BudgetPlanner = () => {
  const { user } = useContext(UserContext);

  const [loading, setLoading] = useState(true);
  const [spend, setSpend] = useState(0);
  const [target, setTarget] = useState(0);
  const [newTarget, setNewTarget] = useState('');
  const budgetRemaining = target - spend;

  const [categoryList, setCategoryList] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const [newCategory, setNewCategory] = useState('')
  const [editingCategory, setEditingCategory] = useState(null);
  const [newCategoryTarget, setNewCategoryTarget] = useState('');

  // get target budget
  const getTargetBudget = async () => {
    setLoading(true);
    try {
      if (user && user.id) {
        const customerRef = doc(db, 'customer', user.id);
        const customerDoc = await getDoc(customerRef);

        if (customerDoc.exists()) {
          const customerData = customerDoc.data();
          const targetBudget = customerData.target_budget || 0; // default to 0 if not set
          setTarget(targetBudget);

          // fetch categories
          const budgetCollectionRef = collection(db, 'customer', user.id, 'budget');
          const budgetSnapshot = await getDocs(budgetCollectionRef);

          if (!budgetSnapshot.empty) {
            const categories = budgetSnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }));
            setCategoryList(categories);
          } else {
            console.log('No categories found in budget collection for customer ID:', user.id);
          }
        } else {
          console.log('No customer document found for customer ID:', user.id);
        }
      } else {
        console.error('Invalid user ID');
      }
    } catch (error) {
      console.error('Error getting document: ', error);
    }
    setLoading(false);
  };

  const getOrderList = async () => {
    try {
      const ordersCollectionRef = collection(db, 'customer', user.id, 'order');
      const ordersSnapshot = await getDocs(ordersCollectionRef);
      const orders = ordersSnapshot.docs.map(doc => doc.data());
      return orders;
    } catch (error) {
      console.error('Error fetching orders:', error);
      return [];
    }
  };

  useEffect(() => {
    getTargetBudget();
  }, [user.id]);

  useEffect(() => {
    const checkBudgets = async () => {
      const orders = await getOrderList();
      setOrderList(orders);

      const totalSpend = orders.reduce((acc, order) => acc + parseInt(order.total_price, 10), 0);
      setSpend(totalSpend);

      if (totalSpend > target) {
        Toast.show({
          type: 'error',
          text1: 'Warning',
          text2: 'Total spend is more than the overall target budget!',
        });
      }

      const categorySpends = categoryList.reduce((acc, category) => {
        const categorySpend = orders
          .filter(order => order.category === category.category)
          .reduce((acc, order) => acc + parseInt(order.total_price, 10), 0);
        
        if (categorySpend > category.target_category) {
          Toast.show({
            type: 'error',
            text1: 'Warning',
            text2: `Spend for category ${category.category} is more than the target budget!`,
          });
        }
  
        return acc + category.target_category;
      }, 0);
  
      if (categorySpends > target && budgetRemaining >= 0) {
        Toast.show({
          type: 'error',
          text1: 'Warning',
          text2: 'Total target budget in each category is more than the overall target budget!',
        });
      }
    };

    if (categoryList.length > 0) {
      checkBudgets();
    }
  }, [categoryList, target]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [modalBudgetVisible, setModalBudgetVisible] = useState(false);
  const [modalEditVisible, setModalEditVisible] = useState(false);

  // target budget
  const handlePress = () => {
    setModalVisible(true);
  };

  const handleAddTarget = async () => {
    const parsedBudget = parseInt(newTarget.replace(/,/g, ''), 10);
    if (!isNaN(parsedBudget)) {
      try {
        const customerRef = doc(db, 'customer', user.id);

        await updateDoc(customerRef, {
          target_budget: parsedBudget
        });

        setTarget(parsedBudget);
        setModalVisible(false);

      } catch (error) {
        console.error('Error updating target budget:', error)
      }
    } else {
      console.error('Invalid target budget:', newTarget);
    }
  };

  // add category button
  const handleButtonPress = () => {
    setModalBudgetVisible(true);
  };

  const handleAddCategory = async (newCategory) => {
    const budgetCollectionRef = collection(db, 'customer', user.id, 'budget');
    try {
      setModalBudgetVisible(false);
      const newCategoryDoc = await addDoc(budgetCollectionRef, {
        category: newCategory.category,
        target_category: parseInt(newCategory.target_category.replace(/,/g, ''), 10)
      });

      setCategoryList(prevCategoryList => [...prevCategoryList, { id: newCategoryDoc.id, ...newCategory }]);
    } catch (error) {
      console.error('Error adding new category:', error);
    }
  };

  const handleDeleteCategory = async (categoryID) => {
    const categoryRef = doc(db, 'customer', user.id, 'budget', categoryID);
    try {
      await deleteDoc(categoryRef);

      setCategoryList(prevCategoryList => prevCategoryList.filter(category => category.id !== categoryID));
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  // pencil edit button
  const handleEditPress = (category) => {
    setEditingCategory(category);
    setNewCategoryTarget(category.target_category.toString());
    setModalEditVisible(true);
  };

  const handleEditCategory = async () => {
    const parsedTarget = parseInt(newCategoryTarget.replace(/,/g, ''), 10);
    if (!isNaN(parsedTarget) && editingCategory) {
      const categoryRef = doc(db, 'customer', user.id, 'budget', editingCategory.id);
      try {
        await updateDoc(categoryRef, { target_category: parsedTarget });

        setCategoryList(prevCategoryList =>
          prevCategoryList.map(category =>
            category.id === editingCategory.id ? { ...category, target_category: parsedTarget } : category
          )
        );
        setModalEditVisible(false);
        setEditingCategory(null);
        setNewCategoryTarget('');
      } catch (error) {
        console.error('Error updating category:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View className="mt-12">
        <View style={{ alignItems: 'center' }}>
          <View style={styles.BudgetContainer}>
            <Text style={[styles.title, MyTheme.typography.subtitle.sub_3]}>Budget Remaining :</Text>
            <Text style={[styles.price, MyTheme.typography.subtitle.sub_2]}>{formatCurrency(budgetRemaining)}</Text>
            <View style={styles.content}>
              <View style={styles.outline}>
                <Text style={[{ color: MyTheme.colors.brown_3 }, MyTheme.typography.medium.medium_1]}>Total Spend</Text>
                <Text style={[{ color: MyTheme.colors.peach_3 }, MyTheme.typography.medium.medium_1]}>{formatCurrency(spend)}</Text>
              </View>
              <View style={styles.outline}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={[{ color: MyTheme.colors.brown_3, marginRight: 8 }, MyTheme.typography.medium.medium_1]}>Target Budget</Text>
                  <TouchableOpacity onPress={handlePress}>
                    <Pencil width={12} height={12} />
                  </TouchableOpacity>
                </View>
                <Text style={[{ color: MyTheme.colors.peach_3 }, MyTheme.typography.medium.medium_1]}>{formatCurrency(target)}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.columnContainer}>
          <Text style={styles.columnTitleCat}>Category</Text>
          <Text style={styles.columnTitle}>Actual Spend</Text>
        </View>
        <ScrollView style={styles.budgetDetail} contentContainerStyle={{ paddingBottom: 240 }}>
          {categoryList.map((category, index) => (
            <Budget
              key={index}
              name={category.category}
              target_category={formatCurrency(category.target_category)}
              onDelete={() => handleDeleteCategory(category.id)}
              onEdit={() => handleEditPress(category)}
              orderList={orderList.filter(order => order.category === category.category)}
            />
          ))}
        </ScrollView>
      </View>
      <View style={styles.modalButton}>
        <CustomButton
          title="Add Budget Category"
          size="block-round"
          buttonColor={MyTheme.colors.brown_2}
          textColor={MyTheme.colors.white}
          onPress={handleButtonPress}
        />
      </View>
      <ModalTarget
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        oldTarget={target}
        onAddTarget={handleAddTarget}
        newTarget={newTarget}
        setNewTarget={setNewTarget}
      />
      <ModalBudget
        visible={modalBudgetVisible}
        onClose={() => setModalBudgetVisible(false)}
        onAddCategory={handleAddCategory}
        newCategory={newCategory}
        setNewCategory={setNewCategory}
        categoryList={categoryList}
      />
      <ModalEdit
        visible={modalEditVisible}
        onClose={() => setModalEditVisible(false)}
        oldCategory={editingCategory}
        onEditCategory={handleEditCategory}
        newCategoryTarget={newCategoryTarget}
        setNewCategoryTarget={setNewCategoryTarget}
      />
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
  modalButton: {
    position: 'absolute',
    bottom: 12,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: 'white',
  },
  BudgetContainer: {
    marginTop: 24,
    width: 360,
    height: 145,
    borderRadius: 10,
    ...MyTheme.shadows.shadow_1,
    backgroundColor: MyTheme.colors.white,
  },
  title: {
    color: MyTheme.colors.neutral_2p,
    marginLeft: 18,
    marginTop: 18,
  },
  price: {
    color: MyTheme.colors.peach_2,
    marginLeft: 18,
  },
  content: {
    flexDirection: 'row',
    marginTop: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  outline: {
    width: 150,
    height: 48,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: MyTheme.colors.brown_2,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8
  },
  columnContainer: {
    flexDirection: 'row',
    marginLeft: 36,
    marginRight: 48,
    marginTop: 32
  },
  columnTitleCat: {
    width: 150,
    textAlign: 'left',
    color: MyTheme.colors.neutral_2p,
    ...MyTheme.typography.medium.medium_1
  },
  columnTitle: {
    width: 150,
    textAlign: 'center',
    color: MyTheme.colors.neutral_2p,
    ...MyTheme.typography.medium.medium_1
  },
  budgetDetail: {
    marginTop: 21,
    marginBottom: 42,
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

export default BudgetPlanner;
