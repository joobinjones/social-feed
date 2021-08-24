import { Formik, Form, Field } from "formik";
import { useStore } from "../context";
import { IPost, addPost } from "../context/postsReducer";
import { Box, Button } from "@chakra-ui/react";

const AddEditPost = (): JSX.Element => {
  const [{ posts, numOfPosts, user }, dispatch] = useStore();
  const handleSubmit = ({ body, title }: { body: string; title: string }) => {
    const newPost: IPost = {
      body,
      title,
      author: user,
      numOfReactions: 0,
      publishedAt: new Date().toString(),
      postId: String(numOfPosts + 1),
    };
    dispatch(addPost(newPost));
  };

  return (
    <Formik initialValues={{ body: "", title: "" }} onSubmit={handleSubmit}>
      <Form>
        <Box d="flex" flexDirection="column">
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
        </Box>
      </Form>
    </Formik>
  );
};

export default AddEditPost;
