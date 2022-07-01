import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Pressable,
} from "react-native";
import firebase from "firebase";
// import { TouchableOpacity } from "react-native-gesture-handler";
require("firebase/firestore");

export default function Search(props) {
  const [users, setUsers] = useState([]);
  const fetchUsers = (search, isTrue) => {
    if (isTrue == false) {
      firebase
        .firestore()
        .collection("users")
        .where("name", ">=", search)
        .get()
        .then((snapshot) => {
          let users = snapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data };
          });
          setUsers(users);
        });
    } else {
      let a = [];
      firebase
        .firestore()
        .collection("users")
        .get()
        .then((snapshot) => {
          let users = snapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data };
          });
          console.log(users + " ................................." + search);
          for (let i = 0; i < users.length; i++) {
            if (users[i].keyword != undefined) {
              if (users[i].keyword.indexOf(search) != -1) {
                a.push(users[i]);
              }
            }
          }
          setUsers(a);
        });
    }
  };
  return (
    <View style={{ height: 1000, backgroundColor: "white" }}>
      <TextInput
        style={{
          margin: 30,

          // borderWidth: 1,
          width: 300,
          textAlign: "center",
          height: 40,
          backgroundColor: "white",
          color: "black",
          elevation: 40,
          shadowColor: "#87ceeb",
          borderColor: "black",
          borderRadius: 0,
          borderWidth: 0.7,
        }}
        placeholder="Type Here....."
        onChangeText={(search) => fetchUsers(search, false)}
      />

      <TextInput
        style={{
          margin: 30,

          width: 300,
          textAlign: "center",
          height: 40,
          backgroundColor: "white",
          color: "black",
          elevation: 40,
          shadowColor: "#87ceeb",
          borderColor: "black",
          borderRadius: 0,
          borderWidth: 0.7,
        }}
        placeholder="Type Here Skills....."
        onChangeText={(search) => fetchUsers(search, true)}
      />

      <FlatList
        style={{ height: 1000 }}
        numColumns={1}
        horizontal={false}
        data={users}
        renderItem={({ item }) => (
          <Pressable
            style={{
              paddingVertical: 12,
              paddingHorizontal: 32,
              borderRadius: 4,
              elevation: 3,
              backgroundColor: "white",
              marginLeft: 30,
              marginTop: 10,
              // elevation: 40,
              // shadowColor: "",
              borderColor: "#87ceeb",
              borderRadius: 0,
              borderWidth: 0.27,
              width: 200,
            }}
            onPress={() =>
              props.navigation.navigate("Profile", { uid: item.id })
            }
          >
            <Text
              style={{
                fontSize: 16,
                lineHeight: 15,
                fontWeight: "bold",
                letterSpacing: 0.25,
                color: "black",
              }}
            >
              {item.name}
            </Text>
          </Pressable>
          // <TouchableOpacity
          //   onPress={() =>
          //     props.navigation.navigate("Profile", { uid: item.id })
          //   }
          // >
          //   {/* <Text>{item.name}</Text>
          //    */}

          // </TouchableOpacity>
        )}
      />
    </View>
  );
}
