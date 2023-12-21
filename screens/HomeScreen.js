import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  Platform
} from "react-native";
import React, { useCallback, useLayoutEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import CustomListItem from "../components/CustomListItem";
import { Avatar } from "@rneui/base";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import { useEffect } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { useFocusEffect } from "@react-navigation/native";

const HomeScreen = ({ navigation }) => {
  const auth = getAuth();

  const signOutUser = () => {
    signOut(auth).then(() => navigation.replace("Login"));
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "chats",
      headerStyle: { backgroundColor: "yellow" },
      headerTitleStyle: { color: "black" },
      headerTintColor: "black",
      headerLeft: () => (
        <View style={{ marginRight: 20,paddingLeft:Platform.OS==='android'?0:20 }}>
          <TouchableOpacity onPress={signOutUser} activeOpacity={0.5}>
            <Avatar
              rounded
              source={{
                uri: auth?.currentUser?.photoURL,
              }}
            />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            paddingRight:Platform.OS==='android'?0:20,
            flexDirection: "row",
            justifyContent: "space-between",
            width: 80,
            height: 20,
          }}
        >
          <TouchableOpacity activeOpacity={0.5}>
        
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate("AddChat")}
          >
            <SimpleLineIcons name="pencil" size={20} color="black" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const firebaseConfig = {
    apiKey: "AIzaSyCuIZRTKdtydfBtEZO4qKIX7zysq_IvZfs",
    authDomain: "chat-app-22784.firebaseapp.com",
    projectId: "chat-app-22784",
    storageBucket: "chat-app-22784.appspot.com",
    messagingSenderId: "610780263964",
    appId: "1:610780263964:web:f9529c930da185b73251d9"
  };


  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const [chats, setchats] = useState([]);
  const [loading, setloading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      querySnapshot(db);
    }, [db])
  );


  const querySnapshot = async(db) => {
    setloading(true)
    let allItems = [];
    let list = await getDocs(collection(db, "chats"));

    list &&
      list.forEach((doc) => {
      
        allItems.push({
          id: doc.id,
          data: doc.data(),
        });
      });

    setchats(allItems);
    setloading(false)
  };

  const enterChat = (id,chatName) =>{
    navigation.navigate("Chat",{
      id,
      chatName
    })
   }

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        {loading && 
        <View style={{backgroundColor:"white"}}>
        <ActivityIndicator size="large" style={{padding:12}} />
        </View>
        }
        {chats?.map(({ id, data: { chatName } }) => (
          <CustomListItem key={id} id={id} chatName={chatName} enterChat={enterChat} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { height: "100%" },
});
