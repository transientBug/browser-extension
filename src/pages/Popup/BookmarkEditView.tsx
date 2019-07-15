import React from "react";

import tw from "tailwind.macro";

import Navbar, { NavButton } from "../../components/Navbar";
import BookmarkEditForm from "../../components/BookmarkEditForm";
import { SaveIcon, LinkIcon } from "../../components/Icons";

import useStore from "./store";
import { operations, actions } from "../../ducks/bookmarks";

import debugFactory from "../../debug";
const debug: debug.IDebugger = debugFactory
  .extend("page")
  .extend("Popup")
  .extend("BookmarkEditView");

const Content = tw.div`p-4`;

const BookmarkEditView: React.FC = () => {
  const [{ tags, bookmark }, dispatch] = useStore();

  if (!bookmark)
    throw new Error(
      "Uh oh, that's not good: No bookmark object exists in state, nothing to render"
    );

  debug("tags & bookmark", { tags, bookmark });

  return (
    <>
      <Navbar>
        {{
          right: (
            <>
              <NavButton onClick={() => dispatch(operations.update())}>
                <SaveIcon />
              </NavButton>
              <NavButton onClick={() => console.log("open-tb")}>
                <LinkIcon />
              </NavButton>
            </>
          )
        }}
      </Navbar>
      <Content>
        <BookmarkEditForm
          autocompleteTags={tags}
          bookmark={bookmark}
          onUpdate={bookmark => dispatch(actions.setBookmark(bookmark))}
        />
      </Content>
    </>
  );
};

export default BookmarkEditView;
