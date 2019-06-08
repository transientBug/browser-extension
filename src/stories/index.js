import React from "react";

import "../index.css";

import { storiesOf } from "@storybook/react";
// import { action } from "@storybook/addon-actions";
// import { linkTo } from "@storybook/addon-links";

import Loader from "../components/Loader";
import Alert from "../components/Alert";
import ErrorBoundary from "../components/ErrorBoundary";
import PopupContainer from "../components/PopupContainer";
import CenteredContent from "../components/CenteredContent";

storiesOf("Loader").add("default", () => <Loader />);

storiesOf("Alert")
  .add("default", () => (
    <Alert>{{ title: "Uh oh!", message: "Testing this message" }}</Alert>
  ))
  .add("message only [object]", () => (
    <Alert>{{ message: "Testing this message" }}</Alert>
  ))
  .add("message only [children]", () => <Alert>Testing this message</Alert>);

storiesOf("CenteredContent").add("centered Loader", () => (
  <PopupContainer>
    <CenteredContent>
      <Loader />
    </CenteredContent>
  </PopupContainer>
));

const Errorable = () => {
  throw new Error("Uh oh!");
};

storiesOf("ErrorBoundary").add("with an error", () => (
  <ErrorBoundary>
    <Errorable />
  </ErrorBoundary>
));
