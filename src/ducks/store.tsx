import React, {
  useCallback,
  useReducer,
  useContext,
  createContext
} from "react";
import { useImmerReducer, ReducerMap } from "./reducer";

const StateContext = createContext<any>({});
const DispatchContext = createContext<React.Dispatch<any>>(() => {});

type StoreProps = {
  reducer: ReducerMap<any, any, any>;
  initialState: any;
  initState?: any;
};

const Store: React.FC<StoreProps> = ({
  reducer,
  initialState,
  initState,
  children
}) => {
  const [state, dispatch] = useImmerReducer(reducer, initialState, initState);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

const useDispatch = () => useContext(DispatchContext);
const useState = () => useContext(StateContext);

export { Store, useDispatch, useState, StateContext, DispatchContext };
