import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import DevOptionsForm from "./DevOptionsForm";

storiesOf("DevOptionsForm", module).add("default", () => (
  <DevOptionsForm settings={{}} update={action("update!")} />
));
