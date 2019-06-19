import React, { useContext, createContext } from "react";

import { useImmerReducer, ReducerMap, ThunkableDispatch } from "./reducer";
import ActionTypes from "./bookmarks/types";
import initialState, { State } from "./bookmarks/state";

const StateContext = createContext<State>(initialState);
const DispatchContext = createContext<ThunkableDispatch<ActionTypes, State>>(
  () => {}
);

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

type useStore = () => [
  ReturnType<typeof useState>,
  ReturnType<typeof useDispatch>
];

const useStore: useStore = () => [useState(), useDispatch()];

export {
  Store,
  useDispatch,
  useState,
  useStore,
  StateContext,
  DispatchContext
};
