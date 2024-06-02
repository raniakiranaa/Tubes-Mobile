import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from '../components/shares/Nav/BottomNavbar.js';
import CustomAppbar from '../components/shares/Appbar/CustomAppbar.js';
import { CustomHeader } from '../components/shares/Nav/CustomHeader.js';
import Login from '../screens/Login';
import Register from '../screens/register';
import Done from '../screens/done'
import OrderDetail from '../screens/order/OrderDetail.js';
import RatingReview from '../screens/order/RatingReview.js';
import DetailPromo from '../screens/promo/detailPromo.js';
import VendorDetailPage from '../screens/vendor/VendorDetail.js';
import ProductDetailPage from '../screens/vendor/ProductDetail.js';
import OrderConfirmationPage from '../screens/vendor/OrderConfirmation.js';
import SavedVendorPage from '../screens/vendor/SavedVendor.js';
import VendorSearchPage from '../screens/vendor/VendorSearch.js';
import DetailBlog from '../screens/blog/detailBlog.js';

const Stack = createNativeStackNavigator();

export default function Navigation({ isAdmin }) {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ contentStyle: { backgroundColor: 'white' } }}>
                {/* <Stack.Screen 
                    name="Login" 
                    component={Login} 
                    options={{ header: () => null }} 
                /> */}
                {/* <Stack.Screen 
                    name="Register" 
                    component={Register} 
                    options={{ header: () => null }} 
                /> */}
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
                    // Navigate back to the previous screen by pressing the back button
                    header: () => (
                    <CustomAppbar title="Order Detail" isBackButton={true} isAction={false} />
                    ),
                    tabBarStyle: { display: 'none' },
                }}
                />
                <Stack.Screen
                name="RatingReview"
                component={RatingReview}
                options={{
                    header: () => (
                    <CustomAppbar title="Rating and Review" isBackButton={true} isAction={false} />
                    ),
                    tabBarStyle: { display: 'none' },
                }}
                />
                <Stack.Screen
                name="VendorDetail"
                component={VendorDetailPage}
                options={{
                    header: () => (
                    <>
                        <CustomHeader />
                        <CustomAppbar title="Vendor Detail" isBackButton={true} isAction={false} isTransparent={true}/>
                    </>
                    ),
                    tabBarStyle: { display: 'none' },
                }}
                />
                <Stack.Screen
                name="VendorSearch"
                component={VendorSearchPage}
                options={{
                    header: () => (
                    <>
                        <CustomHeader />
                        <CustomAppbar title="Vendor" isBackButton={true} isAction={true} ActionIcon={'Save'} isTransparent={true}/>
                    </>
                    ),
                    tabBarStyle: { display: 'none' },
                }}
                />
                <Stack.Screen
                name="ProductDetail"
                component={ProductDetailPage}
                options={{
                    header: () => (
                    <>
                        <CustomHeader />
                        <CustomAppbar title="Product Detail" isBackButton={true} isAction={false} isTransparent={true}/>
                    </>
                    ),
                    tabBarStyle: { display: 'none' },
                }}
                />
                <Stack.Screen
                name="OrderConfirmation"
                component={OrderConfirmationPage}
                options={{
                    header: () => (
                    <>
                        <CustomHeader />
                        <CustomAppbar title="Order Confirmation" isBackButton={true} isAction={false} isTransparent={true}/>
                    </>
                    ),
                    tabBarStyle: { display: 'none' },
                }}
                />
                <Stack.Screen
                name="SavedVendor"
                component={SavedVendorPage}
                options={{
                    header: () => (
                    <>
                        <CustomHeader />
                        <CustomAppbar title="Saved Vendor" isBackButton={true} isAction={false} isTransparent={true}/>
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
                <Stack.Screen 
                    name="done" 
                    component={Done} 
                    options={{
                        header: () => <CustomHeader />
                    }}  
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
