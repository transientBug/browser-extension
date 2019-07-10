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

const { Store, useStore } = makeStore(initialState, reducers);

const PopupContents: React.FC = () => {
  const [state, dispatch] = useStore();

  useEffect(() => {
    (async () => dispatch(operations.save()))();
  }, []);

  if (state.loading.shown) return <LoadingView />;

  return (
    <>
      <Navbar onClick={console.log} />
      {state.bookmark && (
        <BookmarkEditForm
          autocompleteTags={state.tags}
          bookmark={state.bookmark}
          onSave={bookmark => dispatch(operations.update(bookmark))}
        />
      )}
    </>
  );
};

const Popup: React.FC = () => (
  <Store>
    <PopupContainer>
      <PopupContents />
    </PopupContainer>
  </Store>
);

export default Popup;
