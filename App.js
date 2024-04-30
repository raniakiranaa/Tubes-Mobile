import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Image, View } from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from './firebase/index.js'
import { useEffect } from 'react';
// import CustomHeader from './components/CustomHeader.js'
import HomeScreen from './screens/HomeScreen.js';

const Stack = createNativeStackNavigator();

const CustomHeader = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('./assets/Header.png')}
        resizeMode="contain"
      />
    </View>
  );
};

export default function App() {

  // basic CRUD function
  // const [data, setData] = useState([]);

  // const addData = async () => {
  //   try {
  //     const docRef = await addDoc(collection(db, "users"), {
  //       first: "Ada",
  //       last: "Lovelace",
  //       born: 1815
  //     });
  //     console.log("Document written with ID: ", docRef.id);
  //   } catch (e) {
  //     console.error("Error adding document: ", e);
  //   }
  // }

  // const updateData = async () => {
  //   const dataRef = doc(db, "collection_name", "data_id");

  //   // set the "pass" field for data id in collection name
  //   await updateDoc(dataRef, {
  //     pass: 'abc',
  //   })

  // }

  // const deleteData = async () => {
  //   await deleteDoc(doc(db, "collection_name", "data_id"))
  // }

  // const getData = async () => {
  //   const querySnapshot = await getDocs(collection(db, "users"));
  //   querySnapshot.forEach((doc) => {
  //     console.log(`${doc.id} => ${doc.data()}`);
  //     setData({
  //       ...doc.data(),
  //       id: doc.id,
  //     })
  //   });
  // }

  // useEffect(() => {
  //   getData();
  // }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          header: () => <CustomHeader />, // Use custom header for every screen
        }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        {/* <Stack.Screen name="Profile" component={ProfileScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 5000);

const styles = StyleSheet.create({
  container: {
    paddingTop: 75,
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
