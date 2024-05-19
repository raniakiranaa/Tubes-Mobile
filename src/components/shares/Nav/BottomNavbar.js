import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Text } from 'react-native-paper';
import HomeIcon from '../../../../assets/icons/Home.svg';
import HomeFillIcon from '../../../../assets/icons/Home-fill.svg';
import VendorIcon from '../../../../assets/icons/Vendor.svg';
import VendorFillIcon from '../../../../assets/icons/Vendor-fill.svg';
import OrdersIcon from '../../../../assets/icons/Orders.svg';
import OrdersFillIcon from '../../../../assets/icons/Orders-fill.svg';
import MyPlanIcon from '../../../../assets/icons/MyPlan.svg';
import MyPlanFillIcon from '../../../../assets/icons/MyPlan-fill.svg';
import ProfileIcon from '../../../../assets/icons/Profile.svg';
import ProfileFillIcon from '../../../../assets/icons/Profile-fill.svg';
import ChatIcon from '../../../../assets/icons/Chat.svg';
import ChatFillIcon from '../../../../assets/icons/Chat-fill.svg';
import MyBlogIcon from '../../../../assets/icons/MyBlog.svg';
import MyBlogFillIcon from '../../../../assets/icons/MyBlog-fill.svg';
import MyTheme from '../../../config/theme';
import CustomAppbar from '../Appbar/CustomAppbar.js';
import CancelIcon from '../../../../assets/icons/Cancel.svg';
import Dots from '../../../../assets/icons/Dots.svg';
import Notification from '../../../../assets/icons/Notification.svg';

const Tab = createBottomTabNavigator();

export default function BottomNavbar({ isAdmin }) {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: MyTheme.colors.brown_2,
          tabBarInactiveTintColor: MyTheme.colors.neutral_4,
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === 'Home') {
              return focused ? <HomeFillIcon /> : <HomeIcon />;
            } else if (route.name === 'Vendor') {
              return focused ? <VendorFillIcon /> : <VendorIcon />;
            } else if (route.name === 'Orders') {
              return focused ? <OrdersFillIcon /> : <OrdersIcon />;
            } else if (route.name === 'MyPlan') {
              return focused ? <MyPlanFillIcon /> : <MyPlanIcon />;
            } else if (route.name === 'Profile') {
              return focused ? <ProfileFillIcon /> : <ProfileIcon />;
            } else if (route.name === 'Chat') {
              return focused ? <ChatFillIcon /> : <ChatIcon />;
            } else if (route.name === 'MyBlog') {
              return focused ? <MyBlogFillIcon /> : <MyBlogIcon />;
            }
          },
          tabBarStyle: {
            height: 68,
            paddingLeft: 30,
            paddingRight: 30,
          },
          tabBarIconStyle: {
            marginTop: 14,
          },
          tabBarLabelStyle: {
            fontFamily: 'poppinsSemiBold',
            fontSize: 10,
            marginBottom: 14,
          },
        })}
      >
        {!isAdmin && (
          <>
            <Tab.Screen
              name="Home"
              component={HomeScreen}
              options={{
                tabBarLabel: 'Home',
              }}
            />
            <Tab.Screen
              name="Chat"
              component={VendorScreen}
              options={{
                tabBarLabel: 'Vendor',
              }}
            />
            <Tab.Screen
              name="Orders"
              component={OrdersScreen}
              options={{
                tabBarLabel: 'Orders',
              }}
            />
            <Tab.Screen
              name="MyBlog"
              component={MyPlanScreen}
              options={{
                tabBarLabel: 'My Plan',
              }}
            />
            <Tab.Screen
              name="Profile"
              component={ProfileScreen}
              options={{
                tabBarLabel: 'Profile',
              }}
            />
          </>
        )}
        {/* Add a Tab.Screen for Admin if user is an admin */}
        {isAdmin && (
          <>
            <Tab.Screen
              name="Home"
              component={HomeScreen}
              options={{
                tabBarLabel: 'Home',
              }}
            />
            <Tab.Screen
              name="Chat"
              component={ChatScreen}
              options={{
                tabBarLabel: 'Chat',
              }}
            />
            <Tab.Screen
              name="Orders"
              component={OrdersScreen}
              options={{
                tabBarLabel: 'Orders',
              }}
            />
            <Tab.Screen
              name="MyBlog"
              component={MyBlogScreen}
              options={{
                tabBarLabel: 'My Blog',
              }}
            />
            <Tab.Screen
              name="Profile"
              component={ProfileScreen}
              options={{
                tabBarLabel: 'Profile',
              }}
            />
          </>
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen() {
  return (
    <CustomAppbar title="Home" isBackButton={true} isAction={true} ActionIcon={CancelIcon}/>
  );
}

function VendorScreen() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Vendor!</Text>
    </View>
  );
}

function OrdersScreen() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Orders!</Text>
    </View>
  );
}

function MyPlanScreen() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">My Plan!</Text>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Profile!</Text>
    </View>
  );
}

function ChatScreen() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Chat!</Text>
    </View>
  );
}

function MyBlogScreen() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">My Blog!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
