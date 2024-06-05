import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from '../components/shares/Nav/BottomNavbar.js';
import CustomAppbar from '../components/shares/Appbar/CustomAppbar.js';
import { CustomHeader } from '../components/shares/Nav/CustomHeader.js';
import Login from '../screens/Login';
import Register from '../screens/register';
import Done from '../screens/done';
import OrderDetail from '../screens/order/OrderDetail.js';
import RatingReview from '../screens/order/RatingReview.js';
import DetailPromo from '../screens/promo/detailPromo.js';
import VendorDetailPage from '../screens/vendor/VendorDetail.js';
import ProductDetailPage from '../screens/vendor/ProductDetail.js';
import OrderConfirmationPage from '../screens/vendor/OrderConfirmation.js';
import SavedVendorPage from '../screens/vendor/SavedVendor.js';
import VendorSearchPage from '../screens/vendor/VendorSearch.js';
import DetailBlog from '../screens/blog/detailBlog.js';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { firebase_auth } from '../firebase/index.js';
import BudgetPlanner from '../screens/budgetplanner/index.js';
import GuestManager from '../screens/guestmanager/index.js';

const Stack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();

function AuthLayout({ isAdmin }) {
    return (
        <AuthStack.Navigator>
            <AuthStack.Screen
                name="Main"
                options={{ headerShown: false }}
            >
                {props => <TabNavigator {...props} isAdmin={isAdmin} />}
            </AuthStack.Screen>
            <AuthStack.Screen
                name="OrderDetail"
                component={OrderDetail}
                options={{
                    header: () => (
                        <CustomAppbar title="Order Detail" isBackButton={true} isAction={false} />
                    ),
                    tabBarStyle: { display: 'none' },
                }}
            />
            <AuthStack.Screen
                name="RatingReview"
                component={RatingReview}
                options={{
                    header: () => (
                        <CustomAppbar title="Rating and Review" isBackButton={true} isAction={false} />
                    ),
                    tabBarStyle: { display: 'none' },
                }}
            />
            <AuthStack.Screen
                name="VendorDetail"
                component={VendorDetailPage}
                options={{
                    header: () => (
                        <>
                            <CustomHeader />
                            <CustomAppbar title="Vendor Detail" isBackButton={true} isAction={false} isTransparent={true} />
                        </>
                    ),
                    tabBarStyle: { display: 'none' },
                }}
            />
            <AuthStack.Screen
                name="VendorSearch"
                component={VendorSearchPage}
                options={{
                    header: () => (
                        <>
                            <CustomHeader />
                            <CustomAppbar title="Vendor" isBackButton={true} isAction={true} ActionIcon={'Save'} isTransparent={true} />
                        </>
                    ),
                    tabBarStyle: { display: 'none' },
                }}
            />
            <AuthStack.Screen
                name="ProductDetail"
                component={ProductDetailPage}
                options={{
                    header: () => (
                        <>
                            <CustomHeader />
                            <CustomAppbar title="Product Detail" isBackButton={true} isAction={false} isTransparent={true} />
                        </>
                    ),
                    tabBarStyle: { display: 'none' },
                }}
            />
            <AuthStack.Screen
                name="OrderConfirmation"
                component={OrderConfirmationPage}
                options={{
                    header: () => (
                        <>
                            <CustomHeader />
                            <CustomAppbar title="Order Confirmation" isBackButton={true} isAction={false} isTransparent={true} />
                        </>
                    ),
                    tabBarStyle: { display: 'none' },
                }}
            />
            <AuthStack.Screen
                name="SavedVendor"
                component={SavedVendorPage}
                options={{
                    header: () => (
                        <>
                            <CustomHeader />
                            <CustomAppbar title="Saved Vendor" isBackButton={true} isAction={false} isTransparent={true} />
                        </>
                    ),
                    tabBarStyle: { display: 'none' },
                }}
            />
            <AuthStack.Screen
                name="DetailPromo"
                component={DetailPromo}
                options={{ header: () => null }}
            />
            <AuthStack.Screen
                name="DetailBlog"
                component={DetailBlog}
                options={{ header: () => null }}
            />
            <AuthStack.Screen
                name="Done"
                component={Done}
                options={{
                    header: () => <CustomHeader />
                }}
            />
            <AuthStack.Screen
                    name="BudgetPlanner"
                    component={BudgetPlanner}
                    options={{
                        header: () => (
                        <>
                            <CustomHeader />
                            <CustomAppbar title="Budget Planner" isBackButton={true} isAction={false} isTransparent={true}/>
                        </>
                        ),
                        tabBarStyle: { display: 'none' },
                    }}
            />
            <AuthStack.Screen
                name="GuestManager"
                component={GuestManager}
                options={{
                    header: () => (
                    <>
                        <CustomHeader />
                        <CustomAppbar title="Guest Manager" isBackButton={true} isAction={false} isTransparent={true}/>
                    </>
                    ),
                    tabBarStyle: { display: 'none' },
                }}
            />
        </AuthStack.Navigator>
    );
}

export default function Navigation({ isAdmin }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(firebase_auth, (user) => {
            console.log('user', user);
            setUser(user);
        });
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login" screenOptions={{ contentStyle: { backgroundColor: 'white' } }}>
                {user ? (
                    <Stack.Screen name="Auth" options={{ headerShown: false }}>
                        {props => <AuthLayout {...props} isAdmin={isAdmin} />}
                    </Stack.Screen>
                ) : (
                    <>
                        <Stack.Screen
                            name="Login"
                            component={Login}
                            options={{ header: () => null }}
                        />
                        <Stack.Screen
                            name="Register"
                            component={Register}
                            options={{ header: () => null }}
                        />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
