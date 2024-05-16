import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Image, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from './firebase/index.js'
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import Navigation from './navigation';

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
    <Navigation />

  );
}

SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 5000);

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
