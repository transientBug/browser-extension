/* global browser */

import actions from "./actions";
import { ThunkableDispatch } from "../reducer";
import Bookmarks from "../../bookmarks";

import { take, uniq, flatten } from "lodash";

const BOOKMARK_ICON_FILL = "../icons/ic_bookmark_black_24dp_2x.png";

const changeIcon = async (icon: string) => {
  const activeTab = await currentTab();

  if (!activeTab) return;

  browser.pageAction.setIcon({ tabId: activeTab.id as number, path: icon });
};

const mergeTags = (existingTags?: string[], newTags?: string[]) => {
  const mergedTags = (existingTags || []).concat(newTags || []);

  return take(uniq(flatten(mergedTags)), 200);
};

const currentTab = async (): Promise<browser.tabs.Tab> => {
  const tabs = await browser.tabs.query({
    active: true,
    windowId: browser.windows.WINDOW_ID_CURRENT
  });

  if (tabs.length < 1)
    throw new Error("No active tabs found, can't bookmark anything!");

  return tabs[0];
};

const save = () => async (dispatch: ThunkableDispatch<any>) => {
  const activeTab = await currentTab();

  dispatch(actions.startSaving());

  const bookmarkData = await Bookmarks.save({
    url: activeTab.url,
    title: activeTab.title
  });

  await changeIcon(BOOKMARK_ICON_FILL);
  const { tags: existingTags } = await browser.storage.local.get("tags");
  await browser.storage.local.set({
    tags: mergeTags(existingTags as string[], bookmarkData.tags)
  });

  dispatch(actions.finishSaving(bookmarkData));
  // dispatch(actions.updateBookmarkData(bookmarkData));
};

export { save };
