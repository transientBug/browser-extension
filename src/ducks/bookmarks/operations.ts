import actions from "./actions";
import { ThunkableDispatch } from "../reducer";
import { Bookmark } from "../../bookmarks";

const save = (bookmarkData: Partial<Bookmark>) => async (
  dispatch: ThunkableDispatch<any>
) => {
  dispatch(actions.startSaving());

  const bookmark = await Promise.resolve(bookmarkData);
  // const bookmark = await Bookmarks.save(localBookmark)

  dispatch(actions.finishSaving(bookmark));
};

export { save };
