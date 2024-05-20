import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MyTheme from '../../../config/theme';
import OngoingScreen from '../../../screens/order/OrderOngoing.js'
import HistoryScreen from '../../../screens/order/OrderHistory.js'

const Tab = createMaterialTopTabNavigator();

export default function TopNavbar() {
  return (
    <Tab.Navigator
      initialRouteName="Ongoing"
      screenOptions={{
        tabBarActiveTintColor: MyTheme.colors.brown_2,
        tabBarLabelStyle: [MyTheme.typography.subtitle.sub_3, { textTransform: 'none' }],
        tabBarIndicatorStyle: { backgroundColor: MyTheme.colors.brown_2 },
      }}
    >
      <Tab.Screen
        name="Ongoing"
        component={OngoingScreen}
        options={{ tabBarLabel: 'Ongoing' }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{ tabBarLabel: 'History' }}
      />
    </Tab.Navigator>
  );
}
