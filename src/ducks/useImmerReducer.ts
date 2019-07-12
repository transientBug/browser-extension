import { useReducer, useCallback } from "react";
import produce, { Draft } from "immer";

export type ReducerMap<
  State,
  ActionMap extends { [keys: string]: (...args: any) => {} }
> = {
  [Key in keyof ActionMap]: (
    draft: State | Draft<State>,
    action: ReturnType<ActionMap[Key]>
  ) => State | void
};

type SingleActionReducer<State, Action> = (
  draft: State | Draft<State>,
  action: Action
) => Draft<State> | State | void;

type ActionReducers<State, ActionPayloads> = (
  state: State,
  action: ActionPayloads
) => State;

export type ThunkDispatch<S, T> = (
  dispatch: React.Dispatch<T>,
  state?: S
) => void | Promise<void>;

export type ThunkableDispatch<T> = React.Dispatch<T | ThunkDispatch<any, T>>;

type BasePayload = { type: string };

function isThunk<T>(value: any): value is ThunkDispatch<any, T> {
  return typeof value === "function";
}

const useReducerMap = function<State, Payloads extends BasePayload>(
  reducers: ReducerMap<State, any>,
  initialState: State
): [State, React.Dispatch<Payloads>] {
  const reducer = useCallback(
    (state: State, action: Payloads) => {
      const actionReducer = reducers[action.type] as SingleActionReducer<
        State,
        typeof action
      >;

      // yololth
      return produce(state, draft => actionReducer(draft, action)) as State;
    },
    [reducers]
  );

  return useReducer<React.Reducer<State, Payloads>>(reducer, initialState);
};

const useImmerReducer = function<State, Payloads extends BasePayload>(
  reducers: ReducerMap<State, any>,
  initialState: State
): [State, ThunkableDispatch<Payloads>] {
  const [state, rawDispatch] = useReducerMap<State, Payloads>(
    reducers,
    initialState
  );

  // yolo middleware needed
  const thunker: ThunkableDispatch<Payloads> = useCallback(
    action => {
      if (isThunk<Payloads>(action)) action(rawDispatch, state);
      else rawDispatch(action);
    },
    [state, rawDispatch]
  );

  return [state, thunker];
};

export default useImmerReducer;
export { useImmerReducer, useReducerMap };
