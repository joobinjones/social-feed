import { Box, Button } from "@chakra-ui/react";
import { FaThumbsUp } from "react-icons/fa";
import { IComment } from "../types";
import { increaseCommentLikes } from "../context/postsReducer";
import { offWhite, primaryBlue } from "../styles/palette";
import Text from "./Text";
import { useStore } from "../context";

const Comment = ({ comment }: { comment: IComment }): JSX.Element => {
  const [globalState, dispatch] = useStore();
  return (
    <Box
      borderTop="1px solid grey"
      backgroundColor="#f0f0f0"
      d="flex"
      flexDirection="column"
      width="100%"
    >
      <Text color="grey" mt="5px" mb="5px">
        {comment.author}
      </Text>
      <Text fontSize="14px">{comment.body}</Text>
      <Box d="flex" justifyContent="space-between">
        <Text color="grey" mb="5px" mt="5px">
          {comment.publishedAt.substring(0, 21)}
        </Text>
        <Button
          borderRadius="7px"
          mb="5"
          borderColor="transparent"
          backgroundColor={primaryBlue}
          color={offWhite}
          onClick={() => dispatch(increaseCommentLikes(comment))}
        >
          <FaThumbsUp />
        </Button>
      </Box>
    </Box>
  );
};

export default Comment;
