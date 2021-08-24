import { IPost, IPostsAction, IPostsState, IComment, IEditingIds } from "../types";

export const initialState: IPostsState = {
  posts: [],
  comments: [],
  editingIds: { commentId: "", postId: "" },
  numOfPosts: 0,
  user: "Jane Appleseed",
};

export const ADD_POST = "APP/FEED/ADD_POST";
export const addPost = (post: IPost) => ({
  type: ADD_POST,
  payload: post,
});

export const EDIT_POST = "APP/FEED/POST/EDIT_POST";
export const editPost = (post: IPost) => ({
  type: EDIT_POST,
  payload: post,
});

export const DELETE_POST = "APP/FEED/POST/DELETE_POST";
export const deletePost = (postId: string) => ({
  type: DELETE_POST,
  payload: { postId },
});

export const INCREASE_LIKES = "APP/FEED/POST/INCREASE_LIKES";
export const increaseLikes = (post: IPost) => ({
  type: INCREASE_LIKES,
  payload: post,
});

export const CHANGE_EDIT_ID = "APP/FEED/POST/CHANGE_EDIT_ID";
export const changeEditId = (editingIds: IEditingIds) => ({
  type: CHANGE_EDIT_ID,
  payload: editingIds,
});

export const copyArray = (arr: Array<any>) => {
  const arrCopy: Array<IPost | IComment> = [];
  arr.forEach((ele) => arrCopy.push(Object.assign({}, ele)));
  return arrCopy;
};

export const findPostIndex = (arr: Array<any>, postId: string) => {
  return arr.findIndex((ele) => ele.postId === postId);
};

export const postsReducer = (
  state: IPostsState = initialState,
  { type, payload }: IPostsAction
) => {
  switch (type) {
    case ADD_POST: {
      const postsCopy = copyArray(state.posts);
      postsCopy.unshift(payload);
      return {
        ...state,
        numOfPosts: state.numOfPosts + 1,
        posts: postsCopy,
      };
    }
    case EDIT_POST: {
      const postsCopy = copyArray(state.posts);
      const postIndex = findPostIndex(postsCopy, payload.postId);
      if (postIndex > -1) postsCopy.splice(postIndex, 1, payload);
      return { ...state, posts: postsCopy };
    }
    case DELETE_POST: {
      const postsCopy = copyArray(state.posts);
      const postIndex = findPostIndex(postsCopy, payload.postId);
      if (postIndex > -1) postsCopy.splice(postIndex, 1);
      return { ...state, posts: postsCopy };
    }
    case INCREASE_LIKES: {
      const postsCopy = copyArray(state.posts);
      const foundPost = postsCopy.find((ele) => ele.postId === payload.postId);
      if (foundPost) foundPost.numOfReactions++;
      return { ...state, posts: postsCopy };
    }
    case CHANGE_EDIT_ID: {
      return { ...state, editingIds: { ...state.editingIds, ...payload } };
    }
  }
};
