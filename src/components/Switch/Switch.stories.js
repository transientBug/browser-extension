import React, { useState } from "react";

import { storiesOf } from "@storybook/react";

import Switch from "./Switch";

const SwitchSwitch = () => {
  const [checked, setChecked] = useState(false);

  return <Switch checked={checked} onChange={setChecked} />;
};

storiesOf("Switch", module)
  .add("off", () => <Switch checked={false} />)
  .add("on", () => <Switch checked={true} />)
  .add("switching", () => <SwitchSwitch />);
