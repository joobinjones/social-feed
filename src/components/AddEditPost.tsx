import { addPost, editPost, changeEditId } from "../context/postsReducer";
import { Box, Button } from "@chakra-ui/react";
import { primaryBlue, offWhite } from "../styles/palette";
import { Formik, Form, Field } from "formik";
import { IPost } from "../types";
import { useStore } from "../context";

const AddEditPost = ({ post }: { post?: IPost }): JSX.Element => {
  const [{ numOfPosts, user }, dispatch] = useStore();
  const handleSubmit = (
    { body, title }: { body: string; title: string },
    { resetForm }: { resetForm: Function }
  ) => {
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
    resetForm();
  };

  return (
    <Box
      mb={post ? "20" : ""}
      d="flex"
      flexDirection="column"
      width="400px"
      backgroundColor={offWhite}
      borderRadius="7px"
    >
      <Box margin="20">
        <Formik
          initialValues={
            post ? { body: post.body, title: post.title } : { body: "", title: "" }
          }
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Box d="flex" flexDirection="column">
                <Box mt="10" d="flex" flexDirection="column" width="300px">
                  <label htmlFor="title">Title</label>
                  <Field
                    type="text"
                    id="title"
                    style={{ borderRadius: "7px", border: "1px solid grey" }}
                    name="title"
                    placeholder="Post title"
                  />
                </Box>
                <Box mt="10" d="flex" flexDirection="column" width="300px">
                  <label htmlFor="body">Your Post...</label>
                  <Field
                    as="textarea"
                    style={{
                      fontFamily: "Arial",
                      borderRadius: "7px",
                      border: "1px solid grey",
                      height: "100px",
                    }}
                    id="body"
                    name="body"
                    placeholder="Start typing something useless that you would like to share with random strangers for no apparent reason..."
                  />
                </Box>
                <Box mt="10">
                  <Button
                    width="100px"
                    backgroundColor={primaryBlue}
                    borderRadius="7px"
                    borderColor="transparent"
                    color={offWhite}
                    type="submit"
                  >
                    Submit
                  </Button>
                  {post && (
                    <Button
                      width="100px"
                      borderRadius="7px"
                      borderColor="transparent"
                      backgroundColor="white"
                      onClick={() => dispatch(changeEditId({ postId: undefined }))}
                    >
                      Cancel
                    </Button>
                  )}
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default AddEditPost;
