import { Box } from "@chakra-ui/react";
import { IComment } from "../types";

const Comment = ({ comment }: { comment: IComment }): JSX.Element => {
  return (
    <Box backgroundColor="#f0f0f0" d="flex" flexDirection="column" width="100%">
      {comment.body}
    </Box>
  );
};

export default Comment;
