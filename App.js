import "react-native-gesture-handler";
import React, { Component } from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text } from "react-native";
// import * as firebase from "firebase";
import firebase from "firebase/app";
// import { initializeApp } from "firebase/app";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LandingScreen from "./components/auth/Landing";
import RegisterScreen from "./components/auth/Register";
import LoginScreen from "./components/auth/Login";
import MainScreen from "./components/Main";
import SaveScreen from "./components/main/Save";
import CommentScreen from "./components/main/Comment";
import ApplyScreen from "./components/main/Apply";
const Stack = createStackNavigator();
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./redux/reducer";
import thunk from "redux-thunk";
import AddScreen from "./components/main/Add";
const store = createStore(rootReducer, applyMiddleware(thunk));

const firebaseConfig = {
  apiKey: "AIzaSyDNJSP0by6sMBw2l7-CIuH_UVV12zbDpUI",
  authDomain: "clg-project-656ad.firebaseapp.com",
  projectId: "clg-project-656ad",
  storageBucket: "clg-project-656ad.appspot.com",
  messagingSenderId: "809833523754",
  appId: "1:809833523754:web:f8da70eee346c503a77153",
};
if (firebase.apps.length == 0) {
  firebase.initializeApp(firebaseConfig);
}

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      loggedIn: false,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        });
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        });
      }
    });
  }

  render() {
    const { loggedIn, loaded } = this.state;
    if (!loaded) {
      return (
        <View>
          <Text>Loading.....</Text>
        </View>
      );
    }
    if (!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen
              name="Landing"
              component={LandingScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Linkedin">
            <Stack.Screen name="Linkedin" component={MainScreen} />
            <Stack.Screen
              name="Add"
              component={AddScreen}
              navigation={this.props.navigation}
            />
            <Stack.Screen
              name="Save"
              component={SaveScreen}
              navigation={this.props.navigation}
            />
            <Stack.Screen
              name="Comment"
              component={CommentScreen}
              navigation={this.props.navigation}
            />
            <Stack.Screen
              name="Apply"
              component={ApplyScreen}
              navigation={this.props.navigation}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}
export default App;
