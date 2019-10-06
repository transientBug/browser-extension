import React from "react";

import { FittedButton } from "../Button";
import Alert from "../Alert";
import Form, { Fieldset, Legend } from "../Forms";
import P from "../Text";

interface AuthenticatonFormProps {
  accessToken?: string;
  onLogout?: any;
  onLogin?: any;
}

// TODO: fetch the current user during auth and display who is currently logged in
const AuthenticationForm: React.FC<AuthenticatonFormProps> = ({
  accessToken,
  onLogout,
  onLogin
}) => (
  <Form>
    <Fieldset>
      <Legend>Authentication Settings</Legend>

      {!accessToken && (
        <>
          <P>
            You're not logged in yet! Click the login button below to start the
            process.
          </P>
          <FittedButton onClick={onLogin}>Log in</FittedButton>
          <Alert>
            {{
              title: "What this buttons about ...",
              message: (
                <>
                  <P>
                    This will open a new window to transientBug through which
                    you'll be asked to authorize this application.
                  </P>
                  <P>
                    If you've authorized this application in the past, this
                    window may not open, however this message should disappear
                    and be replaced with a logout button pretty much
                    immediately.
                  </P>
                  <P>
                    You may unauthorize this application at anytime through your
                    transientBug settings.
                  </P>
                </>
              )
            }}
          </Alert>
        </>
      )}

      {accessToken && (
        <>
          <P>You're currently logged in!</P>
          <FittedButton onClick={onLogout}>Log out</FittedButton>
        </>
      )}
    </Fieldset>
  </Form>
);

export default AuthenticationForm;
