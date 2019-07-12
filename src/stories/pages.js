import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
// import { linkTo } from "@storybook/addon-links";

import Navbar from "../components/Navbar";
import PopupContainer from "../components/PopupContainer";

import BookmarkEditForm from "../components/BookmarkEditForm";

storiesOf("Popup", module).add("BookmarkEditView", () => (
  <PopupContainer>
    <Navbar />
    <BookmarkEditForm
      bookmark={{}}
      autocompleteTags={["test"]}
      onUpdate={action("save!")}
    />
  </PopupContainer>
));
