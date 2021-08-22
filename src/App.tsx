import React from "react";
import { StoreProvider } from "./context";
import Layout from "./layout";
const App = () => (
  <StoreProvider>
    <Layout />
  </StoreProvider>
);

export default App;
