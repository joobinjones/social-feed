import { initialState, postsReducer } from "./context/postsReducer";
import { StoreProvider } from "./context";
import Layout from "./layout";
import "./styles/App.css";

const App = () => (
  <StoreProvider initialState={initialState} reducer={postsReducer}>
    <Layout />
  </StoreProvider>
);

export default App;
