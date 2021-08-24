export interface IPost {
  postId: string;
  author: string;
  publishedAt: string;
  title: string;
  body: string;
  numOfReactions: number;
}

export interface IComment {
  commentId: string;
  postId: string;
  author: string;
  body: string;
  publishedAt: string;
  numOfReactions: number;
}

export interface IPostsState {
  posts: Array<IPost>;
  comments: Array<IComment>;
  numOfPosts: number;
  user: string;
}

export interface IPostsAction {
  type: string;
  payload: IPost | IComment | string | number;
}

export const initialState: IPostsState = {
  posts: [],
  comments: [],
  numOfPosts: 0,
  user: "Jane Appleseed",
};

export const ADD_POST = "APP/FEED/ADD_POST";
export const addPost = (post: IPost) => ({
  type: ADD_POST,
  payload: post,
});

export const postsReducer = (
  state: IPostsState = initialState,
  action: IPostsAction
) => {
  switch (action.type) {
    case ADD_POST: {
      const postsCopy: Array<any> = [];
      state.posts.forEach((ele) => postsCopy.push(Object.assign({}, ele)));
      postsCopy.unshift(action.payload);
      return {
        ...state,
        numOfPosts: state.numOfPosts + 1,
        posts: postsCopy,
      };
    }
  }
};
