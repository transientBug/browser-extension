import ActionTypes from "./types";
import { Bookmark } from "../../bookmarks";

const startSaving = (message?: string) =>
  ({ type: ActionTypes.StartSaving, payload: { message } } as const);

const finishSaving = (bookmark: Partial<Bookmark>) =>
  ({ type: ActionTypes.FinishSaving, payload: { bookmark } } as const);

export interface Actions {
  [ActionTypes.StartSaving]: typeof startSaving;
  [ActionTypes.FinishSaving]: typeof finishSaving;
}

export type Payloads = ReturnType<Actions[ActionTypes]>;
export default { startSaving, finishSaving };
