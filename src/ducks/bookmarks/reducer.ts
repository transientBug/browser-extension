import { ReducerMap } from "../reducer";

import { Actions } from "./actions";
import { State } from "./state";
import ActionTypes from "./types";

const reducers: ReducerMap<State, Actions> = {
  [ActionTypes.StartSaving]: draft => {
    draft.isLoading = true;
  },
  [ActionTypes.FinishSaving]: (draft, action) => {
    draft.isLoading = false;
    draft.bookmark = action.payload.bookmark;
  }
};

export default reducers;
