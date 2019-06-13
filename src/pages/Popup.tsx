/* global browser */
import React, { useState, useEffect } from "react";

import { isEmpty } from "lodash";

import LoadingView from "./Popup/LoadingView";
import UnauthedView from "./Popup/UnauthedView";
import BookmarkEditView from "./Popup/BookmarkEditView";

import PopupContainer from "../components/PopupContainer";
import { useBrowserSettings } from "../components/BrowserSettingsProvider";

import Bookmarks, { Bookmark } from "../bookmarks";

import debugFactory from "../debug";
const debug: debug.IDebugger = debugFactory.extend("page").extend("Popup");

const currentTab = async (): Promise<browser.tabs.Tab> => {
  const tabs = await browser.tabs.query({
    active: true,
    windowId: browser.windows.WINDOW_ID_CURRENT
  });

  if (tabs.length < 1)
    throw new Error("No active tabs found, can't bookmark anything!");

  return tabs[0];
};

const BOOKMARK_ICON_FILL = "../icons/ic_bookmark_black_24dp_2x.png";

const changeIcon = async (icon: string) => {
  const activeTab = await currentTab();

  if (!activeTab) return;

  browser.pageAction.setIcon({ tabId: activeTab.id as number, path: icon });
};

const upsertBookmark = async () => {
  const activeTab = await currentTab();

  const localBookmark: Partial<Bookmark> = {
    url: activeTab.url,
    title: activeTab.title
  };

  debug("local bookmark", localBookmark);

  return await Bookmarks.save(localBookmark);
};

const Popup: React.FC = () => {
  const [settings] = useBrowserSettings();

  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  const [bookmarkData, setBookmarkData] = useState<Bookmark | undefined>();

  const showLoader = isLoading || !isInitialized;
  const authed = !!settings.accessToken;

  useEffect(() => {
    const settingsFetched = !isEmpty(settings);

    setIsInitialized(settingsFetched);
  }, [settings]);

  useEffect(() => {
    if (!isInitialized) return;
    if (!authed) return setIsLoading(false);

    (async () => {
      const res = await upsertBookmark();
      // TODO: add a message for this to make for a nicer UX
      if (!res) return setIsLoading(false); // 401 or 403

      setBookmarkData(res);
      changeIcon(BOOKMARK_ICON_FILL);

      setIsLoading(false);
    })();
  }, [isInitialized]);

  return (
    <PopupContainer>
      {showLoader ? (
        <LoadingView />
      ) : (
        <>
          {!authed && <UnauthedView />}
          {bookmarkData && <BookmarkEditView bookmark={bookmarkData} />}
        </>
      )}
    </PopupContainer>
  );
};

export default Popup;
