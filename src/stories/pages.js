import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
// import { linkTo } from "@storybook/addon-links";

import PopupContainer from "../components/PopupContainer";

import BookmarkEditView from "../pages/Popup/BookmarkEditView";

storiesOf("Popup").add("BookmarkEditView", () => (
  <PopupContainer>
    <BookmarkEditView
      bookmark={{}}
      autocompleteTags={["test"]}
      onSave={action("save!")}
    />
  </PopupContainer>
));
