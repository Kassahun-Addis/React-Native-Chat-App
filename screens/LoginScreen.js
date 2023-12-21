import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { Image } from "@rneui/base";
import { Button, Input } from "@rneui/themed";
import { KeyboardAvoidingView } from "react-native";
import { getAuth,signInWithEmailAndPassword  } from "firebase/auth";
const LoginScreen = ({navigation}) => {
  const auth = getAuth();
  const [email, setemail] = useState("kassahunaddiss6@gmail.com");
  const [password, setpassword] = useState("11111111");

  useEffect(() => {
    const unsubscribe= auth.onAuthStateChanged(authUser=>{
      
        if(authUser){
            navigation.replace("Home")
        }
    })
    return unsubscribe;
  }, [navigation,auth])
  

  const signIn = () => {
    signInWithEmailAndPassword(auth,email,password).catch(e=>alert(e))
  };


  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style="light" />
      <Image
        source={require("../assets/signallogo.png")}
        style={{ width: 160, height: 160,marginBottom:32}}
      />
      <View style={styles.inputContainer}>
        <Input
          placeholder="Email"
          autoFocus
          type="Email"
          value={email}
          onChangeText={(text) => setemail(text)}
        />
        <Input
          placeholder="Password"
          type="password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setpassword(text)}
          onSubmitEditing={signIn}
        />
        <Button
          containerStyle={styles.button}
          title={"Login"}
          onPress={signIn}
        />
        <Button
          containerStyle={styles.button}
          type="outline"
          title={"Register"}
          onPress={
            ()=>navigation.navigate("Register")
          }
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        padding:10,
        backgroundColor:"white" 
    },
  inputContainer: {
    width:300,
    alignItems:"center",
        justifyContent:"center",
  },
  containerStyle: {},
  button:{
    width:200,
    marginTop:10
  }
});
