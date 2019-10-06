import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import AuthenticationForm from "./AuthenticationForm";

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
