import React from "react";

import tw from "tailwind.macro";
import styled from "@emotion/styled/macro";
import Button from "./Button";

const Form = styled.form`
  ${tw`mb-4`}
`;

const Fieldset = styled.fieldset`
  ${tw`mb-4`}
`;

const Legend = styled.legend`
  ${tw`block text-gray-700 text-sm font-bold mb-2`}
`;

type AuthenticatonFormProps = {
  accessToken?: string;
  onLogout?: any;
};

const AuthenticationForm: React.FC<AuthenticatonFormProps> = ({
  accessToken,
  onLogout
}) => (
  <Form>
    <Fieldset>
      <Legend>Authentication Settings</Legend>

      {!accessToken && (
        <p>You're not logged in yet! Open the popup to complete the process</p>
      )}

      {accessToken && (
        <>
          <p>You're currently logged in</p>
          <Button onClick={onLogout}>Log out</Button>
        </>
      )}
    </Fieldset>
  </Form>
);

export default AuthenticationForm;
