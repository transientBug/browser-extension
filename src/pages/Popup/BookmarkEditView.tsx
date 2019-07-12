/* global browser */
import React from "react";
import tw from "tailwind.macro";

import Navbar, { NavButton } from "../../components/Navbar";
import BookmarkEditForm from "../../components/BookmarkEditForm";

import { ReactComponent as LinkSVG } from "../../components/link.svg";
import { ReactComponent as SaveSVG } from "../../components/save-disk.svg";

import useStore from "./store";
import { operations, actions } from "../../ducks/bookmarks";

import debugFactory from "../../debug";
const debug: debug.IDebugger = debugFactory
  .extend("page")
  .extend("Popup")
  .extend("BookmarkEditView");

const SaveIcon = tw(SaveSVG)`
  fill-current inline-block h-4 w-4
`;

const LinkIcon = tw(LinkSVG)`
  fill-current inline-block h-4 w-4
`;

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
      <BookmarkEditForm
        autocompleteTags={tags}
        bookmark={bookmark}
        onUpdate={bookmark => dispatch(actions.setBookmark(bookmark))}
      />
    </>
  );
};

export default BookmarkEditView;
