import {
  USER_STATE_CHANGE,
  USER_POST_STATE_CHANGE,
  USER_FOLLOWING_STATE_CHANGE,
  CLEAR_DATA,
  USERS_LIKES_STATE_CHANGE,
} from "../constant";

const initialState = {
  currentUser: null,
  posts: [],
  following: [],
  likes: [],
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case USER_STATE_CHANGE:
      return {
        ...state,
        currentUser: action.currentUser,
      };
    case USER_POST_STATE_CHANGE:
      return {
        ...state,
        posts: action.posts,
      };
    case USER_FOLLOWING_STATE_CHANGE:
      return {
        ...state,
        following: action.following,
      };

    case CLEAR_DATA: {
      return {
        currentUser: null,
        posts: [],
        following: [],
      };
    }
    default:
      return state;
  }
};
