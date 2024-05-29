import React, { useState } from 'react';
import { View, Text, StyleSheet,  ScrollView, Touchable, TouchableOpacity, Dimensions } from 'react-native';
import MyTheme from '../../config/theme.js';
import { CustomButton } from '../../components/shares/Buttons/index.js';
import Pencil from '../../../assets/icons/Pencil/index.js'

const BudgetPlanner = () => {
  const [budget, setBudget] = useState(0)
  const [spend, setSpend] = useState(0)
  const [actual, setActual] = useState(0)

  const formatBudget = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(budget);
  const formatSpend = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(spend);
  const formatActual = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(actual);

  const handlePress = () => {
    console.log("Button Pressed");
  }

  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <View style={styles.BudgetContainer}>
            <Text style={[styles.title, MyTheme.typography.subtitle.sub_3]}>Budget Remaining :</Text>
            <Text style={[styles.price, MyTheme.typography.subtitle.sub_2]}>{formatBudget}</Text>
            <View style={styles.content}>
              <View style = {styles.outline}>
                  <Text style={[{ color: MyTheme.colors.brown_3 }, MyTheme.typography.medium.medium_1]}>Spend</Text>
                  <Text style={[{ color: MyTheme.colors.peach_3 }, MyTheme.typography.medium.medium_1]}>{formatSpend}</Text>
              </View>
              <View style = {styles.outline}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={[{ color: MyTheme.colors.brown_3, marginRight: 8 }, MyTheme.typography.medium.medium_1]}>Actual Budget</Text>
                    <Pencil/>
                  </View>
                  <Text style={[{ color: MyTheme.colors.peach_3 }, MyTheme.typography.medium.medium_1]}>{formatActual}</Text>
              </View>
            </View>
        </View>
      </View>
      <ScrollView>
        {/* cashflow */}
        {/* <View style={styles.cashflow}>
          <Text style={[{ color: MyTheme.colors.neutral_2p }, MyTheme.typography.medium.medium_1]}>Category</Text>
          <Text style={[{ color: MyTheme.colors.neutral_2p }, MyTheme.typography.medium.medium_1]}>Actual Spend</Text>
        </View> */}
      </ScrollView>
      <View style={styles.button}>
        <CustomButton
          title="Add Category"
          size="block-round"
          buttonColor={MyTheme.colors.brown_2}
          textColor={MyTheme.colors.white}
          onPress={handlePress}
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
  button: {
    marginBottom: 24,
  },
  cashflow: {
    flexDirection: 'row',
    marginTop: 32,
    marginLeft: 32,
  }
});

export default BudgetPlanner;
