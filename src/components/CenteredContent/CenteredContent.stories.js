import React from "react";

import { storiesOf } from "@storybook/react";

import CenteredContent from "./CenteredContent";

storiesOf("CenteredContent", module).add("centered <p>", () => (
  <CenteredContent>
    <p>Testing</p>
  </CenteredContent>
));
