import ActionTypes from "./types";
import { Bookmark } from "../../api/types";

const setBookmark = (bookmark: Partial<Bookmark>) =>
  ({ type: ActionTypes.SetBookmark, payload: { bookmark } } as const);

const Actions = {
  [ActionTypes.SetBookmark]: setBookmark
};

export type Actions = typeof Actions;
export type Payloads = ReturnType<Actions[ActionTypes]>;
export default {
  setBookmark
};
