import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { CustomHeader } from '../components/shares/Nav';
import HomeScreen from '../screens/home';
import Login from '../screens/Login';

const Stack = createNativeStackNavigator();

export default function Navigation() {
    // const { user } = useAuth();

    return (
        <NavigationContainer>
          <Stack.Navigator
            // screenOptions={{
            //   header: () => <CustomHeader />, // Use custom header for every screen
            // }}
            >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Login" component={Login} />
            {/* <Stack.Screen name="Profile" component={ProfileScreen} /> */}
          </Stack.Navigator>
        </NavigationContainer>
      );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0, 
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: 100, 
  }, logo: {
    width: '100%',
  }
});

