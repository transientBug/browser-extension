/* global browser */
import React, { useEffect } from "react";

import LoadingView from "./Popup/LoadingView";
import UnauthedView from "./Popup/UnauthedView";
import BookmarkEditView from "./Popup/BookmarkEditView";

import PopupContainer from "../components/PopupContainer";

import { operations as bookmarkOperations } from "../ducks/bookmarks";
import useStore, { Store } from "./Popup/store";

import debugFactory from "../debug";
const debug: debug.IDebugger = debugFactory.extend("page").extend("Popup");

const login = () => {
  debug("starting login process ...");

  // TODO: Save the active tab so that when login is successful, the save still
  // happens, the tab can be switched back to and the popup reopened.
  browser.runtime.sendMessage({ action: "login" });

  window.close();
};

const PopupContents: React.FC = () => {
  const [state, dispatch] = useStore();

  useEffect(() => {
    dispatch(bookmarkOperations.save());
  }, []); // eslint-disable-line

  window.onunload = e => {
    if (!state.bookmark) return;
    dispatch(bookmarkOperations.update());
  };

  debug("current state", state);

  const loading = state.loading.shown;
  const unauthed = state.auth && !state.auth.accessToken && state.auth.message;
  const editing = !loading && !unauthed;

  return (
    <>
      {loading && <LoadingView message={state.loading.message} />}
      {unauthed && <UnauthedView onLogin={login} />}
      {editing && <BookmarkEditView />}
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
