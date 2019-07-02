import { ReducerMap } from "../reducer";

import { Actions } from "./actions";
import { State } from "./state";
import ActionTypes from "./types";

const reducers: ReducerMap<State, Actions> = {
  [ActionTypes.StartSaving]: (draft, action) => {
    console.log({ draft, action });
  },
  [ActionTypes.FinishSaving]: (draft, action) => {
    console.log({ draft, action });
  }
};

export default reducers;
