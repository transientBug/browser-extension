/* global browser */
import React, { useContext } from "react";

import tw from "tailwind.macro";
import styled from "@emotion/styled/macro";

import AuthenticationForm from "../components/AuthenticationForm";
import DevOptionsForm from "../components/DevOptionsForm";
import BuildInfo from "../components/BuildInfo";

import BrowserSettingsProvider, {
  BrowserSettingsContext,
  BrowserSettingsUpdateContext
} from "../components/BrowserSettingsProvider";

import { debugable } from "../debug";

const Wrapper = styled.div`
  ${tw`w-full bg-white shadow-md rounded px-8 pt-6 pb-8`}
`;

const redirectURL = browser.identity.getRedirectURL();

const Options: React.FC = () => {
  const settings = useContext(BrowserSettingsContext);
  const updater = useContext(BrowserSettingsUpdateContext);

  const login = () => browser.runtime.sendMessage({ action: "login" });
  const logout = () => updater({ accessToken: "" });

  return (
    <Wrapper>
      <AuthenticationForm
        accessToken={settings.accessToken}
        onLogout={logout}
        onLogin={login}
      />

      <BuildInfo temporaryInstall={settings.temporaryInstall} />

      {debugable && (
        <DevOptionsForm
          settings={settings}
          update={updater}
          redirectURL={redirectURL}
        />
      )}
    </Wrapper>
  );
};

const OptionsPage: React.FC = () => {
  return (
    <BrowserSettingsProvider>
      <Options />
    </BrowserSettingsProvider>
  );
};

export default OptionsPage;
