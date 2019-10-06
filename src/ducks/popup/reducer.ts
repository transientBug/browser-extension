import { ReducerMap } from "../useImmerReducer";

import { Actions } from "./actions";
import { State } from "./state";
import ActionTypes from "./types";

const reducers: ReducerMap<State, Actions> = {
  [ActionTypes.ShowLoader]: (draft, action) => {
    draft.loading.shown = true;
    draft.loading.message = action.payload.message;
  },
  [ActionTypes.HideLoader]: draft => {
    draft.loading.shown = false;
  },
  [ActionTypes.ChangeIcon]: () => {},
  [ActionTypes.UpdateTags]: (draft, action) => {
    draft.tags = action.payload.tags;
  }
};

export default reducers;
