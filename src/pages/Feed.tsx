import { useStore, IStore } from "../context";

const Feed = (): JSX.Element => {
  const { posts }: IStore = useStore();
  return (
    <>
      {posts.map((ele, idx) => (
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
