import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  Button,
  Pressable,
} from "react-native";
import { connect } from "react-redux";
import firebase from "firebase";
// import { Button } from "react-native-paper";
require("firebase/firestore");
function Feed(props) {
  function removeDuplicates(arr) {
    let newArray = [];

    // Declare an empty object
    let uniqueObject = {};

    // Loop for the array elements
    for (let i in arr) {
      // Extract the title
      let objTitle = arr[i]["id"];

      // Use the title as the index
      uniqueObject[objTitle] = arr[i];
    }

    // Loop to push unique object into array
    for (let i in uniqueObject) {
      newArray.push(uniqueObject[i]);
    }
    return newArray;
    // return arr.filter((item, index) => arr.indexOf(item) === index);
  }

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (
      props.usersFollowingLoaded == props.following.length &&
      props.following.length !== 0
    ) {
      console.log("insides");
      props.feed.sort(function (x, y) {
        return x.creation - y.creation;
      });
      console.log(props.feed);
      let a = props.feed;
      console.log(a);
      a = removeDuplicates(props.feed);
      console.log(a);
      setPosts(a);
    }
  }, [props.usersFollowingLoaded]);

  const onLikePress = (userId, postId) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(userId)
      .collection("userPosts")
      .doc(postId)
      .collection("likes")
      .doc(firebase.auth().currentUser.uid)
      .set({});
  };

  const onDislikePress = (userId, postId) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(userId)
      .collection("userPosts")
      .doc(postId)
      .collection("likes")
      .doc(firebase.auth().currentUser.uid)
      .delete();
  };
  console.log(posts);
  return (
    <View style={styles.container}>
      <View style={styles.containerGallery}>
        <FlatList
          numColumns={1}
          horizontal={false}
          data={posts}
          renderItem={({ item }) => (
            <View style={styles.containerImage}>
              <Text style={styles.name}>{item.user.name}</Text>
              <Image source={{ uri: item.downloadURL }} style={styles.image} />
              <Text style={styles.namep}>{item.caption}</Text>

              <Pressable
                style={{
                  alignItems: "center",
                  // justifyContent: "center",
                  paddingVertical: 7,
                  paddingHorizontal: 17,
                  borderRadius: 4,
                  elevation: 3,
                  marginBottom: 6,
                  backgroundColor: "white",
                  // margin: 60,/
                  marginTop: 10,

                  shadowColor: "#52006A",
                  borderColor: "black",
                  borderRadius: 0,
                  borderWidth: 0.2,
                }}
                onPress={() => {
                  // navigation.navigate("Login");
                  props.navigation.navigate("Comment", {
                    postId: item.id,
                    uid: item.user.uid,
                  });
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
                  Community
                </Text>
              </Pressable>
              <Button
                onPress={() => {
                  props.navigation.navigate("Apply", {
                    postId: item.id,
                    uid: item.user.uid,
                  });
                }}
                title="Apply"
              />
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerInfo: {},
  containerGallery: {},
  containerImage: {
    flex: 1 / 3,
    margin: 20,
    // borderWidth: 2,
  },
  image: {
    flex: 1,
    aspectRatio: 1 / 1,
  },
  name: {
    fontSize: 20,
    marginBottom: 3,
    marginTop: 5,
    fontWeight: "bold",
    letterSpacing: 2,
  },
  namep: {
    fontSize: 15,
    marginBottom: 3,
    marginTop: 3,
    fontWeight: "70",
    letterSpacing: 0,
  },
});

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  following: store.userState.following,
  feed: store.usersState.feed,
  usersFollowingLoaded: store.usersState.usersFollowingLoaded,
});

export default connect(mapStateToProps, null)(Feed);
