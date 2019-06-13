import React from "react";

import debugFactory from "../../debug";
import Button from "../../components/Button";
const debug: debug.IDebugger = debugFactory
  .extend("page")
  .extend("Popup")
  .extend("UnauthedView");

const login = () => {
  debug("Starting login process ...");

  browser.runtime.sendMessage({ action: "login" });

  window.close();
};

const UnauthedView = () => (
  <>
    <p>
      You need to login and authorize this extension with transientBug in order
      to continue.
    </p>
    <p>
      This button will open a new window to transientBug and start the
      authorization process.
    </p>
    <Button onClick={login}>Login</Button>
  </>
);

export default UnauthedView;
