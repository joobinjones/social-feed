import { useState, useContext, createContext } from "react";

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

export interface IStore {
  posts: Array<IPost>;
  comments: Array<IComment>;
  setPosts: Function;
  setComments: Function;
  user: string;
  numOfPosts: number;
  setNumOfPosts: Function;
}

export const Store = createContext<IStore>({
  posts: [],
  comments: [],
  setPosts: () => {},
  setComments: () => {},
  user: "Jane Appleseed",
  numOfPosts: 0,
  setNumOfPosts: () => {},
});

export const useStore = () => useContext(Store);

export const StoreProvider = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => {
  const [posts, setPosts] = useState<Array<IPost>>([]);
  const [comments, setComments] = useState<Array<IComment>>([]);
  const [numOfPosts, setNumOfPosts] = useState<number>(0);
  const store = {
    posts,
    setPosts,
    comments,
    setComments,
    user: "Jane Appleseed",
    numOfPosts,
    setNumOfPosts,
  };
  return <Store.Provider value={store}>{children}</Store.Provider>;
};
