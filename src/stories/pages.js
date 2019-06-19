import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
// import { linkTo } from "@storybook/addon-links";

import Navbar from "../components/Navbar";
import PopupContainer from "../components/PopupContainer";

import BookmarkEditView from "../pages/Popup/BookmarkEditView";

storiesOf("Popup", module).add("BookmarkEditView", () => (
  <PopupContainer>
    <Navbar />
    <BookmarkEditView
      bookmark={{}}
      autocompleteTags={["test"]}
      onSave={action("save!")}
    />
  </PopupContainer>
));
