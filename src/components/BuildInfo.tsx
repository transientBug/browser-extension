import React from "react";

import { version as VERSION } from "../../package.json";
import Alert from "./Alert";

const DEBUGABLE = process.env.REACT_APP_DEBUGABLE;
const ENV = process.env.NODE_ENV;

type BuildInfoProps = { temporaryInstall?: boolean };

const BuildInfo: React.FC<BuildInfoProps> = ({ temporaryInstall = false }) => (
  <>
    {DEBUGABLE && (
      <Alert>
        {{
          title: "Debugable",
          message:
            "This build has the debug package enabled and will log debug statements to the console."
        }}
      </Alert>
    )}

    {temporaryInstall && (
      <Alert color="yellow">
        {{
          title: "Temporarily Installed",
          message:
            "This extension is temporarily installed and will be removed when the browser restarts."
        }}
      </Alert>
    )}

    <small>
      <b>Build:</b> {ENV}@{VERSION}
    </small>
  </>
);

export default BuildInfo;
