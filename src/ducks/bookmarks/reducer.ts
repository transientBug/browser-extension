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
  [ActionTypes.Authenticate]: (draft, action) => {
    draft.auth = {
      accessToken: action.payload.accessToken
    };
  },
  [ActionTypes.Unauthenticate]: (draft, action) => {
    draft.auth = {
      accessToken: "",
      message: action.payload.message
    };
  },
  [ActionTypes.ChangeIcon]: () => {},
  [ActionTypes.SetBookmark]: (draft, action) => {
    draft.bookmark = action.payload.bookmark;
  },
  [ActionTypes.UpdateTags]: (draft, action) => {
    draft.tags = action.payload.tags;
  }
};

export default reducers;
