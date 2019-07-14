import React from "react";

import { storiesOf } from "@storybook/react";

import BuildInfo from "./BuildInfo";

storiesOf("BuildInfo", module)
  .add("default", () => <BuildInfo />)
  .add("temporary install", () => <BuildInfo temporaryInstall={true} />);
