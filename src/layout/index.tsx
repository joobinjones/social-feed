import Feed from "../pages/Feed";
import AddEditPost from "../components/AddEditPost";
const Layout = (): JSX.Element => {
  return (
    <main>
      <AddEditPost />
      <Feed />
    </main>
  );
};

export default Layout;
