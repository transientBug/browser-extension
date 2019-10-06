import ActionTypes from "./types";

const showLoader = (message?: string) =>
  ({ type: ActionTypes.ShowLoader, payload: { message } } as const);

const hideLoader = () => ({ type: ActionTypes.HideLoader } as const);

const changeIcon = (iconPath: string) =>
  ({ type: ActionTypes.ChangeIcon, payload: { iconPath } } as const);

const updateTags = (tags: string[]) =>
  ({ type: ActionTypes.UpdateTags, payload: { tags } } as const);

const Actions = {
  [ActionTypes.ShowLoader]: showLoader,
  [ActionTypes.HideLoader]: hideLoader,
  [ActionTypes.ChangeIcon]: changeIcon,
  [ActionTypes.UpdateTags]: updateTags
};

export type Actions = typeof Actions;
export type Payloads = ReturnType<Actions[ActionTypes]>;
export default {
  showLoader,
  hideLoader,
  changeIcon,
  updateTags
};
