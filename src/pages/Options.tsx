/* global browser */

import React, { useEffect, useContext } from "react";

import tw from "tailwind.macro";
import styled from "@emotion/styled/macro";

import { Store, useDispatch, useState } from "../ducks/store";
import { reducer, state, operations } from "../ducks/options";

import debugFactory from "../debug";
import AuthenticationForm from "../components/AuthenticationForm";
import DevOptionsForm from "../components/DevOptionsForm";
import BuildInfo from "../components/BuildInfo";

import "./Background";
import "./Popup";
import BrowserSettingsProvider, {
  BrowserSettingsContext,
  BrowserSettingsUpdateContext
} from "../components/BrowserSettingsProvider";

const DEBUGABLE = process.env.REACT_APP_DEBUGABLE;

const debug = debugFactory.extend("pages").extend("Options");

const Wrapper = styled.div`
  ${tw`w-full bg-white shadow-md rounded px-8 pt-6 pb-8`}
`;

const Options: React.FC = () => {
  const settings = useContext(BrowserSettingsContext);
  const updater = useContext(BrowserSettingsUpdateContext);

  return (
    <Wrapper>
      <AuthenticationForm
        accessToken={settings.accessToken}
        onLogout={() => updater({ accessToken: "" })}
        onLogin={() => browser.runtime.sendMessage({ action: "login" })}
      />

      <BuildInfo temporaryInstall={settings.temporaryInstall} />

      {DEBUGABLE && <DevOptionsForm />}
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
