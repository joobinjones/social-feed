import Feed from "../pages/Feed";
import { Box } from "@chakra-ui/react";
import AddEditPost from "../components/AddEditPost";
const Layout = (): JSX.Element => {
  return (
    <main>
      <Box mt="30" ml="30" mr="30" mb="30">
        <AddEditPost />
        <Box mt="30">
          <Feed />
        </Box>
      </Box>
    </main>
  );
};

export default Layout;
