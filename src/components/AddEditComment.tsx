import { Box, Button } from "@chakra-ui/react";
import { FaComments } from "react-icons/fa";
import { Formik, Form, Field } from "formik";
import { IComment } from "../types";
import { offWhite, primaryBlue } from "../styles/palette";

const AddEditComment = ({ comment }: { comment?: IComment }): JSX.Element => {
  const handleSubmit = (
    { body }: { body: string },
    { resetForm }: { resetForm: Function }
  ) => {
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
              <FaComments />
              <Box width="400px">
                <Field
                  as="textarea"
                  width="400px"
                  id="comment-box"
                  name="comment-box"
                  placeholder="Type your comment here..."
                />
              </Box>
              <Button
                borderRadius="7px"
                color={offWhite}
                backgroundColor={primaryBlue}
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
