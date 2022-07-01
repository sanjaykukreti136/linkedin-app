import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  TextInput,
  Pressable,
} from "react-native";
import firebase from "firebase";
require("firebase/firestore");
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUsersData } from "../../redux/actions/index";

function Apply(props) {
  const [comments, setComments] = useState([]);
  const [postId, setPostId] = useState("");
  const [text, setText] = useState("");
  useEffect(() => {
    function validURL(str) {
      var pattern = new RegExp(
        "^(https?:\\/\\/)?" + // protocol
          "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
          "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
          "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
          "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
          "(\\#[-a-z\\d_]*)?$",
        "i"
      ); // fragment locator
      return !!pattern.test(str);
    }
    function matchUserToComment(comments) {
      //   console.log(props.users);
      for (let i = 0; i < comments.length; i++) {
        if (comments[i].hasOwnProperty("user")) {
          continue;
        }
        const user = props.users.find((x) => x.uid === comments[i].creator);
        if (user == undefined) {
          props.fetchUsersData(comments[i].creator, false);
        } else {
          comments[i].user = user;
        }
      }
      let a = [];
      for (let i = 0; i < comments.length; i++) {
        if (validURL(comments[i].text)) {
          a.push(comments[i]);
        }
      }
      setComments(a);
    }
    if (props.route.params.postId !== postId) {
      firebase
        .firestore()
        .collection("posts")
        .doc(props.route.params.uid)
        .collection("userPosts")
        .doc(props.route.params.postId)
        .collection("comments")
        .get()
        .then((snapshot) => {
          let comments = snapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data };
          });
          matchUserToComment(comments);
        });
      setPostId(props.route.params.postId);
    } else {
      matchUserToComment(comments);
    }
  }, [props.route.params.postId, props.users]);

  const onCommentSend = () => {
    firebase
      .firestore()
      .collection("posts")
      .doc(props.route.params.uid)
      .collection("userPosts")
      .doc(props.route.params.postId)
      .collection("comments")
      .add({
        creator: firebase.auth().currentUser.uid,
        text,
      });
  };
  console.log(comments);
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          margin: 20,
          justifyContent: "space-between",
        }}
      >
        <TextInput
          placeholder="Comment....."
          onChangeText={(text) => setText(text)}
          style={{
            // margin: 30,

            // borderWidth: 1,
            width: 200,
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
        />
        <Pressable
          style={{
            alignItems: "center",
            justifyContent: "center",
            // p/addingVertical: 12,
            // paddingHorizontal: 32,
            borderRadius: 4,
            height: 40,
            elevation: 3,
            backgroundColor: "white",
            // margin: 60,
            // marginBottom: 20,
            elevation: 40,
            shadowColor: "#52006A",
            borderColor: "black",
            borderRadius: 0,
            borderWidth: 0.2,
            width: 100,
          }}
          onPress={() => {
            // navigation.navigate("Login");
            // this.onSignUp();
            onCommentSend();
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
            SEND
          </Text>
        </Pressable>
        {/* <Button title="Send" onPress={() => onCommentSend()} /> */}
      </View>
      <FlatList
        numColumns={1}
        horizontal={false}
        data={comments}
        renderItem={({ item }) => (
          <View style={{ flexDirection: "row", marginLeft: 20, marginTop: 7 }}>
            {item.user !== undefined ? (
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                {item.user.name + " : "}
              </Text>
            ) : null}
            <Text style={{ fontSize: 20 }}>{item.text}</Text>
          </View>
        )}
      />
    </View>
  );
}

const mapStateToProps = (store) => ({
  users: store.usersState.users,
});

const mapDispatchProps = (dispatch) =>
  bindActionCreators({ fetchUsersData }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Apply);
