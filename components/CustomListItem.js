import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Avatar, ListItem } from "@rneui/base";
import { collection, getFirestore, onSnapshot, orderBy, query } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const CustomListItem = ({ id, chatName, enterChat }) => {
  const [chatMessages, setchatMessages] = useState([])
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
  useEffect(() => {
    const q = query(
      collection(db, `chats/${id}/messages`),
      orderBy("timestamp")
    );
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let allItems = [];
      querySnapshot.forEach((doc) => {
        allItems.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setchatMessages(allItems);
    });

    () => unsubscribe();
  }, []);
  return (
    <ListItem key={id} bottomDivider onPress={()=>enterChat(id,chatName)}>
      <Avatar
      rounded
        source={{
          uri: chatMessages?.[0]?.data?.photoUrl || "https://cdn-icons-png.flaticon.com/512/147/147144.png",
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "800" }}>
          {chatName}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          {chatMessages?.[0]?.data?.displayName}: {chatMessages?.[0]?.data?.message}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({});
