import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Image, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import Navigation from './src/navigation/index.js';
import BottomNavbar from './src/components/shares/Nav/index.js';
import VendorScreen from './src/screens/vendor/index.js';
import Login from './src/screens/Login/index.js';
import OrderDetail from './src/screens/order/OrderDetail.js';
import RatingReview from './src/screens/order/RatingReview.js';
import VendorDetailPage from './src/screens/vendor/VendorDetail.js';
import ProductDetailPage from './src/screens/vendor/ProductDetail.js';
import OrderConfirmationPage from './src/screens/vendor/OrderConfirmation.js';
import SavedVendorPage from './src/screens/vendor/SavedVendor.js';

export default function App() {
  const [fontsLoaded] = useFonts({
    poppinsBlack: require("./assets/fonts/poppinsblack.ttf"),
    poppinsBlackItalic: require("./assets/fonts/poppinsblackitalic.ttf"),
    poppinsBold: require("./assets/fonts/poppinsbold.ttf"),
    poppinsBoldItalic: require("./assets/fonts/poppinsbolditalic.ttf"),
    poppinsExtraBold: require("./assets/fonts/poppinsextrabold.ttf"),
    poppinsExtraBoldItalic: require("./assets/fonts/poppinsextrabolditalic.ttf"),
    poppinsExtraLight: require("./assets/fonts/poppinsextralight.ttf"),
    poppinsExtraLightItalic: require("./assets/fonts/poppinsextralightitalic.ttf"),
    poppinsItalic: require("./assets/fonts/poppinsitalic.ttf"),
    poppinsLight: require("./assets/fonts/poppinslight.ttf"),
    poppinsLightItalic: require("./assets/fonts/poppinslightitalic.ttf"),
    poppinsMedium: require("./assets/fonts/poppinsmedium.ttf"),
    poppinsMediumItalic: require("./assets/fonts/poppinsmediumitalic.ttf"),
    poppinsRegular: require("./assets/fonts/poppinsregular.ttf"),
    poppinsSemiBold: require("./assets/fonts/poppinssemibold.ttf"),
    poppinsSemiBoldItalic: require("./assets/fonts/poppinssemibolditalic.ttf"),
    poppinsThin: require("./assets/fonts/poppinsthin.ttf"),
    poppinsThinItalic: require("./assets/fonts/poppinsthinitalic.ttf")
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <BottomNavbar />
    // <VendorScreen />
    // <Login />
    // <Navigation />
    // <OrderDetail />
    // <RatingReview />
    // <VendorDetailPage />
    // <ProductDetailPage />
    // <OrderConfirmationPage />
    // <SavedVendorPage />
  );
}

SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 1000);

const styles = StyleSheet.create({
  container: {
    // position: 'absolute',
    top: 0,
    left: 0,
    right: 0, 
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#ffff',
    alignItems: 'center',
    justifyContent: 'center',
    height: 100, 
  },
});
