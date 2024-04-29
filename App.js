import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from './firebase/index.js'
import { useEffect } from 'react';

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
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 5000);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
