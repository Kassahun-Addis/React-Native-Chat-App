import {
  Keyboard,
  KeyboardAvoidingView,
  KeyboardAvoidingViewBase,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLayoutEffect } from "react";
import { Avatar } from "@rneui/base";
import { AntDesign, SimpleLineIcons, Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  FieldValue,
  getDocs,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { useFocusEffect } from "@react-navigation/native";
const ChatScreen = ({ navigation, route }) => {
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
  const auth = getAuth();

  const [input, setInput] = useState("");
  const [messages, setmessages] = useState([]);
  
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chat",
      headerBackTitleVisible: false,
      headerTitleAlign: "false",
      headerTitle: () =>(
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Avatar
            source={{
              uri: 
              messages[0]?.data?.photoUrl ||
              "https://img.favpng.com/8/18/8/online-chat-computer-icons-png-favpng-egTg6NbQBirwLwQRtFEDh8y33.jpg",
            }}
            rounded
          />
          <Text style={{ color: "white", marginLeft: 10, fontWeight: "700" }}>
            {route?.params?.chatName}
          </Text>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 80,
            marginRight: 20,
          }}
        >
          
          <TouchableOpacity>
            <SimpleLineIcons name="phone" size={24} color="white" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation,messages]);

  const sendMessage = async () => {
    Keyboard.dismiss();
    let msg = input;
    setInput("");
    const docRef = await addDoc(
      collection(db, `chats/${route.params.id}/messages`),
      {
        timestamp: serverTimestamp(),
        message: msg,
        displayName: auth.currentUser.displayName,
        photoUrl: auth.currentUser.photoURL,
        email: auth.currentUser.email,
      }
    );
  };

  useEffect(() => {
    const q = query(
      collection(db, `chats/${route.params.id}/messages`),
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
      setmessages(allItems);
    });

    () => unsubscribe();
  }, []);
  const scrollViewRef = useRef();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "white"}
        style={styles.container}
        keyboardVerticalOffset={90}
      >
        <>
          <ScrollView contentContainerStyle={{paddingTop:15}}
           ref={scrollViewRef}
           onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
          >
            {messages?.map(({ id, data }) =>
              data?.email === auth.currentUser.email ? (
                <View key={id} style={styles.receiver}>
                  <Avatar rounded size={30} position="absolute" bottom={-15} right={-5} 
                  containerStyle={{
                    position:"absolute", bottom:-15, right:-5
                  }}
                  source={{uri:data?.photoUrl}}/>
                  <Text style={styles.receiverText}>{data.message}</Text>
                </View>
              ) : (

                <View key={id} style={styles.sender}>
                  
                  <Avatar rounded size={30} position="absolute" bottom={-15} right={-5} 
                  containerStyle={{
                    position:"absolute", bottom:-15, left:-5
                  }}
                  source={{uri:data?.photoUrl}} />
                  <Text style={styles.senderText}>{data.message}</Text>
                  <Text style={styles.senderName}>{data.displayName}</Text>
                </View>
              )
            )}
            
          </ScrollView>
          <View style={styles.footer}>
            <TextInput
              placeholder="Message..."
              style={styles.textInput}
              value={input}
              onChangeText={(text) => setInput(text)}
            />
            <TouchableOpacity activeOpacity={0.5} onPress={sendMessage}>
              <SimpleLineIcons name="arrow-right" size={24} color="blue" />
            </TouchableOpacity>
          </View>
        </>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  receiver:{
    padding:15,
    backgroundColor:"#ECECEC",
    alignSelf:"flex-end",
    borderRadius:16,
    marginRight:15,
    marginBottom:20,
    maxWidth:"80%",
    position:"relative",
  },
  sender:{
    padding:15,
    backgroundColor:"#41628b",
    alignSelf:"flex-start",
    borderRadius:16,
    marginLeft:15,
    marginBottom:20,
    maxWidth:"80%",
    position:"relative",
  },
  senderText:{
    color:"white",
    fontWeight:"500",
    marginLeft:10,
    marginBottom:10,
  },
  receiverText:{
    color:"black",
    fontWeight:"500",
    marginLeft:10,
    marginBottom:10,
  },
  senderName:{
    left:10,
    paddingRight:10,
    fontSize:10,
    color:"white",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
  },
  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 5,
    borderColor: "transparent",
    backgroundColor: "#ECECEC",
    padding: 10,
    color: "gray",
    borderRadius: 30,
  },
});
