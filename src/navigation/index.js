import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { CustomHeader } from '../components/shares/Nav';
import HomeScreen from '../screens/home';
import Login from '../screens/Login';
import { HeaderStart } from '../components/shares/Nav/HeaderStart';
import MyTheme from '../config/theme';

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
                        header: () => <HeaderStart />
                    }}  
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

