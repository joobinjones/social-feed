import { useStore } from "../context";
import { Box, Button } from "@chakra-ui/react";
import { IPost } from "../types";
import Text from "./Text";
import { FaThumbsUp } from "react-icons/fa";
import { increaseLikes, changeEditId, deletePost } from "../context/postsReducer";

const Post = ({ post }: { post: IPost }): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, dispatch] = useStore();
  return (
    <Box
      mb="20"
      backgroundColor="#f0f0f0"
      d="flex"
      flexDirection="column"
      width="700px"
    >
      <Box margin="20">
        <Box d="flex" justifyContent="space-between">
          <Text fontSize="24px">{post.title}</Text>
          <Box>
            <Button onClick={() => dispatch(changeEditId({ postId: post.postId }))}>
              Edit
            </Button>
            <Button onClick={() => dispatch(deletePost(post.postId))}>Delete</Button>
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
        <Button mt="10" onClick={() => dispatch(increaseLikes(post))}>
          Like{" "}
          <Box ml="5">
            <FaThumbsUp />
          </Box>
        </Button>
      </Box>
    </Box>
  );
};

export default Post;
