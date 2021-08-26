import { addComment } from "../context/postsReducer";
import { Box, Button } from "@chakra-ui/react";
import { changeCommentingId } from "../context/postsReducer";
import { FaComments } from "react-icons/fa";
import { Formik, Form, Field } from "formik";
import { IComment } from "../types";
import { offWhite, primaryBlue } from "../styles/palette";
import { useStore } from "../context";

const AddEditComment = ({
  comment,
  postId,
}: {
  comment?: IComment;
  postId: string;
}): JSX.Element => {
  const [{ user, numOfComments }, dispatch] = useStore();
  const handleSubmit = (
    { body }: { body: string },
    { resetForm }: { resetForm: Function }
  ) => {
    if (comment) {
      // edit comment state transaction
    } else {
      const newComment = {
        body,
        author: user,
        postId,
        commentId: String(numOfComments + 1),
        publishedAt: new Date().toString(),
        numOfReactions: 0,
      };
      dispatch(addComment(newComment));
    }
    resetForm();
  };
  return (
    <Box mt="10" borderTop="1px solid grey">
      <Formik
        initialValues={comment ? { body: comment.body } : { body: "" }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box mt="10" d="flex" justifyContent="space-between" alignItems="center">
              <Button
                onClick={() => dispatch(changeCommentingId({ postId: undefined }))}
                border="none"
              >
                <FaComments fontSize="20px" />
              </Button>
              <Box width="75%" d="flex" flexDirection="column">
                <Field
                  as="textarea"
                  style={{
                    fontFamily: "Arial",
                    borderRadius: "7px",
                    border: "1px solid black",
                  }}
                  id="body"
                  name="body"
                  placeholder="Type your comment here..."
                />
              </Box>
              <Button
                borderRadius="7px"
                borderColor="transparent"
                color={offWhite}
                backgroundColor={primaryBlue}
                type="submit"
              >
                Send
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default AddEditComment;
