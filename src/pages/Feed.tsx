import AddEditPost from "../components/AddEditPost";
import { IPost } from "../types";
import Post from "../components/Post";
import { useStore } from "../context";

const Feed = (): JSX.Element => {
  const [{ posts, editingIds }] = useStore();
  return (
    <>
      {posts.map((ele: IPost, idx: number) =>
        editingIds.postId === ele.postId ? (
          <AddEditPost post={ele} />
        ) : (
          <Post key={idx} post={ele} />
        )
      )}
    </>
  );
};

export default Feed;
