import { ReducerMap } from "../reducer";
import ActionTypes from "./types";
import { ActionPayloads } from "./actions";
import { State } from "./state";

const reducers: ReducerMap<State, ActionTypes, ActionPayloads> = {
  [ActionTypes.StartSaving]: (draft, action) => {
    console.log({ draft, action });
  },
  [ActionTypes.FinishSaving]: (draft, action) => {
    console.log({ action });
  }
};

export default reducers;
