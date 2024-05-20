import React from 'react';
import { View, StyleSheet } from 'react-native';
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
import DotsIcon from '../../../../assets/icons/Dots.svg';
import NotificationIcon from '../../../../assets/icons/Notification.svg';
import VendorScreen from '../../../screens/vendor/index.js';
import { CustomHeader } from './CustomHeader.js';
import TopNavbar from './TopNavbar.js';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

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
            position: 'absolute',          },
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
              component={HomeStack}
              options={{
                tabBarLabel: 'Home',
              }}
            />
            <Tab.Screen
              name="Vendor"
              component={VendorStack}
              options={{
                tabBarLabel: 'Vendor',
              }}
            />
            <Tab.Screen
              name="Orders"
              component={OrdersStack}
              options={{
                tabBarLabel: 'Orders',
              }}
            />
            <Tab.Screen
              name="MyPlan"
              component={MyPlanStack}
              options={{
                tabBarLabel: 'My Plan',
              }}
            />
            <Tab.Screen
              name="Profile"
              component={ProfileStack}
              options={{
                tabBarLabel: 'Profile',
              }}
            />
          </>
        )}
        {isAdmin && (
          <>
            <Tab.Screen
              name="Home"
              component={HomeStack}
              options={{
                tabBarLabel: 'Home',
              }}
            />
            <Tab.Screen
              name="Chat"
              component={ChatStack}
              options={{
                tabBarLabel: 'Chat',
              }}
            />
            <Tab.Screen
              name="Orders"
              component={OrdersStack}
              options={{
                tabBarLabel: 'Orders',
              }}
            />
            <Tab.Screen
              name="MyBlog"
              component={MyBlogStack}
              options={{
                tabBarLabel: 'My Blog',
              }}
            />
            <Tab.Screen
              name="Profile"
              component={ProfileStack}
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

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          header: () => (
            <>
              <CustomHeader />
              <CustomAppbar title="Home" isBackButton={true} isAction={true} ActionIcon={CancelIcon} isTransparent={true} />
            </>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function VendorStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="VendorScreen"
        component={VendorScreen}
        options={{
          header: () => (
            <>
              <CustomHeader />
              <CustomAppbar title="Vendor" isBackButton={true} isAction={true} ActionIcon={CancelIcon} isTransparent={true} />
            </>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function OrdersStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="OrdersScreen"
        component={OrdersScreen}
        options={{
          header: () => (
            <>
              <CustomAppbar title="Orders" isBackButton={false} isAction={false} />
            </>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function MyPlanStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyPlanScreen"
        component={MyPlanScreen}
        options={{
          header: () => (
            <>
              <CustomHeader />
              <CustomAppbar title="My Plan" isBackButton={true} isAction={true} ActionIcon={CancelIcon} isTransparent={true} />
            </>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          header: () => (
            <>
              <CustomHeader />
              <CustomAppbar title="Profile" isBackButton={true} isAction={true} ActionIcon={CancelIcon} isTransparent={true} />
            </>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function ChatStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{
          header: () => (
            <>
              <CustomHeader />
              <CustomAppbar title="Chat" isBackButton={true} isAction={true} ActionIcon={CancelIcon} />
            </>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function MyBlogStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyBlogScreen"
        component={MyBlogScreen}
        options={{
          header: () => (
            <>
              <CustomHeader />
              <CustomAppbar title="My Blog" isBackButton={true} isAction={true} ActionIcon={CancelIcon} />
            </>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

// The same structure for other stacks like VendorStack, OrdersStack, etc.

function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Home!</Text>
    </View>
  );
}

// function VendorScreen() {
//   return (
//     <View style={styles.container}>
//       <Text variant="headlineMedium">Vendor!</Text>
//     </View>
//   );
// }

function OrdersScreen() {
  return (
    <TopNavbar />
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
