import { useStore } from "../context";
import { IPost } from "../context/postsReducer";
const Feed = (): JSX.Element => {
  const [{ posts }] = useStore();
  return (
    <>
      {posts.map((ele: IPost, idx: number) => (
        <div key={idx}>
          <div>{ele.title}</div>
          <div>{ele.body}</div>
          <div>{ele.author}</div>
          <div>{ele.publishedAt}</div>
        </div>
      ))}
    </>
  );
};

export default Feed;
