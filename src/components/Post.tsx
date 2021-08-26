import AddEditComment from "./AddEditComment";
import { Box, Button } from "@chakra-ui/react";
import CommentsFeed from "./CommentsFeed";
import { FaThumbsUp, FaEdit, FaTrashAlt, FaComments } from "react-icons/fa";
import {
  increaseLikes,
  changeEditId,
  deletePost,
  changeCommentingId,
} from "../context/postsReducer";
import { IPost } from "../types";
import { primaryBlue, dangerRed, offWhite } from "../styles/palette";
import Text from "./Text";
import { useStore } from "../context";

const Post = ({ post }: { post: IPost }): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [{ commentingId }, dispatch] = useStore();
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
            <Button
              backgroundColor={primaryBlue}
              borderRadius="7px"
              borderColor="transparent"
              color={offWhite}
              onClick={() => dispatch(changeEditId({ postId: post.postId }))}
            >
              <FaEdit /> Edit
            </Button>
            <Button
              ml="5"
              backgroundColor={dangerRed}
              borderColor="transparent"
              borderRadius="7px"
              color={offWhite}
              onClick={() => dispatch(deletePost(post.postId))}
            >
              <FaTrashAlt /> Delete
            </Button>
          </Box>
        </Box>
        <Text mt="10px" fontSize="18px">
          {post.body}
        </Text>
        <Box mt="30px" d="flex" flexDirection="row" justifyContent="space-between">
          <Text fontSize="14px">{post.author}</Text>
          <Text fontSize="14px">{post.publishedAt.substring(0, 15)}</Text>
          <Text fontSize="14px">
            <FaThumbsUp /> {post.numOfReactions}
          </Text>
        </Box>
        <Box mt="10">
          <Button
            borderRadius="7px"
            borderColor="transparent"
            backgroundColor={primaryBlue}
            color={offWhite}
            onClick={() => dispatch(increaseLikes(post))}
          >
            Like{" "}
            <Box ml="5">
              <FaThumbsUp />
            </Box>
          </Button>
          {commentingId.postId !== post.postId && (
            <Button
              borderRadius="7px"
              onClick={() => dispatch(changeCommentingId({ postId: post.postId }))}
              backgroundColor="white"
              ml="5"
              borderColor="transparent"
            >
              Comment{" "}
              <Box ml="3">
                <FaComments />
              </Box>
            </Button>
          )}
        </Box>
        {post.postId === commentingId.postId && (
          <AddEditComment postId={post.postId} />
        )}
        <CommentsFeed postId={post.postId} />
      </Box>
    </Box>
  );
};

export default Post;
