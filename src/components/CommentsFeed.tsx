import Comment from "./Comment";
import { IComment } from "../types";
import { useStore } from "../context";
import { Box } from "@chakra-ui/react";

const CommentsFeed = ({ postId }: { postId: string }): JSX.Element => {
  const [{ comments }] = useStore();
  return (
    <Box marginTop="10px">
      {comments[postId] && (
        <>
          <Comment comment={comments[postId][0]} />
          {comments[postId].map((ele: IComment, idx: number) =>
            idx === 0 ? null : <Comment key={idx} comment={ele} />
          )}
        </>
      )}
    </Box>
  );
};

export default CommentsFeed;
