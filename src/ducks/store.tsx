import React, { useContext, createContext } from "react";

import { useImmerReducer, ThunkableDispatch } from "./reducer";

type StoreProps<State> = {
  reducer: any;
  initialState: State;
};

function makeStore<State>(initialState: State) {
  const StateContext = createContext(initialState);
  const DispatchContext = createContext<ThunkableDispatch<any>>(() => {});

  const useDispatch = () => useContext(DispatchContext);
  const useState = () => useContext(StateContext);

  type useStore = () => [
    ReturnType<typeof useState>,
    ReturnType<typeof useDispatch>
  ];

  const useStore: useStore = () => [useState(), useDispatch()];

  const Store: React.FC<StoreProps<State>> = ({
    reducer,
    initialState,
    children
  }) => {
    const [state, dispatch] = useImmerReducer(reducer, initialState);

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
