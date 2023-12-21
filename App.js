import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import { initializeApp } from 'firebase/app';
import AddChatScreen from "./screens/AddChatScreen";
import ChatScreen from "./screens/ChatScreen";

export default function App() {
  
 
    const firebaseConfig = {
  apiKey: "AIzaSyCuIZRTKdtydfBtEZO4qKIX7zysq_IvZfs",
  authDomain: "chat-app-22784.firebaseapp.com",
  projectId: "chat-app-22784",
  storageBucket: "chat-app-22784.appspot.com",
  messagingSenderId: "610780263964",
  appId: "1:610780263964:web:f9529c930da185b73251d9"
    };

  const app = initializeApp(firebaseConfig);
  const Stack = createNativeStackNavigator();
  const globalScreenOptions = {
    headerStyle: { backgroundColor: "#2C6BED"},
    headerTitleStyle: { color: "white" },
    headerTintColor: "white",
  };
 
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={globalScreenOptions}>
     
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="AddChat" component={AddChatScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
