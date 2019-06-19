import React from "react";

import "../index.css";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
// import { linkTo } from "@storybook/addon-links";

import "./pages";

import Loader from "../components/Loader";
import Alert from "../components/Alert";
import ErrorBoundary from "../components/ErrorBoundary";
import PopupContainer from "../components/PopupContainer";
import CenteredContent from "../components/CenteredContent";
import Button from "../components/Button";
import AuthenticationForm from "../components/AuthenticationForm";
import BuildInfo from "../components/BuildInfo";
import DevOptionsForm from "../components/DevOptionsForm";

import debug from "debug";
debug("transientBug")
  .extend("Storybook")
  .extend("Test");

storiesOf("Loader", module).add("default", () => <Loader />);

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

storiesOf("CenteredContent", module).add("centered Loader", () => (
  <PopupContainer>
    <CenteredContent>
      <Loader />
    </CenteredContent>
  </PopupContainer>
));

const Errorable = () => {
  throw new Error("Uh oh!");
};

storiesOf("ErrorBoundary", module)
  .add("with an error", () => (
    <ErrorBoundary>
      <Errorable />
    </ErrorBoundary>
  ))
  .add("with no error", () => (
    <ErrorBoundary>
      <p>Well hello there!</p>
    </ErrorBoundary>
  ));

storiesOf("Button", module).add("default", () => (
  <Button onClick={action("clicked")}>Click me!</Button>
));

storiesOf("AutheticationForm", module)
  .add("Unauthenticated", () => <AuthenticationForm />)
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

storiesOf("DevOptionsForm", module).add("default", () => (
  <DevOptionsForm settings={{}} update={action("update!")} />
));
