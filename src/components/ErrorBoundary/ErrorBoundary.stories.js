import React from "react";

import { storiesOf } from "@storybook/react";

import ErrorBoundary from "./ErrorBoundary";

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
