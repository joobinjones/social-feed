import { Formik, Form, Field } from "formik";
import { useStore } from "../context";
import { IPost, addPost } from "../context/postsReducer";
import { Box, Button } from "@chakra-ui/react";

const AddEditPost = (): JSX.Element => {
  const [{ numOfPosts, user }, dispatch] = useStore();
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
          <Box mt="10" d="flex" flexDirection="column" width="300px">
            <label htmlFor="title">Title</label>
            <Field type="text" id="title" name="title" placeholder="Post title" />
          </Box>
          <Box mt="10" d="flex" flexDirection="column" width="300px">
            <label htmlFor="body">Your Post...</label>
            <Field
              as="textarea"
              id="body"
              name="body"
              placeholder="Start typing something useless that you would like to share with random strangers for no apparent reason..."
            />
          </Box>
          <Button mt="10" width="100px" type="submit">
            Submit
          </Button>
        </Box>
      </Form>
    </Formik>
  );
};

export default AddEditPost;
