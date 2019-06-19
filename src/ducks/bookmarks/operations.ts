import * as Actions from "./actions";
import { ThunkableDispatch } from "../reducer";
import ActionTypes from "./types";
import { State } from "./state";
import { Bookmark } from "../../bookmarks";

const save = (bookmarkData: Partial<Bookmark>) => async (
  dispatch: ThunkableDispatch<ActionTypes, State>
) => {
  dispatch(Actions.startSaving());

  const bookmark = await Promise.resolve(bookmarkData);
  // const bookmark = await Bookmarks.save(localBookmark)

  dispatch(Actions.finishSaving(bookmark));
};

export { save };
