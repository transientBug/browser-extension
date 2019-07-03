import React, { useContext, createContext } from "react";

import { useImmerReducer, ThunkableDispatch } from "./reducer";

function makeStore<State, Payloads extends { type: string }>(
  initialState: State,
  reducers: any
) {
  const StateContext = createContext<State>(initialState);
  const DispatchContext = createContext<ThunkableDispatch<Payloads>>(() => {});

  const useDispatch = () => useContext(DispatchContext);
  const useState = () => useContext(StateContext);

  type useStore = () => [
    ReturnType<typeof useState>,
    ReturnType<typeof useDispatch>
  ];

  const useStore: useStore = () => [useState(), useDispatch()];

  const Store: React.FC = ({ children }) => {
    const [state, dispatch] = useImmerReducer(reducers, initialState);

    return (
      <StateContext.Provider value={state}>
        <DispatchContext.Provider value={dispatch}>
          {children}
        </DispatchContext.Provider>
      </StateContext.Provider>
    );
  };

  return {
    Store,
    StateContext,
    DispatchContext,
    useDispatch,
    useState,
    useStore
  };
}

export default makeStore;
