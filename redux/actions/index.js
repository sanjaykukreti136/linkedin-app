import firebase from "firebase";
import {
  USER_POST_STATE_CHANGE,
  USER_STATE_CHANGE,
  USER_FOLLOWING_STATE_CHANGE,
  USERS_DATA_STATE_CHANGE,
  USERS_POSTS_STATE_CHANGE,
  CLEAR_DATA,
  USERS_LIKES_STATE_CHANGE,
} from "../constant/index";
require("firebase/firestore");

// getState

export function clearData() {
  return (dispatch) => {
    dispatch({ type: CLEAR_DATA });
  };
}

export function fetchUser() {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          dispatch({ type: USER_STATE_CHANGE, currentUser: snapshot.data() });
        } else {
          console.log("does not exist user");
        }
      });
  };
}

export function fetchUserPosts() {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(firebase.auth().currentUser.uid)
      .collection("userPosts")
      .orderBy("creation", "asc")
      .get()
      .then((snapshot) => {
        let posts = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
        console.log(posts);
        dispatch({ type: USER_POST_STATE_CHANGE, posts });
      });
  };
}

export function fetchUserFollowing() {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("following")
      .doc(firebase.auth().currentUser.uid)
      .collection("userFollowing")
      .onSnapshot((snapshot) => {
        let following = snapshot.docs.map((doc) => {
          const id = doc.id;
          return id;
        });
        console.log(following + "user fl.");
        dispatch({ type: USER_FOLLOWING_STATE_CHANGE, following });
        for (let i = 0; i < following.length; i++) {
          // fetchUsersData(following[i].uid)
          dispatch(fetchUsersData(following[i], true));
        }
      });
  };
}

export function fetchUsersData(uid, getPosts) {
  return (dispatch, getState) => {
    const found = getState().usersState.users.some((el) => el.uid === uid);

    if (!found) {
      firebase
        .firestore()
        .collection("users")
        .doc(uid)
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            let user = snapshot.data();
            user.uid = snapshot.id;

            dispatch({ type: USERS_DATA_STATE_CHANGE, user });
          } else {
            console.log("does not exist user");
          }
        });
      if (getPosts) {
        dispatch(fetchUsersFollowingPosts(uid));
      }
    }
  };
}

export function fetchUsersFollowingPosts(uid) {
  return (dispatch, getState) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(uid)
      .collection("userPosts")
      .orderBy("creation", "asc")
      .get()
      .then((snapshot) => {
        console.log(snapshot.query);
        const uid = snapshot.docs[0].ref.path.split("/")[1];
        console.log({ snapshot, uid } + " ep wala ");
        const user = getState().usersState.users.find((el) => el.uid === uid);

        let posts = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data, user };
        });
        console.log(posts);
        for (let i = 0; i < posts.length; i++) {
          dispatch(fetchUsersFollowingLikes(uid, posts[i].id));
        }
        dispatch({ type: USERS_POSTS_STATE_CHANGE, posts, uid });
        console.log(getState());
      });
  };
}

export function fetchUsersFollowingLikes(uid, postId) {
  console.log("fetchuserfollowinglike");
  console.log(uid + " = " + postId);
  return (dispatch, getState) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(uid)
      .collection("userPosts")
      .doc(postId)
      .collection("likes")
      .doc(firebase.auth().currentUser.uid)
      .onSnapshot((snapshot) => {
        
        const postId = snapshot.ref.path.split("/")[3];
        let currentUserLike = false;
        if (snapshot.exists) {
          currentUserLike = true;
        }

        console.log(currentUserLike);
        dispatch({ type: USERS_LIKES_STATE_CHANGE, postId, currentUserLike });
      });
  };
}
