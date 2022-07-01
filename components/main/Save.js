import React, { useState } from "react";
import firebase from "firebase";
require("firebase/firestore");
require("firebase/firebase-storage");
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Button,
  Pressable,
} from "react-native";
export default function Save(props) {
  const [caption, setCaption] = useState("");
  const uploadImage = async () => {
    const uri = props.route.params.image;
    const response = await fetch(uri);
    const blob = await response.blob();
    const task = firebase
      .storage()
      .ref()
      .child(
        `post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`
      )
      .put(blob);
    const taskProgress = (snapshot) => {
      console.log(`transferred : ${snapshot.bytesTransferred}`);
    };
    const taskCompleted = () => {
      task.snapshot.ref.getDownloadURL().then((snapshot) => {
        // console.log(snapshot);
        savePostData(snapshot);
      });
    };

    const taskError = (snapshot) => {
      console.log(snapshot);
    };

    task.on("state_changed", taskProgress, taskError, taskCompleted);
  };

  const savePostData = (downloadURL) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(firebase.auth().currentUser.uid)
      .collection("userPosts")
      .add({
        downloadURL,
        caption,
        likesCount: 0,
        creation: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(function () {
        props.navigation.popToTop();
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <Image source={{ uri: props.route.params.image }} />
      <TextInput
        style={{
          margin: 60,
          marginTop: 100,

          // borderWidth: 1,
          width: 250,
          textAlign: "center",
          height: 60,
          backgroundColor: "white",
          color: "black",
          elevation: 40,
          shadowColor: "#87ceeb",
          borderColor: "black",
          borderRadius: 0,
          borderWidth: 0.2,
        }}
        placeholder="Write Caption.."
        onChangeText={(caption) => setCaption(caption)}
      />
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
        onPress={() => {
          // navigation.navigate("Login");
          // this.onSignUp();
          uploadImage();
        }}
      >
        <Text
          style={{
            fontSize: 16,
            lineHeight: 21,
            fontWeight: "bold",
            letterSpacing: 2,
            color: "blue",
          }}
        >
          POST
        </Text>
      </Pressable>
    </View>
  );
}
