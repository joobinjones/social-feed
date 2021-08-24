import { Formik, Form, Field } from "formik";
import { useStore } from "../context";
import { addPost, editPost, changeEditId } from "../context/postsReducer";
import { IPost } from "../types";
import { Box, Button } from "@chakra-ui/react";

const AddEditPost = ({ post }: { post?: IPost }): JSX.Element => {
  const [{ numOfPosts, user }, dispatch] = useStore();
  const handleSubmit = ({ body, title }: { body: string; title: string }) => {
    if (post) {
      const editedPost: IPost = Object.assign({}, post);
      editedPost.title = title;
      editedPost.body = body;
      dispatch(editPost(editedPost));
      dispatch(changeEditId({ postId: undefined }));
    } else {
      const newPost: IPost = {
        body,
        title,
        author: user,
        numOfReactions: 0,
        publishedAt: new Date().toString(),
        postId: String(numOfPosts + 1),
      };
      dispatch(addPost(newPost));
    }
  };

  return (
    <Box d="flex" flexDirection="column" width="400px" backgroundColor="#f0f0f0">
      <Box margin="20">
        <Formik
          initialValues={
            post ? { body: post.body, title: post.title } : { body: "", title: "" }
          }
          onSubmit={handleSubmit}
        >
          <Form>
            <Box d="flex" flexDirection="column">
              <Box mt="10" d="flex" flexDirection="column" width="300px">
                <label htmlFor="title">Title</label>
                <Field
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Post title"
                />
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
              <Box mt="10">
                <Button width="100px" type="submit">
                  Submit
                </Button>
                {post && (
                  <Button
                    width="100px"
                    onClick={() => dispatch(changeEditId({ postId: null }))}
                  >
                    Cancel
                  </Button>
                )}
              </Box>
            </Box>
          </Form>
        </Formik>
      </Box>
    </Box>
  );
};

export default AddEditPost;
