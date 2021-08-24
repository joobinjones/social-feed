import { useReducer, useContext, createContext } from "react";

interface StoreProviderProps {
  children: JSX.Element;
  initialState: any;
  reducer: any;
}

export const Store = createContext<any>(null);

export const useStore = () => useContext(Store);

export const StoreProvider = ({
  children,
  initialState,
  reducer,
}: StoreProviderProps): JSX.Element => {
  const [globalState, dispatch] = useReducer(reducer, initialState);
  return <Store.Provider value={[globalState, dispatch]}>{children}</Store.Provider>;
};
