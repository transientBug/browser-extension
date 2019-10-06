import ActionTypes from "./types";
import { Bookmark } from "../../api/types";

const setBookmark = (bookmark: Partial<Bookmark>) =>
  ({ type: ActionTypes.SetBookmark, payload: { bookmark } } as const);

const openInTB = () => ({ type: ActionTypes.OpenInTB, payload: {} } as const);

const Actions = {
  [ActionTypes.SetBookmark]: setBookmark,
  [ActionTypes.OpenInTB]: openInTB
};

export type Actions = typeof Actions;
export type Payloads = ReturnType<Actions[ActionTypes]>;
export default {
  setBookmark,
  openInTB
};
