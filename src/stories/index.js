import React from "react";

import "../index.css";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
// import { linkTo } from "@storybook/addon-links";

import * as Icons from "../components/Icons";
import Navbar, { NavButton } from "../components/Navbar";
import Alert from "../components/Alert";
import AuthenticationForm from "../components/AuthenticationForm";
import BookmarkEditForm from "../components/BookmarkEditForm";
import BuildInfo from "../components/BuildInfo";
import Button from "../components/Button";
import CenteredContent from "../components/CenteredContent";
import DebugFilterList from "../components/DebugFilterList";
import DevOptionsForm from "../components/DevOptionsForm";
import ErrorBoundary from "../components/ErrorBoundary";
import Loader from "../components/Loader";
import PopupContainer from "../components/PopupContainer";

storiesOf("Alert", module)
  .add("default", () => (
    <Alert>{{ title: "Ohia!", message: "This is a default alert" }}</Alert>
  ))
  .add("message only [object]", () => (
    <Alert>{{ message: "This is an alert with an object for children" }}</Alert>
  ))
  .add("message only [children]", () => (
    <Alert>This is an alert with text as the children</Alert>
  ))
  .add("yellow", () => (
    <Alert color="yellow">
      {{ title: "Uh oh", message: "That's not gone well!" }}
    </Alert>
  ))
  .add("red", () => (
    <Alert color="red">
      {{ title: "Uh oh", message: "That's not gone well!" }}
    </Alert>
  ));

storiesOf("AutheticationForm", module)
  .add("Unauthenticated", () => (
    <AuthenticationForm
      onLogin={e => {
        action("login")();
        e.preventDefault();
      }}
    />
  ))
  .add("Authenticated", () => (
    <AuthenticationForm
      accessToken={"test"}
      onLogout={e => {
        action("logout")();
        e.preventDefault();
      }}
    />
  ));

storiesOf("BuildInfo", module)
  .add("default", () => <BuildInfo />)
  .add("temporary install", () => <BuildInfo temporaryInstall={true} />);

storiesOf("Button", module).add("default", () => (
  <Button onClick={action("clicked")}>Click me!</Button>
));

storiesOf("CenteredContent", module).add("centered Loader", () => (
  <PopupContainer>
    <CenteredContent>
      <Loader />
    </CenteredContent>
  </PopupContainer>
));

storiesOf("DevOptionsForm", module).add("default", () => (
  <DevOptionsForm settings={{}} update={action("update!")} />
));

const Errorable = () => {
  throw new Error("Uh oh!");
};

storiesOf("ErrorBoundary", module)
  .add("with an error", () => (
    <ErrorBoundary>
      <Errorable />
      <p>That didn't go well</p>
    </ErrorBoundary>
  ))
  .add("with no error", () => (
    <ErrorBoundary>
      <p>Well hello there!</p>
    </ErrorBoundary>
  ));

storiesOf("Loader", module).add("default", () => <Loader />);

storiesOf("PopupContainer", module).add("default", () => <PopupContainer />);
