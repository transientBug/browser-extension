/* global browser */
import React from "react";

import Button from "../../components/Button";

interface UnauthedViewProps {
  onLogin: any;
}

const UnauthedView: React.FC<UnauthedViewProps> = ({ onLogin }) => (
  <>
    <p>
      You need to login and authorize this extension with transientBug in order
      to continue.
    </p>
    <p>
      This button will open a new window to transientBug and start the
      authorization process.
    </p>
    <Button onClick={onLogin}>Login</Button>
  </>
);

export default UnauthedView;
