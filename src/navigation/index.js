import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/home';
import Login from '../screens/Login';
import Register from '../screens/register';
import DetailPromo from '../screens/promo/detailPromo.js'; // Ensure the path is correct
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
                    name="Login" 
                    component={Login} 
                    options={{ header: () => null }} 
                />
                <Stack.Screen 
                    name="Register" 
                    component={Register} 
                    options={{ header: () => null }} 
                />
                <Stack.Screen 
                    name="Home" 
                    component={HomeScreen} 
                    options={{ header: () => null }} 
                />
                <Stack.Screen 
                    name="DetailPromo" 
                    component={DetailPromo} 
                    options={{ header: () => null }} 
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
