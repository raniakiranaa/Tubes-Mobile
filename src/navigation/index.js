import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { CustomHeader } from '../components/shares/Nav';
import HomeScreen from '../screens/home';
import Login from '../screens/Login';
import Register from '../screens/register';
import { HeaderStart } from '../components/shares/Nav/HeaderStart';
import MyTheme from '../config/theme';
import MyPlan from '../screens/myplan'
import GuestManager from '../screens/guestmanager';
import BudgetPlanner from '../screens/budgetplanner';
import Done from '../screens/done'

const Stack = createNativeStackNavigator();

export default function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ contentStyle: { backgroundColor: 'white' } }}>
                <Stack.Screen 
                    name="Home" 
                    component={HomeScreen}
                    options={{
                        header: () => <CustomHeader />
                    }} 
                />
                <Stack.Screen 
                    name="Login" 
                    component={Login} 
                    options={{
                        header: () => null//<HeaderStart />
                    }}  
                />
                <Stack.Screen 
                    name="Register" 
                    component={Register} 
                    options={{
                        header: () => null//<HeaderStart />
                    }}  
                />
                <Stack.Screen 
                    name="MyPlan" 
                    component={MyPlan} 
                    options={{
                        header: () => <CustomHeader />
                    }}  
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


