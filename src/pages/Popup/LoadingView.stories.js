import React from "react";

import { storiesOf } from "@storybook/react";

import PopupContainer from "../../components/PopupContainer";
import LoadingView from "./LoadingView";

storiesOf("Popup/LoadingView", module)
  .add("default", () => (
    <PopupContainer>
      <LoadingView />
    </PopupContainer>
  ))
  .add("With a message", () => (
    <PopupContainer>
      <LoadingView message={"Testing ..."} />
    </PopupContainer>
  ));
