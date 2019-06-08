import { ReducerMap } from "../reducer";
import ActionTypes from "./types";
import { ActionPayloads } from "./actions";
import { State } from "./state";

const reducers: ReducerMap<State, ActionTypes, ActionPayloads> = {
  [ActionTypes.InitSettings]: (draft, action) => {
    console.log({ draft, action });
  },
  [ActionTypes.ChangeSettings]: (draft, action) => {
    console.log({ action });
  }
};

export default reducers;
