/* global browser */
import React, { useEffect } from "react";

import LoadingView from "./Popup/LoadingView";
import UnauthedView from "./Popup/UnauthedView";
import BookmarkEditForm from "./Popup/BookmarkEditView";

import Navbar from "../components/Navbar";
import PopupContainer from "../components/PopupContainer";
import { useBrowserSettings } from "../components/BrowserSettingsProvider";

import { reducers, initialState, operations } from "../ducks/bookmarks";
import makeStore from "../ducks/store";

import debugFactory from "../debug";
const debug: debug.IDebugger = debugFactory.extend("page").extend("Popup");

const login = () => {
  debug("Starting login process ...");

  browser.runtime.sendMessage({ action: "login" });

  window.close();
};

// const logout = () => {
//   debug("Logging out");

//   browser.storage.local.set({ accessToken: "" });
// };

const { Store, useStore } = makeStore(initialState, reducers);

interface PopupContentsProps {
  accessToken?: string;
  tags?: string[];
}

const PopupContents: React.FC<PopupContentsProps> = ({ tags }) => {
  const [state, dispatch] = useStore();

  useEffect(() => {
    (async () => dispatch(operations.save()))();
  }, [dispatch]);

  if (state.isLoading) return <LoadingView />;

  return (
    <>
      <Navbar onClick={console.log} />
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
    <Store>
      <PopupContainer>
        {!authed && !isInitialized && <LoadingView />}
        {!authed && isInitialized && <UnauthedView onLogin={login} />}
        {authed && <PopupContents />}
      </PopupContainer>
    </Store>
  );
};

export default Popup;
