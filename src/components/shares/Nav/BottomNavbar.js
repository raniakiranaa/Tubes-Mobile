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
import VendorScreen from '../../../screens/vendor/index.js';
import { CustomHeader } from './CustomHeader.js';
import TopNavbar from './TopNavbar.js';
import OrderDetail from '../../../screens/order/OrderDetail.js';
import RatingReview from '../../../screens/order/RatingReview.js';
import Profile from '../../../screens/profile/index.js';
import HomeScreen from '../../../screens/home/index.js';
import DetailPromo from '../../../screens/promo/detailPromo.js';

import { CarouselCard, BigHomeCard, BigSearchCard, BigVendorCard, SmallCard } from './../Card';
import DetailBlog from '../../../screens/blog/detailBlog.js';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator({ isAdmin }) {
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
          height: 68,
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
              header: () => <CustomAppbar title="Vendor" isBackButton={false} isAction={false} />,
            }}
          />
          <Tab.Screen
            name="Orders"
            component={OrdersScreen}
            options={{
              tabBarLabel: 'Orders',
              header: () => <CustomAppbar title="Orders" isBackButton={false} isAction={false} />,
            }}
          />
          <Tab.Screen
            name="MyPlan"
            component={MyPlanScreen}
            options={{
              tabBarLabel: 'My Plan',
              header: () => <CustomAppbar title="My Plan" isBackButton={false} isAction={false} />,
            }}
          />
          <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
              tabBarLabel: 'Profile',
              // header: () => <CustomAppbar title="Profile" isBackButton={false} isAction={false} />,
              header: () => <CustomHeader />
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
            component={OrdersScreen}
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

export default function AppNavigator({ isAdmin }) {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          options={{ headerShown: false }}
        >
          {props => <TabNavigator {...props} isAdmin={isAdmin} />}
        </Stack.Screen>
        <Stack.Screen
          name="OrderDetail"
          component={OrderDetail}
          options={{
            header: () => (
              <>
                <CustomAppbar title="Order Detail" isBackButton={true} isAction={false} />
              </>
            ),
            tabBarStyle: { display: 'none' },
          }}
        />
        <Stack.Screen
          name="RatingReview"
          component={RatingReview}
          options={{
            header: () => (
              <>
                <CustomAppbar title="Rating and Review" isBackButton={true} isAction={false} />
              </>
            ),
            tabBarStyle: { display: 'none' },
          }}
        />
        <Stack.Screen 
                    name="DetailPromo" 
                    component={DetailPromo} 
                    options={{ header: () => null }} 
                />
        <Stack.Screen 
                    name="DetailBlog" 
                    component={DetailBlog} 
                    options={{ header: () => null }} 
                />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// function HomeScreen() {
//   const Poster = require('../../../../assets/icons/Poster.png');
//   return (
//     <View style={styles.container}>
//       {/* <Text variant="headlineMedium">Home!</Text> */}
//       {/* <CarouselCard image={Poster}/> */}
//       {/* <BigHomeCard image={Poster} title="Local Pride : Traditional Weddings" subtitle="Discover 10 recommendations for traditional weddings" foot="31 Mar 2024 - Mimi Fashion"/> */}
//       {/* <BigSearchCard image={Poster} title="JW Marriott Surabaya" type="Venue" location="Surabaya, Jawa Timur" price="IDR" rating="4.5"/> */}
//       {/* <BigVendorCard image={Poster} title="Royal Ballroom Package" subtitle="IDR 300,000,000" pax="330 pax"/> */}
//       {/* <SmallCard image={Poster} title="JW Marriott Surabaya" rating="4.8"/> */}
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
