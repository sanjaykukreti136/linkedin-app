import {
  USERS_DATA_STATE_CHANGE,
  USERS_POSTS_STATE_CHANGE,
  CLEAR_DATA,
  USERS_LIKES_STATE_CHANGE,
} from "../constant";

const initialState = {
  feed: [],
  users: [],
  usersFollowingLoaded: 0,
};
console.log(initialState);
export const users = (state = initialState, action) => {
  switch (action.type) {
    case USERS_DATA_STATE_CHANGE:
      return {
        ...state,
        users: [...state.users, action.user],
      };
    case USERS_POSTS_STATE_CHANGE:
      let ap = [];
      for (let i = 0; i < state.feed.length; i++) {
        ap.push(state.feed[i]);
      }
      if (action.posts != undefined) {
        for (let i = 0; i < action.posts.length; i++) {
          ap.push(action.posts[i]);
        }
      }

      return {
        ...state,
        usersFollowingLoaded: state.usersFollowingLoaded + 1,
        feed: ap,
      };

    case USERS_LIKES_STATE_CHANGE:
      return {
        ...state,
        feed: state.feed.map((post) =>
          post.id == action.postId
            ? { ...post, currentUserLike: action.currentUserLike }
            : post
        ),
      };
    case CLEAR_DATA: {
      return {
        users: [],
        usersFollowingLoaded: 0,
        feed: state.feed,
      };
    }
    default:
      return state;
  }
};
