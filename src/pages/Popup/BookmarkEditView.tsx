import React from "react";

import { Bookmark } from "../../bookmarks";

interface BookmarkProps {
  bookmark: Bookmark;
}

const BookmarkEditView: React.FC<BookmarkProps> = ({ bookmark }) => (
  <>
    <p>{bookmark.title}</p>
    <p>{bookmark.tags.join(", ")}</p>
  </>
);

export default BookmarkEditView;
