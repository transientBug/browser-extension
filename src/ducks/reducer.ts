import produce, { Draft } from "immer";
import { useReducer, useCallback } from "react";

export type Reducer<State, Action> = (
  draft: Draft<State> | State,
  action: Action
) => void | State;

export interface Action<ActionTypes> {
  readonly type: ActionTypes;
  readonly payload: any;
}

export type ReducerMap<
  State,
  ActionTypes extends string,
  ActionPayloads extends { [K in ActionTypes]: Action<ActionTypes> }
> = { readonly [TKey in ActionTypes]: Reducer<State, ActionPayloads[TKey]> };

type ThunkDispatch<ActionTypes> = (
  dispatch: React.Dispatch<Action<ActionTypes>>
) => void;

type ThunkableDispatch<ActionTypes> = React.Dispatch<
  Action<ActionTypes> | ThunkDispatch<ActionTypes>
>;

export function useImmerReducer<
  State,
  ActionTypes extends string,
  ActionPayloads extends { [K in ActionTypes]: Action<ActionTypes> }
>(
  reducers: ReducerMap<State, ActionTypes, ActionPayloads>,
  initialState: State,
  initializer?: any
): [State, ThunkableDispatch<ActionTypes>] {
  const cachedReducer = useCallback(
    produce((draft, action) => {
      const reduce = (reducers as { [key: string]: any })[action.type];

      if (reduce) reduce(draft, action);
    }),
    [reducers]
  );

  const [state, dispatch] = useReducer(
    cachedReducer,
    initialState as any,
    initializer
  );

  const thunker = useCallback(
    action =>
      typeof action === "function" ? action(dispatch, state) : dispatch(action),
    [dispatch, state]
  );

  return [state, thunker];
}
