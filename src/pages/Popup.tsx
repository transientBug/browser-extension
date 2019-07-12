/* global browser */
import React, { useEffect } from "react";
import tw from "tailwind.macro";

import LoadingView from "./Popup/LoadingView";
import UnauthedView from "./Popup/UnauthedView";
import BookmarkEditForm from "../components/BookmarkEditForm";

import Navbar, { NavButton } from "../components/Navbar";

import { ReactComponent as LinkSVG } from "./link.svg";
import { ReactComponent as SaveSVG } from "./save-disk.svg";

import PopupContainer from "../components/PopupContainer";

import {
  reducers,
  initialState,
  operations,
  actions
} from "../ducks/bookmarks";
import makeStore from "../ducks/store";

import debugFactory from "../debug";
const debug: debug.IDebugger = debugFactory.extend("page").extend("Popup");

const SaveIcon = tw(SaveSVG)`
  fill-current inline-block h-4 w-4
`;

const LinkIcon = tw(LinkSVG)`
  fill-current inline-block h-4 w-4
`;

const login = () => {
  debug("Starting login process ...");

  // TODO: Save the active tab so that when login is successful, the save still
  // happens, the tab can be switched back to and the popup reopened.
  browser.runtime.sendMessage({ action: "login" });

  window.close();
};

const { Store, useStore } = makeStore(initialState, reducers);

const PopupContents: React.FC = () => {
  const [state, dispatch] = useStore();

  useEffect(() => {
    dispatch(operations.save());
  }, []);

  window.onunload = e => {
    dispatch(operations.update());
  };

  if (state.loading.shown) return <LoadingView />;
  if (state.auth && !state.auth.accessToken && state.auth.message)
    return <UnauthedView onLogin={login} />;

  if (!state.bookmark)
    throw new Error("Oh fuck that's not good: No bookmark in state");

  debug("current state", state);

  return (
    <>
      <Navbar>
        {{
          right: (
            <>
              <NavButton onClick={() => console.log("save")} color="red">
                <SaveIcon />
              </NavButton>
              <NavButton onClick={() => console.log("open-tb")}>
                <LinkIcon />
              </NavButton>
            </>
          )
        }}
      </Navbar>
      <BookmarkEditForm
        autocompleteTags={state.tags}
        bookmark={state.bookmark}
        onUpdate={bookmark => dispatch(actions.setBookmark(bookmark))}
      />
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
