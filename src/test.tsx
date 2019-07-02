import { useReducer, useCallback } from "react";
import produce, { Draft } from "immer";

// type ActionPayload<Type> = { type: Type; payload?: { [keys: string]: any } };

// type GetReturnType<original extends Function> =
//   original extends (...x: any[]) => infer returnType ? returnType : never

// type ActionMap<Actions extends string> = {
//   [Key in Actions]: (...args: any[]) => infer returnType ? returnType : never;
// };

interface Bookmark {
  id?: string | number;
  title: string;
  url: string;
  tags: string[];
  description: string;
  [keys: string]: any;
}

interface State {
  isLoading: boolean;
  hasError?: boolean;
  errorDetails?: any;
  bookmark?: Bookmark;
}

const initialState: State = {
  isLoading: true
};

enum ActionTypes {
  StartSaving = "app/bookmark/start-saving",
  FinishSaving = "app/bookmark/finish-saving"
}

const startSaving = (message?: string) =>
  ({ type: ActionTypes.StartSaving, payload: { message } } as const);

const finishSaving = (bookmark: Partial<Bookmark>) =>
  ({ type: ActionTypes.FinishSaving, payload: { bookmark } } as const);

const Actions = {
  [ActionTypes.StartSaving]: startSaving,
  [ActionTypes.FinishSaving]: finishSaving
};

const reducers: ReducerMap<State, typeof Actions> = {
  [ActionTypes.StartSaving]: (draft, action) => {
    console.log({ draft, action });
  },
  [ActionTypes.FinishSaving]: (draft, action) => {
    console.log({ draft, action });
  }
};

type ReducerMap<State, ActionMap> = {
  [Key in keyof ActionMap]: (
    draft: State | Draft<State>,
    action: ActionMap[Key]
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

function isThunk<T>(value: any): value is ThunkDispatch<any, T> {
  return typeof value === "function";
}

const useReducerMap = function<State, Payloads extends { type: string }>(
  reducers: any,
  initialState: any
) {
  const reducer = useCallback<ActionReducers<State, Payloads>>(
    (_state, action) => {
      const actionReducer = reducers[action.type] as SingleActionReducer<
        State,
        typeof action
      >;

      // yololth
      return (produce(actionReducer) as unknown) as State;
    },
    [reducers]
  );

  return useReducer<React.Reducer<State, Payloads>>(reducer, initialState);
};

const useImmerReducer = function<State, Payloads extends { type: string }>(
  reducers: any,
  initialState: any
): [State, ThunkableDispatch<Payloads>] {
  const [state, rawDispatch] = useReducerMap<State, Payloads>(
    reducers,
    initialState
  );

  const thunker: ThunkableDispatch<Payloads> = action => {
    if (isThunk<Payloads>(action)) action(rawDispatch, state);
    else rawDispatch(action);
  };

  return [state, thunker];
};

const test: React.FC = () => {
  const [state, dispatch] = useImmerReducer<
    State,
    ReturnType<(typeof Actions)[ActionTypes]>
  >(reducers, initialState);

  return (
    <>
      <button onClick={() => dispatch(startSaving())}>clickme</button>
      <pre>{JSON.stringify(state)}</pre>
    </>
  );
};
