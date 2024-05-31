import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import MyTheme from '../../config/theme.js';
import Pencil from '../../../assets/icons/Pencil/index.js';
import { CashFlow } from '../../components/private/budget/CashFlow.js';
import ModalTarget from '../../components/private/budget/ModalTarget.js';
import { Provider as PaperProvider } from 'react-native-paper';
import TableTry from '../../components/private/budget/TableTry.js';

const BudgetPlanner = () => {
  const [spend, setSpend] = useState(0);
  const [target, setTarget] = useState(0);
  const [newTarget, setNewTarget] = useState('');
  const budgetRemaining = target - spend;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);
  };

  const [modalVisible, setModalVisible] = useState(false);

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
      <CashFlow />
      {/* <PaperProvider>
      <TableTry/>
      </PaperProvider> */}
      <ModalTarget
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        oldTarget={target}
        onAddTarget={handleAddTarget}
        newTarget={newTarget}
        setNewTarget={setNewTarget}
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
});

export default BudgetPlanner;
