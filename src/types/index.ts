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

export interface IEditingIds {
  postId?: string | undefined | null;
  commentId?: string | undefined | null;
}

export interface IPostsState {
  posts: Array<IPost>;
  comments: Array<IComment>;
  numOfPosts: number;
  editingIds: IEditingIds;
  user: string;
}

export interface IPostsAction {
  type: string;
  payload: any;
}