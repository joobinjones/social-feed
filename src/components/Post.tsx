import ActionsMenu from "./ActionsMenu";
import AddEditComment from "./AddEditComment";
import { Box, Button } from "@chakra-ui/react";
import CommentsFeed from "./CommentsFeed";
import { FaThumbsUp } from "react-icons/fa";
import {
  increaseLikes,
  changeEditId,
  deletePost,
  changeCommentingId,
} from "../context/postsReducer";
import { IPost } from "../types";
import { primaryBlue } from "../styles/palette";
import Text from "./Text";
import { useStore } from "../context";

const Post = ({ post }: { post: IPost }): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [{ commentingId, comments }, dispatch] = useStore();
  return (
    <Box
      mb="20"
      backgroundColor="#f0f0f0"
      d="flex"
      flexDirection="column"
      width="700px"
      borderRadius="7px"
    >
      <Box margin="20">
        <Box d="flex" justifyContent="space-between">
          <Text fontSize="24px">{post.title}</Text>
          <Box>
            <ActionsMenu
              editCall={() => dispatch(changeEditId({ postId: post.postId }))}
              deleteCall={() => dispatch(deletePost(post.postId))}
            />
          </Box>
        </Box>
        <Text mt="10px" fontSize="18px">
          {post.body}
        </Text>
        <Box mt="30px" d="flex" flexDirection="row" justifyContent="space-between">
          <Text color="grey" fontSize="14px">
            {post.author}
          </Text>
          <Text color="grey" fontSize="14px">
            {post.publishedAt.substring(0, 21)}
          </Text>
          <Text fontSize="14px">
            <FaThumbsUp /> {post.numOfReactions}
          </Text>
        </Box>
        <Box mt="10">
          <Button
            borderRadius="7px"
            borderColor="transparent"
            width="30px"
            color={primaryBlue}
            fontSize="12px"
            onClick={() => dispatch(increaseLikes(post))}
          >
            Like{" "}
          </Button>
          {commentingId.postId !== post.postId && (
            <Button
              borderRadius="7px"
              onClick={() => dispatch(changeCommentingId({ postId: post.postId }))}
              ml="5"
              borderColor="transparent"
              width="50px"
              color={primaryBlue}
              fontSize="12px"
            >
              Comment
            </Button>
          )}
        </Box>
        {post.postId === commentingId.postId && (
          <AddEditComment postId={post.postId} />
        )}
        {comments[post.postId].length > 0 && <CommentsFeed postId={post.postId} />}
      </Box>
    </Box>
  );
};

export default Post;
