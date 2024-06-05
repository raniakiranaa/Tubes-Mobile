import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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
import VendorScreen from '../../../screens/vendor/index.js';
import { CustomHeader } from './CustomHeader.js';
import TopNavbar from './TopNavbar.js';
import OrderDetail from '../../../screens/order/OrderDetail.js';
import RatingReview from '../../../screens/order/RatingReview.js';
import Profile from '../../../screens/profile/index.js';
import HomeScreen from '../../../screens/home/index.js';
import DetailPromo from '../../../screens/promo/detailPromo.js';
import BudgetPlanner from '../../../screens/budgetplanner/index.js';
import ToDoList from '../../../screens/myplan/index.js';
import DoneList from '../../../screens/done/index.js';

import { CarouselCard, BigHomeCard, BigSearchCard, BigVendorCard, SmallCard } from './../Card';
import VendorDetailPage from '../../../screens/vendor/VendorDetail.js';
import ProductDetailPage from '../../../screens/vendor/ProductDetail.js';
import OrderConfirmationPage from '../../../screens/vendor/OrderConfirmation.js';
import SavedVendorPage from '../../../screens/vendor/SavedVendor.js';
import VendorSearchPage from '../../../screens/vendor/VendorSearch.js';
import DetailBlog from '../../../screens/blog/detailBlog.js';
import Blog from '../../../screens/blog/index.js';
import GuestManager from '../../../screens/guestmanager/index.js';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function TabNavigator({ isAdmin }) {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: MyTheme.colors.brown_2,
        tabBarInactiveTintColor: MyTheme.colors.neutral_4,
        tabBarIcon: ({ focused }) => {
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
          height: Platform.OS === 'ios' ? 100 : 68,
          paddingLeft: 30,
          paddingRight: 30,
          position: 'absolute',
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
              // header: () => <CustomAppbar title="Home" isBackButton={false} isAction={false} />,
              header: () => null,
            }}
          />
          <Tab.Screen
            name="Vendor"
            component={VendorScreen}
            options={{
              tabBarLabel: 'Vendor',
              header: () => (
                <>
                  <CustomHeader />
                  <CustomAppbar title="Vendor" isBackButton={false} isAction={true} ActionIcon={'Save'} isTransparent={true}/>
                </>
              ),
            }}
          />
          <Tab.Screen
            name="Orders"
            component={TopNavbar}
            options={{
              tabBarLabel: 'Orders',
              header: () => <CustomAppbar title="Orders" isBackButton={false} isAction={false} />,
            }}
          />
          <Tab.Screen
            name="MyPlan"
            component={MyPlanStack}
            options={{
              tabBarLabel: 'My Plan',
              header: () => (
                <>
                  <CustomHeader />
                  <CustomAppbar title="My Plan" isBackButton={false} isAction={true} ActionIcon={'Dots'} isTransparent={true}/>
                </>
              ),
            }}
          />
          <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
              tabBarLabel: 'Profile',
              header: () => (
                <>
                  <CustomHeader />
                  <CustomAppbar title="Profile" isBackButton={false} isAction={false} isTransparent={true}/>
                </>
              ),
            }}
          />
        </>
      )}
      {isAdmin && (
        <>
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarLabel: 'Home',
              header: () => <CustomAppbar title="Home" isBackButton={false} isAction={false} />,
            }}
          />
          <Tab.Screen
            name="Chat"
            component={ChatScreen}
            options={{
              tabBarLabel: 'Chat',
              header: () => <CustomAppbar title="Chat" isBackButton={false} isAction={false} />,
            }}
          />
          <Tab.Screen
            name="Orders"
            component={TopNavbar}
            options={{
              tabBarLabel: 'Orders',
              header: () => <CustomAppbar title="Orders" isBackButton={false} isAction={false} />,
            }}
          />
          <Tab.Screen
            name="MyBlog"
            component={MyBlogScreen}
            options={{
              tabBarLabel: 'My Blog',
              header: () => <CustomAppbar title="My Blog" isBackButton={false} isAction={false} />,
            }}
          />
          <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
              tabBarLabel: 'Profile',
              header: () => <CustomAppbar title="Profile" isBackButton={false} isAction={false} />,
            }}
          />
        </>
      )}
    </Tab.Navigator>
  );
}

function MyPlanStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ToDoList"
        component={ToDoList}
      />
      <Stack.Screen
        name="DoneList"
        component={DoneList}
      />
    </Stack.Navigator>
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
