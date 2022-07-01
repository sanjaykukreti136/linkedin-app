import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, FlatList, Button } from "react-native";
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

  return (
    <View style={styles.container}>
      <View style={styles.containerInfo}>
        <Text> {user.name} </Text>
        <Text> {user.email} </Text>
        {props.route.params.uid !== firebase.auth().currentUser.uid ? (
          <View>
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
              <Image source={{ uri: item.downloadURL }} style={styles.image} />
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
  posts: store.userState.posts,
  following: store.userState.following,
});

export default connect(mapStateToProps, null)(Profile);
