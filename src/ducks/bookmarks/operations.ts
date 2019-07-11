/* global browser */
import actions from "./actions";
import { ThunkableDispatch } from "../reducer";
import Bookmarks, { AuthError, Bookmark } from "../../bookmarks";

import { take, uniq, flatten, sample } from "lodash";

import debugFactory from "../../debug";
import { State } from "./state";
const debug: debug.IDebugger = debugFactory
  .extend("operations")
  .extend("bookmarks");

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

const loadingMessages = [
  "Fetching dragons ...",
  "Building homes with piggies ...",
  "Makin' Bacon ...",
  "BOOKMARKS MUTHERFOOKER, DO YOU USE THEM?!"
];

const save = () => async (dispatch: ThunkableDispatch<any>) => {
  debug("Starting save process");
  dispatch(actions.showLoader(sample(loadingMessages)));

  debug("Fetching browser extension settings");

  const {
    accessToken,
    tags: existingTags
  }: {
    accessToken: string;
    tags: string[];
  } = await browser.storage.local.get(["accessToken", "tags"]);

  if (!accessToken) {
    dispatch(actions.unauthenticate("You're not logged in yet!"));
    dispatch(actions.hideLoader());
    return;
  }

  dispatch(actions.updateTags(existingTags));
  dispatch(actions.authenticate(accessToken));

  debug("Saving bookmark ...");
  dispatch(actions.showLoader("Saving bookmark ..."));

  const activeTab = await currentTab();

  debug("Saving tab", activeTab);

  let bookmarkData;
  try {
    bookmarkData = await Bookmarks.save({
      url: activeTab.url,
      title: activeTab.title
    });

    bookmarkData.url = bookmarkData["uri"];
    delete bookmarkData["uri"];
  } catch (e) {
    debug("Error while talking to API", e);
    if (!(e instanceof AuthError)) throw e;

    await browser.storage.local.set({ accessToken: "" });

    dispatch(
      actions.unauthenticate("Extension is not authorized with transientBug")
    );
    dispatch(actions.hideLoader());
    return;
  }

  debug("API response", bookmarkData);

  debug("Changing Icon");
  await changeIcon(BOOKMARK_ICON_FILL);
  dispatch(actions.changeIcon(BOOKMARK_ICON_FILL));
  debug("Icon changed");

  debug("Merging and updating local tag storage");
  const tags = mergeTags(existingTags as string[], bookmarkData.tags);
  await browser.storage.local.set({ tags });
  debug("Tags updated", tags);

  dispatch(actions.setBookmark(bookmarkData));
  dispatch(actions.hideLoader());
};

let updateDebounce: any;

const update = (bookmark: Partial<Bookmark>) => async (
  dispatch: ThunkableDispatch<any>,
  state: State
) => {
  debug("Starting to update the bookmark ...");

  dispatch(actions.setBookmark(bookmark));

  if (updateDebounce) clearTimeout(updateDebounce);

  updateDebounce = setTimeout(async () => {
    const newMark = await Bookmarks.save({ ...state.bookmark, ...bookmark });

    newMark.url = newMark["uri"];
    delete newMark["uri"];

    dispatch(actions.setBookmark(newMark));
  }, 250);
};

export { save, update };
