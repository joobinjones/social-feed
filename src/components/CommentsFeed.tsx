import Comment from "./Comment";
import { IComment } from "../types";
import { useStore } from "../context";
import { Box } from "@chakra-ui/react";
import AddEditComment from "./AddEditComment";

const CommentsFeed = ({ postId }: { postId: string }): JSX.Element => {
  const [{ comments, editingIds }] = useStore();
  return (
    <Box marginTop="10px">
      {comments[postId] && (
        <>
          {comments[postId].map((ele: IComment, idx: number) =>
            editingIds.commentId === ele.commentId ? (
              <AddEditComment comment={ele} postId={ele.postId} />
            ) : (
              <Comment key={idx} comment={ele} />
            )
          )}
        </>
      )}
    </Box>
  );
};

export default CommentsFeed;
