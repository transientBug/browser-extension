import ActionTypes from "./types";

const initSettings = (settings: any) =>
  ({ type: ActionTypes.InitSettings, payload: { settings } } as const);

const changeSettings = (settings: any) =>
  ({ type: ActionTypes.ChangeSettings, payload: { settings } } as const);

export { initSettings, changeSettings };

export interface ActionPayloads {
  [ActionTypes.InitSettings]: ReturnType<typeof initSettings>;
  [ActionTypes.ChangeSettings]: ReturnType<typeof changeSettings>;
}
