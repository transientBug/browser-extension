import { ReducerMap } from "../useImmerReducer";

import { Actions } from "./actions";
import { State } from "./state";
import ActionTypes from "./types";

const reducers: ReducerMap<State, Actions> = {
  [ActionTypes.SetBookmark]: (draft, action) => {
    draft.bookmark = action.payload.bookmark;
  },
  [ActionTypes.OpenInTB]: () => {}
};

export default reducers;
