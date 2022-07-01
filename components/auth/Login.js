import React, { Component } from "react";
import { View, Button, TextInput } from "react-native";
import firebase from "firebase";
export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.onSignUp = this.onSignUp.bind(this);
  }
  onSignUp() {
    const { email, password, name } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    return (
      <View>
        <TextInput
          style={{ margin: 30 }}
          placeholder="Email"
          onChangeText={(email) => {
            this.setState({ email });
          }}
        />
        <TextInput
          placeholder="password"
          secureTextEntry={true}
          onChangeText={(password) => {
            this.setState({ password });
          }}
        />
        <Button
          onPress={() => {
            this.onSignUp();
          }}
          title="Signup"
        />
      </View>
    );
  }
}

export default Login;
