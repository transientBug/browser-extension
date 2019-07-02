/* global browser */
import React, { useState, useEffect } from "react";

import { isEmpty } from "lodash";
import { take, uniq, flatten } from "lodash";

import LoadingView from "./Popup/LoadingView";
import UnauthedView from "./Popup/UnauthedView";
import BookmarkEditForm from "./Popup/BookmarkEditView";

import Navbar from "../components/Navbar";
import PopupContainer from "../components/PopupContainer";
import { useBrowserSettings } from "../components/BrowserSettingsProvider";

import Bookmarks, { Bookmark, AuthError } from "../bookmarks";

import makeStore from "../ducks/store";
import { reducer, initialState, operations } from "../ducks/bookmarks";
import { State } from "../ducks/bookmarks/state";

import debugFactory from "../debug";
const debug: debug.IDebugger = debugFactory.extend("page").extend("Popup");

const BOOKMARK_ICON_FILL = "../icons/ic_bookmark_black_24dp_2x.png";

const changeIcon = async (icon: string) => {
  const activeTab = await currentTab();

  if (!activeTab) return;

  browser.pageAction.setIcon({ tabId: activeTab.id as number, path: icon });
};

const login = () => {
  debug("Starting login process ...");

  browser.runtime.sendMessage({ action: "login" });

  window.close();
};

const logout = () => {
  debug("Logging out");

  browser.storage.local.set({ accessToken: "" });
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

const mergeTags = (existingTags?: string[], newTags?: string[]) => {
  const mergedTags = (existingTags || []).concat(newTags || []);

  return take(uniq(flatten(mergedTags)), 200);
};

interface PopupContentsProps {
  accessToken?: string;
  tags?: string[];
}

const { Store, useStore } = makeStore<State>(initialState);

const PopupContents: React.FC<PopupContentsProps> = ({ tags }) => {
  const [state, dispatch] = useStore();

  useEffect(() => {
    (async () => {
      const activeTab = await currentTab();

      const localBookmark: Partial<Bookmark> = {
        url: activeTab.url,
        title: activeTab.title
      };

      dispatch(operations.save(localBookmark));
    })();
  }, []);

  // useEffect(() => {
  //   if (!state.isLoading) return;
  //   if (!authed) return setIsLoading(false);

  //   (async () => {
  //     try {
  //       const res = await upsertBookmark();

  //       setBookmarkData(res);

  //       const tags = mergeTags(settings.tags, res.tags);
  //       updateSettings({ tags });

  //       changeIcon(BOOKMARK_ICON_FILL);
  //     } catch (error) {
  //       if (!(error instanceof AuthError)) throw error;

  //       logout();
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   })();
  // }, [isInitialized, authed]); // eslint-disable-line

  if (state.isLoading) return <LoadingView />;

  return (
    <>
      <Navbar onClick={() => {}} />
      {state.bookmark && (
        <BookmarkEditForm
          autocompleteTags={tags || []}
          bookmark={state.bookmark}
          onSave={console.log}
        />
      )}
    </>
  );
};

const Popup: React.FC = () => {
  const [settings, , isInitialized] = useBrowserSettings();

  const authed = !!settings.accessToken;

  return (
    <Store reducer={reducer} initialState={initialState}>
      <PopupContainer>
        {!authed && !isInitialized && <LoadingView />}
        {!authed && isInitialized && <UnauthedView onLogin={login} />}
        {authed && <PopupContents />}
      </PopupContainer>
    </Store>
  );
};

export default Popup;
