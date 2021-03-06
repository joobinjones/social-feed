import posts from "../data/posts.json";
import comments from "../data/comments.json";
import {
  IPost,
  IPostsAction,
  IPostsState,
  IComment,
  IEditingIds,
  ICommentingId,
} from "../types";

export const initialState: IPostsState = {
  posts,
  comments,
  editingIds: { commentId: "", postId: "" },
  commentingId: { postId: "" },
  numOfPosts: 0,
  numOfComments: 0,
  user: "Jane Appleseed",
};

const ADD_POST = "APP/FEED/ADD_POST";
export const addPost = (post: IPost) => ({
  type: ADD_POST,
  payload: post,
});

const EDIT_POST = "APP/FEED/POST/EDIT_POST";
export const editPost = (post: IPost) => ({
  type: EDIT_POST,
  payload: post,
});

const DELETE_POST = "APP/FEED/POST/DELETE_POST";
export const deletePost = (postId: string) => ({
  type: DELETE_POST,
  payload: { postId },
});

const INCREASE_LIKES = "APP/FEED/POST/INCREASE_LIKES";
export const increaseLikes = (post: IPost) => ({
  type: INCREASE_LIKES,
  payload: post,
});

const ADD_COMMENT = "APP/FEED/POST/ADD_COMMENT";
export const addComment = (comment: IComment) => ({
  type: ADD_COMMENT,
  payload: comment,
});

const EDIT_COMMENT = "APP/FEED/POST/COMMENT/EDIT_COMMENT";
export const editComment = (comment: IComment) => ({
  type: EDIT_COMMENT,
  payload: comment,
});

const DELETE_COMMENT = "APP/FEED/POST/COMMENT/DELETE_COMMENT";
export const deleteComment = (comment: IComment) => ({
  type: DELETE_COMMENT,
  payload: comment,
});

const INCREASE_COMMENT_LIKES = "APP/FEED/POST/COMMENT/INCREASE_LIKES";
export const increaseCommentLikes = (comment: IComment) => ({
  type: INCREASE_COMMENT_LIKES,
  payload: comment,
});

const CHANGE_EDIT_ID = "APP/FEED/POST/CHANGE_EDIT_ID";
export const changeEditId = (editingIds: IEditingIds) => ({
  type: CHANGE_EDIT_ID,
  payload: editingIds,
});

const CHANGE_COMMENTING_ID = "APP/FEED/POST/CHANGE_COMMENTING_ID";
export const changeCommentingId = (commentingId: ICommentingId) => ({
  type: CHANGE_COMMENTING_ID,
  payload: commentingId,
});

export const copyArray = (arr: Array<any>) => {
  const arrCopy: Array<any> = [];
  arr?.forEach((ele) => arrCopy.push(Object.assign({}, ele)));
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

    case ADD_COMMENT: {
      const postId = payload.postId;
      const commentsCopy = state.comments[postId]
        ? copyArray(state.comments[payload.postId])
        : [];
      commentsCopy.unshift(payload);
      commentsCopy.sort((a, b) => a.numOfReactions - b.numOfReactions);
      return {
        ...state,
        comments: { ...state.comments, [payload.postId]: commentsCopy },
        numOfComments: state.numOfComments + 1,
      };
    }

    case EDIT_COMMENT: {
      const postId = payload.postId;
      const commentsCopy = copyArray(state.comments[postId]);
      const commentIndex = commentsCopy.findIndex(
        (ele) => ele.commentId === payload.commentId
      );
      if (commentIndex > -1) commentsCopy.splice(commentIndex, 1, payload);
      return { ...state, comments: { ...state.comments, [postId]: commentsCopy } };
    }

    case DELETE_COMMENT: {
      const postId = payload.postId;
      const commentsCopy = copyArray(state.comments[postId]);
      const commentIndex = commentsCopy.findIndex(
        (ele) => ele.commentId === payload.commentId
      );
      if (commentIndex > -1) commentsCopy.splice(commentIndex, 1);
      return { ...state, comments: { ...state.comments, [postId]: commentsCopy } };
    }

    case INCREASE_LIKES: {
      const postsCopy = copyArray(state.posts);
      const foundPost = postsCopy.find((ele) => ele.postId === payload.postId);
      if (foundPost) foundPost.numOfReactions++;
      return { ...state, posts: postsCopy };
    }

    case INCREASE_COMMENT_LIKES: {
      const postId = payload.postId;
      const commentsCopy = copyArray(state.comments[postId]);
      const foundComment = commentsCopy.find(
        (ele) => ele.commentId === payload.commentId
      );
      if (foundComment) foundComment.numOfReactions++;
      return { ...state, comments: { ...state.comments, [postId]: commentsCopy } };
    }

    case CHANGE_EDIT_ID: {
      return { ...state, editingIds: { ...state.editingIds, ...payload } };
    }

    case CHANGE_COMMENTING_ID: {
      return { ...state, commentingId: payload };
    }
  }
};
