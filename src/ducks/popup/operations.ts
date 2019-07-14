/* global browser */
import actions from "./actions";
import { ThunkableDispatch } from "../useImmerReducer";

import { flatten, take, uniq } from "lodash";

import { State } from "./state";

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

export default {};
