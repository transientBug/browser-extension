/* global browser */
import actions from "./actions";
import popupActions from "../popup/actions";
import authActions from "../auth/actions";

import { ThunkableDispatch } from "../useImmerReducer";

import API, { AuthError } from "../../api";

import { flatten, sample, take, uniq } from "lodash";

import { State } from "./state";

import {
  setSettings,
  getSettings
} from "../../components/BrowserSettingsProvider";

import debugFactory from "../../debug";
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
    throw new Error("No active tabs found, can't bookmark undefined!");

  return tabs[0];
};

// TODO: These aren't displayed anywhere yet but they should be
const loadingMessages = [
  "Finding dragons ...",
  "Building homes with piggies ...",
  "Makin' Bacon ..."
];

const save = () => async (dispatch: ThunkableDispatch<any>) => {
  debug("starting save process");
  dispatch(popupActions.showLoader(sample(loadingMessages)));

  debug("fetching browser extension settings");

  const { accessToken, tags: existingTags = [] } = await getSettings([
    "accessToken",
    "tags"
  ]);

  if (!accessToken) {
    dispatch(authActions.unauthenticate("You're not logged in yet!"));
    dispatch(popupActions.hideLoader());
    return;
  }

  dispatch(popupActions.updateTags(existingTags));
  dispatch(authActions.authenticate(accessToken));

  debug("saving bookmark ...");

  const activeTab = await currentTab();

  debug("current tab", activeTab);

  let bookmarkData;
  try {
    bookmarkData = await API.Bookmarks.save({
      url: activeTab.url,
      title: activeTab.title
    });

    bookmarkData.url = bookmarkData["uri"];
    delete bookmarkData["uri"];
  } catch (e) {
    debug("ERROR: while talking to API", e);
    if (!(e instanceof AuthError)) throw e;

    await setSettings({ accessToken: "" });

    dispatch(
      authActions.unauthenticate(
        "Extension is not authorized with transientBug"
      )
    );
    dispatch(popupActions.hideLoader());
    return;
  }

  debug("API response", bookmarkData);

  debug("changing Icon");
  await changeIcon(BOOKMARK_ICON_FILL);
  dispatch(popupActions.changeIcon(BOOKMARK_ICON_FILL));
  debug("icon changed");

  debug(
    "merging and updating local tag storage",
    existingTags,
    bookmarkData.tags
  );
  const tags = mergeTags(existingTags, bookmarkData.tags);
  await setSettings({ tags });
  debug("tags updated", tags);

  dispatch(actions.setBookmark(bookmarkData));
  dispatch(popupActions.hideLoader());
};

const update = () => (dispatch: ThunkableDispatch<any>, state: State) => {
  // Save in the background because otherwise the promise won't resolve before the window context is closed, leading the the finall request not finishing potentially.
  // This isn't without its own flaws and that same issue however sending a message between browser contexts is a lot faster than to an external API

  if (!state.bookmark || !state.bookmark.id) return;

  debug("starting to update the bookmark with tB ...");
  browser.runtime.sendMessage({ action: "save", data: state.bookmark });
};

const open = () => async (dispatch: ThunkableDispatch<any>, state: State) => {
  if (!state.bookmark || !state.bookmark.id) return;

  debug("opening in TB ...");

  const {
    bookmark: { id }
  } = state;

  const { endpoint } = await getSettings(["endpoint"]);

  const url = new URL(`/bookmarks/${id}`, endpoint);

  browser.tabs.create({ url: url.toString() });
};

export default { save, update, open };
