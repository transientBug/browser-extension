import { ReducerMap } from "../useImmerReducer";

import { Actions } from "./actions";
import { State } from "./state";
import ActionTypes from "./types";

const reducers: ReducerMap<State, Actions> = {
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
  }
};

export default reducers;
