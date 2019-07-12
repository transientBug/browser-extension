import ActionTypes from "./types";
import { Bookmark } from "../../api/types";

const showLoader = (message?: string) =>
  ({ type: ActionTypes.ShowLoader, payload: { message } } as const);

const hideLoader = () => ({ type: ActionTypes.HideLoader } as const);

const authenticate = (accessToken: string) =>
  ({ type: ActionTypes.Authenticate, payload: { accessToken } } as const);

const unauthenticate = (message: string) =>
  ({ type: ActionTypes.Unauthenticate, payload: { message } } as const);

const changeIcon = (iconPath: string) =>
  ({ type: ActionTypes.ChangeIcon, payload: { iconPath } } as const);

const setBookmark = (bookmark: Partial<Bookmark>) =>
  ({ type: ActionTypes.SetBookmark, payload: { bookmark } } as const);

const updateTags = (tags: string[]) =>
  ({ type: ActionTypes.UpdateTags, payload: { tags } } as const);

const Actions = {
  [ActionTypes.ShowLoader]: showLoader,
  [ActionTypes.HideLoader]: hideLoader,
  [ActionTypes.Authenticate]: authenticate,
  [ActionTypes.Unauthenticate]: unauthenticate,
  [ActionTypes.ChangeIcon]: changeIcon,
  [ActionTypes.SetBookmark]: setBookmark,
  [ActionTypes.UpdateTags]: updateTags
};

export type Actions = typeof Actions;
export type Payloads = ReturnType<Actions[ActionTypes]>;
export default {
  showLoader,
  hideLoader,
  authenticate,
  unauthenticate,
  changeIcon,
  setBookmark,
  updateTags
};
