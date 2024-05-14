import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Image, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from './firebase/index.js'
import { useEffect } from 'react';
import Navigation from './navigation';

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
