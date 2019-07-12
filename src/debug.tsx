import React from "react";
import debugFactoryOG from "debug";

export { debugFactoryOG };
const debugFactory: debug.IDebugger = debugFactoryOG("transientBug");

export type DebugData = {
  namespace: string;
  description: React.ReactNode;
  debugFlag: string;
};

export const debugInstances: DebugData[] = [
  {
    namespace: "API Requests",
    description: ``,
    debugFlag: "transientBug:api*"
  },
  {
    namespace: "Background Page",
    description: `Includes login and background saving functionality along with post-install setup.`,
    debugFlag: "transientBug:pages:Background*"
  },
  {
    namespace: "Options Page",
    description: `Includes fetching and modifying extension settings and auth functionality (login/logout)`,
    debugFlag: "transientBug:pages:Options*"
  },
  {
    namespace: "Pop-up",
    description: `Includes the page action button and popup, the main functionality of the extension.`,
    debugFlag: "transientBug:pages:Popup*"
  },
  {
    namespace: "transientBug",
    description: (
      <p>
        Enables <b>ALL</b> debug logging in the extension. This can be noisy and
        should be used as a last resort or in development settings.
      </p>
    ),
    debugFlag: "transientBug*"
  }
];

export default debugFactory;
