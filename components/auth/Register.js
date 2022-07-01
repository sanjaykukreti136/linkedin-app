import React, { Component } from "react";
import { View, Button, TextInput, Pressable, Text } from "react-native";
import firebase from "firebase";
export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
      keyword: [],
    };
    this.onSignUp = this.onSignUp.bind(this);
  }
  onSignUp() {
    const { email, password, name, keyword } = this.state;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .set({ name, email, keyword });
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    // firebase
    //   .auth()
    //   .createUserWithEmailAndPassword(email, password)
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }
  render() {
    return (
      <View
        style={{
          height: 1000,
          backgroundColor: "#87ceeb",
          marginTop: 50,
          borderWidth: 1,
          alignItems: "center",
        }}
      >
        <TextInput
          style={{
            marginTop: 100,
            borderWidth: 1,
            width: 250,
            textAlign: "center",
            height: 40,
            backgroundColor: "white",
            color: "#87ceeb",
          }}
          placeholder="Name"
          onChangeText={(name) => {
            this.setState({ name });
          }}
        />
        <TextInput
          style={{
            marginTop: 50,
            borderWidth: 1,
            width: 250,
            textAlign: "center",
            height: 40,
            backgroundColor: "white",
          }}
          placeholder="Email"
          onChangeText={(email) => {
            this.setState({ email });
          }}
        />
        <TextInput
          style={{
            marginTop: 50,
            borderWidth: 1,
            width: 250,
            textAlign: "center",
            height: 40,
            backgroundColor: "white",
          }}
          placeholder="password"
          secureTextEntry={true}
          onChangeText={(password) => {
            this.setState({ password });
          }}
        />

        <TextInput
          style={{
            marginTop: 50,
            borderWidth: 1,
            width: 250,
            textAlign: "center",
            height: 40,
            backgroundColor: "white",
          }}
          placeholder="Skills"
          onChangeText={(password) => {
            let keyword = password.split(",");
            this.setState({ keyword });
            // this.setState({ password });
          }}
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
            marginTop: 60,
            elevation: 40,
            shadowColor: "#52006A",
            borderColor: "black",
            borderRadius: 0,
            borderWidth: 0.2,
          }}
          title="Register"
          onPress={() => {
            // navigation.navigate("Login");
            this.onSignUp();
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
            SignUp
          </Text>
        </Pressable>
      </View>
    );
  }
}

export default Register;
