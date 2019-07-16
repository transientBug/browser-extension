import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import PopupContainer from "../../components/PopupContainer";
import UnauthedView from "./UnauthedView";

storiesOf("Popup/UnauthedView", module).add("default", () => (
  <PopupContainer>
    <UnauthedView onLogin={action("login")} />
  </PopupContainer>
));
