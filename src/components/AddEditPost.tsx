import { Formik, Form, Field } from "formik";
import { useStore, IPost } from "../context";

const AddEditPost = (): JSX.Element => {
  const { posts, setPosts, user, numOfPosts, setNumOfPosts } = useStore();
  const handleSubmit = ({ body, title }: { body: string; title: string }) => {
    const newPost: IPost = {
      body,
      title,
      author: user,
      numOfReactions: 0,
      publishedAt: Date.now().toString(),
      postId: String(numOfPosts + 1),
    };
    const postsCopy: Array<IPost> = [];
    posts.forEach((ele) => postsCopy.push(Object.assign({}, ele)));
    postsCopy.unshift(newPost);
    setPosts(() => postsCopy);
    setNumOfPosts(() => numOfPosts + 1);
  };
  return (
    <Formik initialValues={{ body: "", title: "" }} onSubmit={handleSubmit}>
      <Form>
        <label htmlFor="title">Title</label>
        <Field type="text" id="title" name="title" placeholder="Post title" />
        <label htmlFor="body">Your Post...</label>
        <Field
          as="textarea"
          id="body"
          name="body"
          placeholder="Start typing something useless that you would like to share with random strangers for no apparent reason..."
        />
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default AddEditPost;
