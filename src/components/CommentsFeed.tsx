import Comment from "./Comment";
import { IComment } from "../types";
import { useState, useEffect } from "react";
import { useStore } from "../context";

const CommentsFeed = ({ postId }: { postId: string }): JSX.Element => {
  const [{ comments }] = useStore();
  const [state, setState] = useState<Array<IComment>>([]);
  useEffect(() => {
    setState(() => comments.filter((ele: IComment) => ele.postId === postId));
  }, [comments, postId]);
  return (
    <>
      {state.map((ele: IComment, idx: number) => (
        <Comment key={idx} comment={ele} />
      ))}
    </>
  );
};

export default CommentsFeed;
