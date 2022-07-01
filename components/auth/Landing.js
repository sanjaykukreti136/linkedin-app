import React from "react";
import { Text, View, Button, Pressable } from "react-native";
export default function Landing({ navigation }) {
  return (
    <View style={{ marginTop: 40, backgroundColor: "#ffc0cb", height: 1000 }}>
      <Pressable
        style={{
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 12,
          paddingHorizontal: 32,
          borderRadius: 4,
          elevation: 3,
          backgroundColor: "white",
          margin: 60,
          marginTop: 200,
          elevation: 40,
          shadowColor: "#52006A",
          borderColor: "black",
          borderRadius: 0,
          borderWidth: 0.2,
        }}
        title="Register"
        onPress={() => {
          navigation.navigate("Register");
        }}
      >
        <Text
          style={{
            fontSize: 16,
            lineHeight: 21,
            fontWeight: "bold",
            letterSpacing: 0.25,
            color: "red",
          }}
        >
          Register
        </Text>
      </Pressable>

      <Pressable
        style={{
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 12,
          paddingHorizontal: 32,
          borderRadius: 4,
          elevation: 3,
          backgroundColor: "white",
          margin: 60,
          marginTop: 30,
          elevation: 40,
          shadowColor: "#52006A",
          borderColor: "black",
          borderRadius: 0,
          borderWidth: 0.2,
        }}
        title="Register"
        onPress={() => {
          navigation.navigate("Login");
        }}
      >
        <Text
          style={{
            fontSize: 16,
            lineHeight: 21,
            fontWeight: "bold",
            letterSpacing: 0.25,
            color: "red",
          }}
        >
          Login
        </Text>
      </Pressable>
    </View>
  );
}

// const styles = StyleSheet.create({
//   button: {
//     alignItems: "center",
//     justifyContent: "center",
//     paddingVertical: 12,
//     paddingHorizontal: 32,
//     borderRadius: 4,
//     elevation: 3,
//     backgroundColor: "black",
//   },
//   text: {
//     fontSize: 16,
//     lineHeight: 21,
//     fontWeight: "bold",
//     letterSpacing: 0.25,
//     color: "white",
//   },
// });
