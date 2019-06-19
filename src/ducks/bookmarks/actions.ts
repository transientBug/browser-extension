import ActionTypes from "./types";
import { Bookmark } from "../../bookmarks";

const startSaving = (message?: string) =>
  ({ type: ActionTypes.StartSaving, payload: { message } } as const);

const finishSaving = (bookmark: Partial<Bookmark>) =>
  ({ type: ActionTypes.FinishSaving, payload: { bookmark } } as const);

export { startSaving, finishSaving };

export interface ActionPayloads {
  [ActionTypes.StartSaving]: ReturnType<typeof startSaving>;
  [ActionTypes.FinishSaving]: ReturnType<typeof finishSaving>;
}
