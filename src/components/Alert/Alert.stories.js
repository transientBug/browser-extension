import React from "react";

import { storiesOf } from "@storybook/react";

import Alert from "./Alert";

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
