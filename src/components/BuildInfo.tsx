import React from "react";

import { version as VERSION } from "../../package.json";
import Alert from "./Alert";

const ENV = process.env.NODE_ENV;

type BuildInfoProps = { temporaryInstall?: boolean };

const BuildInfo: React.FC<BuildInfoProps> = ({ temporaryInstall = false }) => (
  <>
    <small>
      <b>Build:</b> {ENV}@{VERSION}
    </small>

    {temporaryInstall && (
      <Alert color="yellow">
        {{
          title: "Temporarily Installed",
          message:
            "This extension is temporarily installed and will be removed when the browser restarts."
        }}
      </Alert>
    )}
  </>
);

export default BuildInfo;
