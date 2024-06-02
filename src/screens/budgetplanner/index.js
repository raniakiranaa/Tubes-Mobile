import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import MyTheme from '../../config/theme.js';
import Pencil from '../../../assets/icons/Pencil/index.js';
import ModalTarget from '../../components/private/budget/ModalTarget.js';
import ModalBudget from '../../components/private/budget/ModalBudget.js';
import { CustomButton } from '../../components/shares/Buttons/index.js';
import { Budget } from '../../components/private/budget/index.js'

const BudgetPlanner = () => {
  const [spend, setSpend] = useState(0);
  const [target, setTarget] = useState(0);
  const [newTarget, setNewTarget] = useState('');
  const budgetRemaining = target - spend;

  const [categoryList, setCategoryList] = useState([]);
  const [newCategory, setNewCategory] = useState('')

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [modalBudgetVisible, setModalBudgetVisible] = useState(false);

  const handlePress = () => {
    setModalVisible(true);
  };

  const handleAddTarget = () => {
    const parsedBudget = parseInt(newTarget.replace(/,/g, ''), 10);
    if (!isNaN(parsedBudget)) {
      setTarget(parsedBudget);
    }
    setModalVisible(false);
  };

  const handleButtonPress = () => {
    setModalBudgetVisible(true);
  };

  const handleAddCategory = (newCategory) => {
    setCategoryList(prevCategoryList => [...prevCategoryList, newCategory]);
    setModalBudgetVisible(false);
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
        <View style={ styles.columnContainer }>
          <Text style={ styles.columnTitleCat }>Category</Text>
          <Text style={ styles.columnTitle }>Actual Spend</Text>
        </View>
        <ScrollView style={styles.budgetDetail} contentContainerStyle={{ paddingBottom: 240 }}>
          {categoryList.map((category, index) => (
            <Budget
              key = {index}
              name = {category.name}
              targetCat = {formatCurrency(category.targetCat)}
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
    bottom: 0,
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
    textAlign: 'center',
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
  }
});

export default BudgetPlanner;
