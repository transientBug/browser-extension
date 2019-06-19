import produce, { Draft } from "immer";
import { useReducer, useCallback } from "react";
import { ActionPayloads } from "./bookmarks/actions";

export type Reducer<State, Action> = (
  draft: Draft<State> | State,
  action: Action
) => void | State;

export type ReducerMap<
  State,
  ActionTypes extends string,
  ActionPayloads extends { [K in ActionTypes]: ActionPayloads[K] }
> = { readonly [TKey in ActionTypes]: Reducer<State, ActionPayloads[TKey]> };

export type ThunkDispatch<ActionTypes extends string, State> = (
  dispatch: React.Dispatch<ActionPayloads[ActionTypes]>,
  state?: State
) => void | Promise<void>;

export type ThunkableDispatch<
  ActionTypes extends string,
  State
> = React.Dispatch<
  ActionPayloads[ActionTypes] | ThunkDispatch<ActionTypes, State>
>;

function isThunk(value: any): value is ThunkDispatch<any, any> {
  return typeof value === "function";
}

export function useImmerReducer<
  State,
  ActionTypes extends string,
  ActionPayloads extends { [K in ActionTypes]: ActionPayloads[K] }
>(
  reducers: ReducerMap<State, ActionTypes, ActionPayloads>,
  initialState: State,
  initializer?: any
): [State | void, ThunkableDispatch<ActionTypes, State>] {
  const cachedReducer = useCallback(
    produce(
      (draft: Draft<State>, action: ActionPayloads[ActionTypes]): void => {
        const reduce = reducers[action.type as ActionTypes];

        if (reduce) reduce(draft, action);
      }
    ),
    [reducers]
  );

  const [state, dispatch] = useReducer<
    Reducer<State, ActionPayloads[ActionTypes]>,
    State
  >(cachedReducer, initialState, initializer);

  const thunker = (action: ThunkableDispatch<ActionTypes, State>) => {
    if (isThunk(action)) action(dispatch, state);
    else dispatch(action);
  };

  return [state, thunker];
}
