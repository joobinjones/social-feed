import ActionsMenu from "./ActionsMenu";
import { Box, Button } from "@chakra-ui/react";
import { IComment } from "../types";
import {
  increaseCommentLikes,
  changeEditId,
  deleteComment,
} from "../context/postsReducer";
import { offWhite, primaryBlue } from "../styles/palette";
import Text from "./Text";
import { useStore } from "../context";
import { FaThumbsUp } from "react-icons/fa";

const Comment = ({ comment }: { comment: IComment }): JSX.Element => {
  const [{ editingIds }, dispatch] = useStore();
  return (
    <Box
      borderTop="1px solid grey"
      backgroundColor="#f0f0f0"
      d="flex"
      flexDirection="column"
      width="100%"
    >
      <Box d="flex" mt="5" justifyContent="space-between">
        <Text color="grey" mt="5px" mb="5px">
          {comment.author}
        </Text>
        <ActionsMenu
          editCall={() => dispatch(changeEditId({ commentId: comment.commentId }))}
          deleteCall={() => dispatch(deleteComment(comment.commentId))}
        />
      </Box>
      <Text fontSize="14px">{comment.body}</Text>
      <Box d="flex" justifyContent="space-between">
        <Text color="grey" mb="5px" mt="5px">
          {comment.publishedAt.substring(0, 21)}
        </Text>
        <Text fontSize="12px">
          <FaThumbsUp /> {comment.numOfReactions}
        </Text>
      </Box>
      <Button
        borderRadius="7px"
        mb="5"
        borderColor="transparent"
        width="30px"
        color={primaryBlue}
        fontSize="12px"
        onClick={() => dispatch(increaseCommentLikes(comment))}
      >
        Like
      </Button>
    </Box>
  );
};

export default Comment;
