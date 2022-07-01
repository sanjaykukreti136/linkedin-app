import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  Button,
  AppRegistry,
  Touchable,
  Pressable,
} from "react-native";
import { connect } from "react-redux";
import firebase from "firebase";
// import { Button } from "react-native-paper";
require("firebase/firestore");
function Profile(props) {
  const [user, setUser] = useState(null);
  const [userPost, setUserPosts] = useState([]);
  const [following, setFollowing] = useState(false);
  const { currentUser, posts } = props;
  useEffect(() => {
    console.log(JSON.stringify(props.following) + ".....");
    const { currentUser, posts } = props;
    if (props.route.params.uid === firebase.auth().currentUser.uid) {
      console.log("................");
      setUser(currentUser);
      setUserPosts(posts);
    } else {
      firebase
        .firestore()
        .collection("users")
        .doc(props.route.params.uid)
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            setUser(snapshot.data());
          } else {
            console.log("does not exist user");
          }
        });
      firebase
        .firestore()
        .collection("posts")
        .doc(props.route.params.uid)
        .collection("userPosts")
        .orderBy("creation", "asc")
        .get()
        .then((snapshot) => {
          let posts = snapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data };
          });
          setUserPosts(posts);
        });
    }
    if (props.following.indexOf(props.route.params.uid) > -1) {
      console.log(true);
      setFollowing(true);
    } else {
      console.log(false);
      setFollowing(false);
    }
  }, [props.route.params.uid, props.following]);

  const onFollow = () => {
    console.log("follow is called");
    firebase
      .firestore()
      .collection("following")
      .doc(firebase.auth().currentUser.uid)
      .collection("userFollowing")
      .doc(props.route.params.uid)
      .set({});
  };

  const onUnfollow = () => {
    console.log("unfollow is called");
    firebase
      .firestore()
      .collection("following")
      .doc(firebase.auth().currentUser.uid)
      .collection("userFollowing")
      .doc(props.route.params.uid)
      .delete();
  };

  const onLogut = () => {
    firebase.auth().signOut();
  };

  if (user === null) {
    return <View></View>;
  }
  console.log(JSON.stringify(user) + " from profile");
  return (
    <View style={styles.container}>
      <View style={{ width: 80, height: 80, marginLeft: 90 }}>
        <Image
          source={{
            uri: "https://icon-library.com/images/paul-18-512_63752.png",
          }}
          style={styles.imageP}
        />
      </View>
      <View style={styles.containerInfo}>
        <Text style={styles.name}> {user.name} </Text>

        <Text style={styles.username}> {user.email} </Text>
        <Button
          style={{
            alignItems: "center",
            textAlign: "center",
            margin: 10,
            fontSize: 23,
          }}
          title="USER SKILLS"
        />

        <FlatList
          numColumns={3}
          horizontal={false}
          data={user.keyword}
          renderItem={({ item }) => (
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                margin: 6,
                marginTop: 20,
                alignItems: "center",
              }}
            >
              {item}
            </Text>
          )}
        />

        {props.route.params.uid !== firebase.auth().currentUser.uid ? (
          <View style={{ marginTop: 30 }}>
            {following ? (
              <Button title="UnFollow" onPress={() => onUnfollow()} />
            ) : (
              <Button title="Follow" onPress={() => onFollow()} />
            )}
          </View>
        ) : (
          <Button title="Logout" onPress={() => onLogut()} />
        )}
      </View>
      <View style={styles.containerGallery}>
        <FlatList
          numColumns={3}
          horizontal={false}
          data={userPost}
          renderItem={({ item }) => (
            <View style={styles.containerImage}>
              <Pressable
                onPress={() => {
                  console.log("xx");
                  console.log(item);
                  props.navigation.navigate("Apply", {
                    postId: item.id,
                    uid: currentUser.uid,
                  });
                }}
                title="Apply"
              >
                <Image
                  source={{ uri: item.downloadURL }}
                  style={styles.image}
                />
              </Pressable>
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
  name: {
    fontSize: 40,
    textAlign: "center",
    fontFamily: "sans-serif-medium",
    fontWeight: "bold",
    letterSpacing: 2,
  },
  username: {
    fontSize: 15,
    marginTop: 20,
    textAlign: "center",
    fontFamily: "sans-serif-medium",
    fontWeight: "500",
    letterSpacing: 1,
    color: "#8b0000",
    marginBottom: 8,
  },
  containerInfo: {
    margin: 10,
  },
  containerGallery: {
    flex: 1,
    margin: 10,
  },
  containerImage: {
    flex: 1 / 3,
    margin: 2,
  },
  image: {
    flex: 1,
    aspectRatio: 1 / 1,
  },
  imageP: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "contain",

    aspectRatio: 1 / 1,
    marginLeft: 40,

    // margin: 60,
  },
});

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  posts: store.userState.posts,
  following: store.userState.following,
});
AppRegistry.registerComponent("AndroidFonts", () => AndroidFonts);
export default connect(mapStateToProps, null)(Profile);
