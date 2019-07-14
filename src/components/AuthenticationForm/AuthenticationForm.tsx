import React from "react";

import tw from "tailwind.macro";

import Button from "../Button";
import Alert from "../Alert";

const Form = tw.form`
  mb-4
`;

const Fieldset = tw.fieldset`
  mb-4
`;

const Legend = tw.legend`
  block text-gray-700 text-l font-bold mb-2
`;

const P = tw.p`
  my-1
`;

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
          <Button onClick={onLogin}>Log in</Button>
          <Alert>
            {{
              title: "Note",
              message: `This will open a new window to transientBug through
            which you'll be asked to authorize this application. If you've
            authorized this application in the past, this dialogue may not appear.
            You may unauthorize this application at anytime through your
            transientBug settings.`
            }}
          </Alert>
        </>
      )}

      {accessToken && (
        <>
          <P>You're currently logged in!</P>
          <Button onClick={onLogout}>Log out</Button>
        </>
      )}
    </Fieldset>
  </Form>
);

export default AuthenticationForm;
