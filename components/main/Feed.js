import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, FlatList, Button } from "react-native";
import { connect } from "react-redux";
import firebase from "firebase";
// import { Button } from "react-native-paper";
require("firebase/firestore");
function Feed(props) {
  const [posts, setPosts] = useState([]);
  console.log(posts + ".....................");
  console.log(props);
  useEffect(() => {
    if (
      props.usersFollowingLoaded == props.following.length &&
      props.following.length !== 0
    ) {
      console.log("insides");
      props.feed.sort(function (x, y) {
        return x.creation - y.creation;
      });
      setPosts(props.feed);
    }
  }, [props.usersFollowingLoaded, props.feed, props.likes]);
  console.log(posts);

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

  return (
    <View style={styles.container}>
      <View style={styles.containerGallery}>
        <FlatList
          numColumns={1}
          horizontal={false}
          data={posts}
          renderItem={({ item }) => (
            <View style={styles.containerImage}>
              <Text style={styles.container}>{item.user.name}</Text>
              <Image source={{ uri: item.downloadURL }} style={styles.image} />

              <Text
                onPress={() => {
                  props.navigation.navigate("Comment", {
                    postId: item.id,
                    uid: item.user.uid,
                  });
                }}
              >
                View Comments...
              </Text>
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
  containerInfo: {
    margin: 10,
  },
  containerGallery: {
    flex: 1,
  },
  containerImage: {
    flex: 1 / 3,
  },
  image: {
    flex: 1,
    aspectRatio: 1 / 1,
  },
});

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  following: store.userState.following,
  feed: store.usersState.feed,
  usersFollowingLoaded: store.usersState.usersFollowingLoaded,
});

export default connect(mapStateToProps, null)(Feed);
